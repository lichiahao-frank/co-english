/**
 * 全站進度狀態。刻意只存在使用者自己的瀏覽器裡：不需要帳號、不上傳任何東西。
 *
 * 設計重點（來自計畫的「降壓機制」）：
 * - 迷你模式也算完成，連續天數照給，避免「今天沒空 → 破功 → 放棄」。
 * - 每完成 7 天發一張補休卡，漏一天不會歸零。
 * - 只累加正向數字（胡蘿蔔、說了幾句），不記錄也不顯示任何錯誤率。
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Phrase } from '../content/types'
import { scheduleNew, grade as gradeSrs, type SrsItem } from './srs'
import {
  clearProgress, daysBetween, pruneRecordings, readJSON, toDateKey, writeJSON,
} from './storage'

export const STEPS = ['warmup', 'listening', 'shadowing', 'roleplay', 'wrapup'] as const
export type StepId = (typeof STEPS)[number]

/** 迷你模式：沒時間時只做這兩步，約 8 分鐘 */
export const MINI_STEPS: StepId[] = ['warmup', 'shadowing']

export const STEP_META: Record<StepId, { label: string; minutes: number; emoji: string }> = {
  warmup: { label: '暖身回想', minutes: 3, emoji: '🌤️' },
  listening: { label: '今日聽力', minutes: 5, emoji: '🎧' },
  shadowing: { label: '跟讀模仿', minutes: 5, emoji: '🗣️' },
  roleplay: { label: '情境實戰', minutes: 5, emoji: '🎭' },
  wrapup: { label: '今日收尾', minutes: 2, emoji: '🌙' },
}

export const CARROT = { step: 5, dayBonus: 10, miniBonus: 6 }

export const CITIES = [
  { fromDay: 1, name: '舊金山', en: 'San Francisco', emoji: '🌉' },
  { fromDay: 8, name: '洛杉磯', en: 'Los Angeles', emoji: '🌴' },
  { fromDay: 15, name: '紐約', en: 'New York', emoji: '🗽' },
  { fromDay: 22, name: '波士頓', en: 'Boston', emoji: '🍂' },
]

export const BUNNY_STAGES = [
  { carrots: 0, name: '小小Co', gear: 'none' },
  { carrots: 60, name: '背包小Co', gear: 'backpack' },
  { carrots: 170, name: '相機小Co', gear: 'camera' },
  { carrots: 320, name: '墨鏡小Co', gear: 'sunglasses' },
  { carrots: 520, name: '旅行達人小Co', gear: 'all' },
] as const

export type BunnyGear = (typeof BUNNY_STAGES)[number]['gear']

export const BADGES: Record<string, { name: string; desc: string; emoji: string }> = {
  'first-step': { name: '踏出第一步', desc: '完成第一個練習', emoji: '🌱' },
  'first-voice': { name: '第一次開口', desc: '錄下第一段自己說的英語', emoji: '🎤' },
  'first-talk': { name: '第一次對話', desc: '完成一次情境實戰', emoji: '💬' },
  'first-mini': { name: '有練就好', desc: '用迷你模式守住連續天數', emoji: '🪴' },
  'streak-3': { name: '連續 3 天', desc: '習慣開始長出來了', emoji: '🔥' },
  'streak-7': { name: '連續 7 天', desc: '一週不間斷', emoji: '⭐' },
  'streak-14': { name: '連續 14 天', desc: '兩週不間斷', emoji: '🌟' },
  'streak-30': { name: '連續 30 天', desc: '整整一個月', emoji: '👑' },
  'city-1': { name: '抵達舊金山', desc: '完成第 7 天', emoji: '🌉' },
  'city-2': { name: '抵達洛杉磯', desc: '完成第 14 天', emoji: '🌴' },
  'city-3': { name: '抵達紐約', desc: '完成第 21 天', emoji: '🗽' },
  'city-4': { name: '抵達波士頓', desc: '完成第 30 天', emoji: '🍂' },
}

export type DayRecord = {
  steps: StepId[]
  completedAt?: string
  mini?: boolean
}

export type Settings = {
  /** TTS 語速：0.7 慢 / 0.85 中 / 1.0 正常 */
  rate: number
  voiceURI: string | null
  /** 語音辨識可以整個關掉，改用「我說完了」自評 */
  recognitionEnabled: boolean
  onboarded: boolean
}

export type Progress = {
  version: 1
  startedAt: string
  currentDay: number
  days: Record<number, DayRecord>
  carrots: number
  streak: number
  bestStreak: number
  lastPracticeDate: string | null
  restCards: number
  badges: string[]
  srs: SrsItem[]
  spokenCount: number
  settings: Settings
}

function defaultProgress(): Progress {
  return {
    version: 1,
    startedAt: toDateKey(),
    currentDay: 1,
    days: {},
    carrots: 0,
    streak: 0,
    bestStreak: 0,
    lastPracticeDate: null,
    restCards: 1,
    badges: [],
    srs: [],
    spokenCount: 0,
    settings: { rate: 0.85, voiceURI: null, recognitionEnabled: true, onboarded: false },
  }
}

/** 舊資料補上新欄位，避免改版後讀進來少東西就整個壞掉 */
function hydrate(raw: unknown): Progress {
  const base = defaultProgress()
  if (!raw || typeof raw !== 'object') return base
  const p = raw as Partial<Progress>
  return {
    ...base,
    ...p,
    days: p.days ?? base.days,
    badges: p.badges ?? base.badges,
    srs: p.srs ?? base.srs,
    settings: { ...base.settings, ...(p.settings ?? {}) },
  }
}

export function bunnyStage(carrots: number) {
  let stage: (typeof BUNNY_STAGES)[number] = BUNNY_STAGES[0]
  let index = 0
  BUNNY_STAGES.forEach((s, i) => {
    if (carrots >= s.carrots) {
      stage = s
      index = i
    }
  })
  const next = BUNNY_STAGES[index + 1] ?? null
  return { ...stage, index, next }
}

export function cityForDay(day: number) {
  let city = CITIES[0]
  for (const c of CITIES) if (day >= c.fromDay) city = c
  return city
}

export function useProgressState() {
  const [progress, setProgress] = useState<Progress>(() => hydrate(readJSON<unknown>(null)))

  useEffect(() => {
    writeJSON(progress)
  }, [progress])

  useEffect(() => {
    void pruneRecordings(7)
  }, [])

  const today = toDateKey()
  const practicedToday = progress.lastPracticeDate === today

  const award = useCallback((ids: string[]) => {
    setProgress((p) => {
      const fresh = ids.filter((id) => !p.badges.includes(id))
      return fresh.length ? { ...p, badges: [...p.badges, ...fresh] } : p
    })
  }, [])

  const completeStep = useCallback((day: number, step: StepId) => {
    setProgress((p) => {
      const rec = p.days[day] ?? { steps: [] }
      if (rec.steps.includes(step)) return p
      const steps = [...rec.steps, step]
      const badges = p.badges.includes('first-step') ? p.badges : [...p.badges, 'first-step']
      return {
        ...p,
        carrots: p.carrots + CARROT.step,
        days: { ...p.days, [day]: { ...rec, steps } },
        badges,
      }
    })
  }, [])

  /** 錄過音就算「開口了」，這個數字只往上加，是她的底氣來源 */
  const countSpoken = useCallback((n = 1) => {
    setProgress((p) => ({
      ...p,
      spokenCount: p.spokenCount + n,
      badges: p.badges.includes('first-voice') ? p.badges : [...p.badges, 'first-voice'],
    }))
  }, [])

  const finishDay = useCallback((day: number, phrases: Phrase[], mini: boolean) => {
    setProgress((p) => {
      const key = toDateKey()
      const rec = p.days[day] ?? { steps: [] }
      const alreadyDone = Boolean(rec.completedAt)

      // --- 連續天數：今天第一次完成才動 ---
      let streak = p.streak
      let restCards = p.restCards
      if (p.lastPracticeDate !== key) {
        if (!p.lastPracticeDate) {
          streak = 1
        } else {
          const gap = daysBetween(p.lastPracticeDate, key)
          const missed = Math.max(0, gap - 1)
          if (gap === 1) {
            streak += 1
          } else if (missed > 0 && restCards >= missed) {
            restCards -= missed
            streak += 1
          } else {
            streak = 1
          }
        }
      }

      // --- 間隔複習：把今天的句子排進去 ---
      const known = new Set(p.srs.map((it) => it.phraseId))
      const added = phrases
        .filter((ph) => !known.has(ph.id))
        .map((ph) => scheduleNew(ph.id, day, key))

      const completedDays = Object.values(p.days).filter((d) => d.completedAt).length +
        (alreadyDone ? 0 : 1)

      // 每滿 7 天發一張補休卡，最多存 3 張
      if (!alreadyDone && completedDays % 7 === 0) restCards = Math.min(3, restCards + 1)

      const badges = new Set(p.badges)
      if (mini) badges.add('first-mini')
      for (const n of [3, 7, 14, 30]) if (streak >= n) badges.add(`streak-${n}`)
      ;[7, 14, 21, 30].forEach((d, i) => {
        if (day >= d) badges.add(`city-${i + 1}`)
      })

      return {
        ...p,
        carrots: p.carrots + (alreadyDone ? 0 : mini ? CARROT.miniBonus : CARROT.dayBonus),
        days: {
          ...p.days,
          [day]: { ...rec, completedAt: rec.completedAt ?? key, mini: rec.mini ?? mini },
        },
        streak,
        bestStreak: Math.max(p.bestStreak, streak),
        restCards,
        lastPracticeDate: key,
        currentDay: Math.max(p.currentDay, Math.min(30, day + 1)),
        srs: [...p.srs, ...added],
        badges: [...badges],
      }
    })
  }, [])

  const gradePhrase = useCallback((phraseId: string, remembered: boolean) => {
    setProgress((p) => ({
      ...p,
      srs: p.srs.map((it) =>
        it.phraseId === phraseId ? gradeSrs(it, remembered, toDateKey()) : it,
      ),
    }))
  }, [])

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setProgress((p) => ({ ...p, settings: { ...p.settings, ...patch } }))
  }, [])

  const exportData = useCallback(() => JSON.stringify(progress, null, 2), [progress])

  const importData = useCallback((text: string): boolean => {
    try {
      const parsed = JSON.parse(text)
      if (!parsed || typeof parsed !== 'object') return false
      setProgress(hydrate(parsed))
      return true
    } catch {
      return false
    }
  }, [])

  const resetAll = useCallback(() => {
    clearProgress()
    setProgress(defaultProgress())
  }, [])

  return useMemo(
    () => ({
      progress,
      today,
      practicedToday,
      stage: bunnyStage(progress.carrots),
      city: cityForDay(progress.currentDay),
      actions: {
        completeStep, finishDay, gradePhrase, countSpoken,
        award, setSettings, exportData, importData, resetAll,
      },
    }),
    [progress, today, practicedToday, completeStep, finishDay, gradePhrase,
      countSpoken, award, setSettings, exportData, importData, resetAll],
  )
}

export type ProgressApi = ReturnType<typeof useProgressState>
