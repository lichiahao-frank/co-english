import { useState } from 'react'
import { Button, Card, Pill } from '../components/ui'
import { DAYS } from '../content'
import { useApp } from '../state/AppContext'

type Props = {
  onPick: (day: number, mini: boolean) => void
  onBack: () => void
}

/** 回去重練任何一天。重練不會扣東西，也不會把進度倒退回去。 */
export default function DayPicker({ onPick, onBack }: Props) {
  const { progress } = useApp()
  const [mini, setMini] = useState(false)
  // 只列走到過的天：這裡是「回去」重練，不是提前偷看後面的課
  const days = DAYS.filter((d) => d.day <= progress.currentDay)

  return (
    <div className="min-h-dvh max-w-md mx-auto px-5 py-6 pb-12">
      <div className="flex items-center gap-2 mb-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className="w-11 h-11 grid place-items-center rounded-full text-ink-soft active:bg-cream-deep"
        >
          <svg viewBox="0 0 24 24" width="23" height="23" stroke="currentColor"
            strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-[21px] font-extrabold">🔁 回去重練</h1>
      </div>

      <p className="text-[15px] text-ink-soft mb-4">
        想再練哪一天都可以，練過的不會被蓋掉，連續天數照樣守住。
      </p>

      {/* 要練多久 */}
      <div className="flex gap-2 mb-5">
        {[
          { v: false, label: '完整 20 分鐘' },
          { v: true, label: '迷你 8 分鐘' },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setMini(opt.v)}
            aria-pressed={mini === opt.v}
            className={`flex-1 min-h-[52px] rounded-2xl font-semibold text-[16px] border-2
              ${mini === opt.v
                ? 'bg-pink-wash border-pink text-pink'
                : 'bg-card border-line text-ink-soft active:bg-cream-deep'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {days.map((d) => {
          const rec = progress.days[d.day]
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => onPick(d.day, mini)}
              className="text-left w-full"
            >
              <Card className="active:bg-pink-wash">
                <div className="flex items-center gap-2 mb-1.5">
                  <Pill tone="sky">Day {d.day}</Pill>
                  <Pill tone="grape">{d.emoji} {d.scene}</Pill>
                  {rec?.completedAt && <Pill tone="leaf">✓ 練過了</Pill>}
                </div>
                <p className="text-[17px] font-extrabold leading-snug">{d.title}</p>
                <p className="text-[14px] text-ink-soft mt-0.5">{d.goal}</p>
              </Card>
            </button>
          )
        })}
      </div>

      <Button full variant="soft" className="mt-6" onClick={onBack}>回首頁</Button>
    </div>
  )
}
