/**
 * 文字轉語音。全平台都有，是聽力輸入的來源。
 * 兩個已知地雷：getVoices() 一開始可能是空的（要等 voiceschanged），
 * 以及 Chrome 閒置後 speechSynthesis 會卡住（speak 前先 resume）。
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isTTSSupported()) return resolve([])
    const now = speechSynthesis.getVoices()
    if (now.length) return resolve(now)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      speechSynthesis.removeEventListener('voiceschanged', finish)
      resolve(speechSynthesis.getVoices())
    }
    speechSynthesis.addEventListener('voiceschanged', finish)
    // 有些瀏覽器永遠不觸發 voiceschanged，1.5 秒後放行
    setTimeout(finish, 1500)
  })
}

/** 只留英語語音，美式排前面 */
export function sortEnglishVoices(all: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return all
    .filter((v) => v.lang.toLowerCase().startsWith('en'))
    .sort((a, b) => {
      const score = (v: SpeechSynthesisVoice) =>
        (v.lang.toLowerCase().startsWith('en-us') ? -2 : 0) + (v.localService ? -1 : 0)
      return score(a) - score(b)
    })
}

export function useTTS(rate: number, voiceURI: string | null) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [speaking, setSpeaking] = useState(false)
  const supported = isTTSSupported()
  const currentRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    let alive = true
    void loadVoices().then((all) => {
      if (alive) setVoices(sortEnglishVoices(all))
    })
    return () => {
      alive = false
      if (isTTSSupported()) speechSynthesis.cancel()
    }
  }, [])

  const stop = useCallback(() => {
    if (!supported) return
    speechSynthesis.cancel()
    currentRef.current = null
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text: string, opts?: { rate?: number; pitch?: number; onEnd?: () => void }) =>
      new Promise<void>((resolve) => {
        if (!supported || !text.trim()) {
          opts?.onEnd?.()
          return resolve()
        }
        speechSynthesis.cancel()
        speechSynthesis.resume() // Chrome 閒置後會停住，這行把它叫醒

        const u = new SpeechSynthesisUtterance(text)
        u.lang = 'en-US'
        u.rate = opts?.rate ?? rate
        u.pitch = opts?.pitch ?? 1
        const picked = voiceURI ? voices.find((v) => v.voiceURI === voiceURI) : voices[0]
        if (picked) u.voice = picked

        let settled = false
        let guard: number | undefined
        const done = () => {
          if (settled) return
          settled = true
          if (guard !== undefined) clearTimeout(guard)
          setSpeaking(false)
          currentRef.current = null
          opts?.onEnd?.()
          resolve()
        }
        u.onend = done
        u.onerror = done

        // 保險：有些裝置沒有安裝語音引擎時，onend 永遠不會觸發，
        // 沒有這道防線整段對話的播放迴圈會卡死。
        const estimate = Math.max(4000, (text.split(/\s+/).length + 2) * 900)
        guard = window.setTimeout(done, estimate)

        currentRef.current = u
        setSpeaking(true)
        speechSynthesis.speak(u)
      }),
    [supported, rate, voiceURI, voices],
  )

  return { speak, stop, speaking, voices, supported }
}
