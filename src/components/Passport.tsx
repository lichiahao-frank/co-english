/** 護照集章：30 格，每完成一天蓋一個章。每 7 天換一座城市。 */
import { CITIES } from '../state/store'

type Props = {
  completedDays: number[]
  currentDay: number
  compact?: boolean
}

function cityIndexForDay(day: number): number {
  let idx = 0
  CITIES.forEach((c, i) => {
    if (day >= c.fromDay) idx = i
  })
  return idx
}

const STAMP_TONES = [
  'bg-sky-soft text-sky border-sky',
  'bg-leaf-soft text-leaf border-leaf',
  'bg-grape-soft text-grape border-grape',
  'bg-carrot-soft text-carrot border-carrot',
]

export default function Passport({ completedDays, currentDay, compact }: Props) {
  const done = new Set(completedDays)
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className={`grid gap-1.5 ${compact ? 'grid-cols-10' : 'grid-cols-6'}`}>
      {days.map((d) => {
        const isDone = done.has(d)
        const isToday = d === currentDay && !isDone
        const tone = STAMP_TONES[cityIndexForDay(d)]
        return (
          <div
            key={d}
            className={`aspect-square rounded-xl grid place-items-center border-2
              ${isDone
                ? `${tone} font-extrabold`
                : isToday
                  ? 'border-pink border-dashed text-pink font-bold bg-pink-wash'
                  : 'border-line text-ink-soft/50 bg-cream'}`}
            style={isDone ? { animation: 'pop-in 0.4s ease-out' } : undefined}
            title={`Day ${d}`}
          >
            {isDone ? (
              <span className={compact ? 'text-[11px]' : 'text-[15px]'}>
                {CITIES[cityIndexForDay(d)].emoji}
              </span>
            ) : (
              <span className={compact ? 'text-[10px]' : 'text-[13px]'}>{d}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
