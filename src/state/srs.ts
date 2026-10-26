/**
 * 間隔複習：原規劃書每天只複習「前一天」的句子，很容易三天後就忘。
 * 這裡排成 1 / 3 / 7 / 14 / 30 天，說得出來就往後排，忘了就拉回第一階。
 */
import { daysBetween } from './storage'

export type SrsItem = {
  phraseId: string
  day: number
  /** 下次該複習的日期 YYYY-MM-DD */
  due: string
  /** 第幾階，對應 INTERVALS */
  stage: number
}

const INTERVALS = [1, 3, 7, 14, 30]

function addDays(dateKey: string, n: number): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  const dt = new Date(y, m - 1, d + n)
  const yy = dt.getFullYear()
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

export function scheduleNew(phraseId: string, day: number, today: string): SrsItem {
  return { phraseId, day, stage: 0, due: addDays(today, INTERVALS[0]) }
}

export function grade(item: SrsItem, remembered: boolean, today: string): SrsItem {
  const stage = remembered
    ? Math.min(item.stage + 1, INTERVALS.length - 1)
    : 0
  return { ...item, stage, due: addDays(today, INTERVALS[stage]) }
}

/**
 * 挑出今天要複習的卡片。到期的優先（最久沒複習的排前面），
 * 不足 max 張時，拿最近學過、還沒到期的來補——寧可多看一眼，也不要暖身只有兩張卡。
 */
export function pickDue(items: SrsItem[], today: string, max = 6): SrsItem[] {
  const due = items
    .filter((it) => daysBetween(it.due, today) >= 0)
    .sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0))

  if (due.length >= max) return due.slice(0, max)

  const dueIds = new Set(due.map((it) => it.phraseId))
  const filler = items
    .filter((it) => !dueIds.has(it.phraseId))
    .sort((a, b) => b.day - a.day)
    .slice(0, max - due.length)

  return [...due, ...filler]
}
