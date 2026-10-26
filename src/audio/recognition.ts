/**
 * 語音辨識 + 寬鬆比對。
 *
 * 設計原則（計畫裡的最高原則，請勿在此加嚴）：
 * 這個功能的定位是「讓她看見自己真的把話說出來了」，不是糾錯，更不是發音評分。
 * 因此刻意做得很寬鬆——
 *   1. 取 5 個候選，任一個對上就算通過（辨識器對非母語腔常把第一候選猜錯）。
 *   2. 只看實詞（內容詞）有沒有說到，冠詞介系詞一律不計。
 *   3. 比對前把台灣腔常見的音素差異折疊掉：th/s、v/w、r/l、z/s、母音、字尾子音。
 *   4. 再加一層編輯距離容錯。
 *   5. 永遠不回傳、也不顯示任何分數或百分比。
 *
 * 寬鬆的代價是偶爾會「說得不太對也通過」。這是刻意的取捨：
 * 對一個不敢開口的人，誤判通過的傷害遠小於誤判失敗。
 */
import { useCallback, useRef, useState } from 'react'

/* ---------- 支援度 ---------- */

type SRResultAlternative = { transcript: string }
type SRResult = { length: number; [i: number]: SRResultAlternative }
type SREvent = { results: { length: number; [i: number]: SRResult } }
type SRInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: SREvent) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}
type SRConstructor = new () => SRInstance

function getSR(): SRConstructor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as Record<string, unknown>
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as SRConstructor | null
}

export function isRecognitionSupported(): boolean {
  return getSR() !== null
}

/* ---------- 文字正規化 ---------- */

const CONTRACTIONS: Record<string, string> = {
  "i'd": 'i would', "i'll": 'i will', "i'm": 'i am', "i've": 'i have',
  "it's": 'it is', "that's": 'that is', "what's": 'what is',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
  "can't": 'can not', "couldn't": 'could not', "wouldn't": 'would not',
  "isn't": 'is not', "aren't": 'are not', "let's": 'let us',
  "you're": 'you are', "we're": 'we are', "there's": 'there is',
  "i'd've": 'i would have', "how's": 'how is',
}

/** 功能詞不算關鍵詞：它們短、辨識器常吃掉，而且少說也不影響對方聽懂 */
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'to', 'of', 'for', 'in', 'on', 'at', 'by', 'with',
  'and', 'or', 'but', 'so', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'this', 'that', 'these', 'those', 'it', 'he', 'she', 'they', 'we', 'you', 'i',
  'there', 'here', 'me', 'him', 'them', 'us', 'as', 'from', 'not', 'no',
  'would', 'will', 'can', 'could', 'may', 'might', 'shall', 'should',
  'have', 'has', 'had', 'please', 'okay', 'ok', 'um', 'uh',
])

function expand(text: string): string {
  let s = text.toLowerCase()
  for (const [k, v] of Object.entries(CONTRACTIONS)) {
    s = s.split(k).join(v)
  }
  return s
}

function words(text: string): string[] {
  return expand(text)
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
}

/**
 * 把一個字折成「模糊音素雜湊」。
 * 不求語音學正確，只求對 target 與 said 套同一套規則後，腔調差異會被吸收掉。
 * 順序有意義：字尾變化要先去掉，否則母音折疊後就認不出 -ed / -ing 了。
 */
function phon(word: string): string {
  let s = word.replace(/'/g, '')
  s = s.replace(/(ed|ing|es|s)$/, '')
  s = s.replace(/ough|augh/g, 'o')
  s = s.replace(/th/g, 's')     // think / sink 不分
  s = s.replace(/sh|ch/g, 's')
  s = s.replace(/ph/g, 'f')
  s = s.replace(/ck|q/g, 'k')
  s = s.replace(/[vw]/g, 'w')   // very / wery 不分
  s = s.replace(/[rl]/g, 'l')   // rice / lice 不分
  s = s.replace(/[zsc]/g, 's')  // zoo / soo 不分
  s = s.replace(/[aeiouy]+/g, 'a') // 母音差異最大，一律折成同一個
  s = s.replace(/(.)\1+/g, '$1')
  return s || word
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = cur
  }
  return prev[n]
}

function sameEnough(target: string, said: string): boolean {
  if (target === said) return true
  const pt = phon(target)
  const ps = phon(said)
  if (pt === ps) return true
  const tol = Math.max(pt.length, ps.length) <= 4 ? 1 : 2
  return editDistance(pt, ps) <= tol
}

/* ---------- 比對結果 ---------- */

export type MatchResult = {
  ok: boolean
  /** 沒對上的關鍵詞，最多給 2 個當提示，不是扣分項 */
  missing: string[]
  /** 辨識器聽到的原句，用「我聽到你說…」呈現 */
  heard: string
  /** 內部用：對上幾個關鍵詞。不要顯示給使用者 */
  hit: number
}

export function looseMatch(said: string, target: string): MatchResult {
  const saidWords = words(said)
  const targetWords = words(target)
  const content = targetWords.filter((w) => !STOP_WORDS.has(w))
  const keys = content.length ? content : targetWords

  const pool = [...saidWords]
  const missing: string[] = []
  let hit = 0

  for (const key of keys) {
    const idx = pool.findIndex((w) => sameEnough(key, w))
    if (idx >= 0) {
      pool.splice(idx, 1)
      hit++
    } else {
      missing.push(key)
    }
  }

  // 六成關鍵詞說到就算過關；只有一兩個關鍵詞時，說到一個就算
  const need = Math.max(1, Math.ceil(keys.length * 0.6))
  return { ok: hit >= need, missing: missing.slice(0, 2), heard: said.trim(), hit }
}

/** 多個候選只要有一個過就算過——這是對腔調最重要的一層寬容 */
export function looseMatchAny(alternatives: string[], target: string): MatchResult {
  if (!alternatives.length) {
    return { ok: false, missing: [], heard: '', hit: -1 }
  }
  let best = looseMatch(alternatives[0], target)
  for (const alt of alternatives.slice(1)) {
    const r = looseMatch(alt, target)
    if (r.ok) return r
    if (r.hit > best.hit) best = r
  }
  return best
}

/* ---------- Hook ---------- */

export type ListenState = 'idle' | 'listening' | 'denied' | 'unsupported'

export function useRecognition() {
  const supported = isRecognitionSupported()
  const [state, setState] = useState<ListenState>(supported ? 'idle' : 'unsupported')
  const recRef = useRef<SRInstance | null>(null)
  const timerRef = useRef<number | null>(null)

  const stop = useCallback(() => {
    try {
      recRef.current?.stop()
    } catch {
      /* 已經停了 */
    }
  }, [])

  /** 聽一句話，回傳所有候選（最多 5 個）。永遠 resolve，不會 reject。 */
  const listen = useCallback((): Promise<string[]> => {
    const SR = getSR()
    if (!SR) {
      setState('unsupported')
      return Promise.resolve([])
    }
    return new Promise((resolve) => {
      let settled = false
      const finish = (out: string[]) => {
        if (settled) return
        settled = true
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        recRef.current = null
        setState((s) => (s === 'denied' ? s : 'idle'))
        resolve(out)
      }

      let collected: string[] = []
      const rec = new SR()
      rec.lang = 'en-US'
      rec.continuous = false
      rec.interimResults = false
      rec.maxAlternatives = 5

      rec.onresult = (e) => {
        const first = e.results[0]
        if (!first) return
        const alts: string[] = []
        for (let i = 0; i < first.length; i++) {
          const t = first[i]?.transcript
          if (t) alts.push(t)
        }
        collected = alts
      }
      rec.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          setState('denied')
        }
        finish(collected)
      }
      rec.onend = () => finish(collected)

      try {
        recRef.current = rec
        rec.start()
        setState('listening')
        // 保險：有些瀏覽器沒聲音時不會自己結束
        timerRef.current = window.setTimeout(() => {
          try {
            rec.stop()
          } catch {
            finish(collected)
          }
        }, 10_000)
      } catch {
        finish([])
      }
    })
  }, [])

  return { listen, stop, state, supported }
}
