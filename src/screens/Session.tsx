import { useRef, useState } from 'react'
import Co from '../components/Co'
import Carrot from '../components/Carrot'
import Passport from '../components/Passport'
import { Button, Card, Pill } from '../components/ui'
import { getDay } from '../content'
import { useApp } from '../state/AppContext'
import { BADGES, MINI_STEPS, STEPS, STEP_META, type StepId } from '../state/store'
import Listening from './Listening'
import RolePlay from './RolePlay'
import Shadowing from './Shadowing'
import Warmup from './Warmup'
import Wrapup from './Wrapup'

type Props = { day: number; mini: boolean; onExit: () => void }

export default function Session({ day: dayNum, mini, onExit }: Props) {
  const { progress, actions, stage } = useApp()
  const day = getDay(dayNum)

  const steps: StepId[] = mini ? MINI_STEPS : [...STEPS]
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(false)
  const snapshot = useRef({ badges: progress.badges, carrots: progress.carrots })

  if (!day) {
    return (
      <div className="min-h-dvh grid place-items-center p-8 text-center">
        <div>
          <p className="mb-4">這一天的內容還在準備中。</p>
          <Button onClick={onExit}>回首頁</Button>
        </div>
      </div>
    )
  }

  const step = steps[idx]
  const meta = STEP_META[step]

  const handleStepDone = () => {
    actions.completeStep(dayNum, step)
    if (idx < steps.length - 1) {
      setIdx(idx + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      actions.finishDay(dayNum, day.phrases, mini)
      setDone(true)
    }
  }

  /* ---------- 完成結算 ---------- */
  if (done) {
    const gained = progress.carrots - snapshot.current.carrots
    const newBadges = progress.badges.filter((b) => !snapshot.current.badges.includes(b))
    const completedDays = Object.entries(progress.days)
      .filter(([, r]) => r.completedAt)
      .map(([d]) => Number(d))

    return (
      <div className="min-h-dvh max-w-md mx-auto px-5 py-8 flex flex-col gap-5">
        <div className="text-center">
          <Co mood="cheer" gear={stage.gear} size={170} className="mx-auto" />
          <h1 className="text-2xl font-extrabold mt-3">Day {dayNum} 完成！</h1>
          <p className="text-[16px] text-ink-soft mt-1">
            {mini ? '迷你模式也算數——連續天數守住了。' : day.goal}
          </p>
        </div>

        <Card>
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-[13px] text-ink-soft">今天拿到</p>
              <p className="text-[22px] font-extrabold text-carrot flex items-center gap-1 justify-center">
                <Carrot size={22} /> +{gained}
              </p>
            </div>
            <div className="w-px h-10 bg-line" />
            <div>
              <p className="text-[13px] text-ink-soft">連續</p>
              <p className="text-[22px] font-extrabold text-pink">🔥 {progress.streak} 天</p>
            </div>
            <div className="w-px h-10 bg-line" />
            <div>
              <p className="text-[13px] text-ink-soft">累積開口</p>
              <p className="text-[22px] font-extrabold text-sky">{progress.spokenCount} 次</p>
            </div>
          </div>
        </Card>

        {newBadges.length > 0 && (
          <Card className="bg-grape-soft border-grape">
            <p className="font-extrabold mb-2">🎖️ 拿到新徽章</p>
            <div className="flex flex-col gap-2">
              {newBadges.map((b) => (
                <div key={b} className="flex items-center gap-2"
                  style={{ animation: 'pop-in 0.45s ease-out' }}>
                  <span className="text-2xl">{BADGES[b]?.emoji ?? '🏅'}</span>
                  <div>
                    <p className="font-bold text-[16px]">{BADGES[b]?.name ?? b}</p>
                    <p className="text-[13px] text-ink-soft">{BADGES[b]?.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card>
          <p className="font-extrabold mb-3">旅行護照</p>
          <Passport completedDays={completedDays} currentDay={progress.currentDay} />
        </Card>

        <Button full onClick={onExit}>回首頁</Button>
      </div>
    )
  }

  /* ---------- 練習進行中 ---------- */
  return (
    <div className="min-h-dvh max-w-md mx-auto px-5 py-4 pb-12">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={onExit}
          aria-label="離開"
          className="w-11 h-11 grid place-items-center rounded-full text-ink-soft active:bg-cream-deep"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor"
            strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <Pill tone="sky">Day {dayNum}{mini ? '・迷你模式' : ''}</Pill>
        <span className="text-[14px] text-ink-soft w-11 text-right">{idx + 1}/{steps.length}</span>
      </div>

      <div className="h-2 bg-cream-deep rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-pink rounded-full transition-all duration-500"
          style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
        />
      </div>

      <h1 className="text-[20px] font-extrabold mb-4">
        {meta.emoji} {meta.label}
        <span className="text-[14px] font-normal text-ink-soft ml-2">約 {meta.minutes} 分鐘</span>
      </h1>

      {step === 'warmup' && <Warmup onDone={handleStepDone} />}
      {step === 'listening' && <Listening day={day} onDone={handleStepDone} />}
      {step === 'shadowing' && <Shadowing day={day} onDone={handleStepDone} />}
      {step === 'roleplay' && <RolePlay day={day} onDone={handleStepDone} />}
      {step === 'wrapup' && <Wrapup day={day} onDone={handleStepDone} />}

      {day.youtube && step === 'wrapup' && (
        <a
          href={day.youtube.url}
          target="_blank"
          rel="noreferrer"
          className="block text-center mt-5 text-[14px] text-ink-soft underline"
        >
          {day.youtube.label}（額外的，想練再練）
        </a>
      )}
    </div>
  )
}
