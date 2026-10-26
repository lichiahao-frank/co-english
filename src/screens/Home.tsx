import Co from '../components/Co'
import Carrot from '../components/Carrot'
import Passport from '../components/Passport'
import { Button, Card, Pill } from '../components/ui'
import { CONTENT_DAYS, getDay } from '../content'
import { useApp } from '../state/AppContext'
import { STEP_META, STEPS } from '../state/store'

type Props = {
  onStart: (mini: boolean) => void
  onOpenPhrases: () => void
  onOpenSettings: () => void
}

export default function Home({ onStart, onOpenPhrases, onOpenSettings }: Props) {
  const { progress, practicedToday, stage, city } = useApp()
  const day = getDay(progress.currentDay)
  const completedDays = Object.entries(progress.days)
    .filter(([, r]) => r.completedAt)
    .map(([d]) => Number(d))

  // 「今天練過了」跟「這一天練完了」是兩件事：
  // 練完 Day 1 之後首頁會換成 Day 2，這時不能標成已完成。
  const dayDone = Boolean(day && progress.days[day.day]?.completedAt)

  const greeting = (() => {
    if (practicedToday) return { mood: 'cheer' as const, text: '今天練完囉！好好休息，明天見～' }
    if (progress.streak >= 3) return { mood: 'happy' as const, text: `連續 ${progress.streak} 天了，你比自己想的更有毅力。` }
    if (progress.streak === 0 && completedDays.length > 0) return { mood: 'idle' as const, text: '你回來了！不用補進度，從今天重新開始就好。' }
    if (completedDays.length === 0) return { mood: 'happy' as const, text: '第一天！我們慢慢來，說錯都沒關係。' }
    return { mood: 'idle' as const, text: '準備好了嗎？今天只要 20 分鐘。' }
  })()

  const nextStage = stage.next
  const toNext = nextStage ? nextStage.carrots - progress.carrots : 0

  return (
    <div className="min-h-dvh max-w-md mx-auto px-5 py-6 pb-10">
      {/* 頂欄 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Pill tone="carrot"><Carrot size={15} /> {progress.carrots}</Pill>
          <Pill tone="pink">🔥 {progress.streak} 天</Pill>
          {progress.restCards > 0 && <Pill tone="leaf">🎟️ {progress.restCards}</Pill>}
        </div>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="設定"
          className="w-11 h-11 grid place-items-center rounded-full active:bg-cream-deep text-ink-soft"
        >
          <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
          </svg>
        </button>
      </div>

      {/* 小Co打招呼 */}
      <div className="flex items-start gap-1 mb-6">
        <Co mood={greeting.mood} gear={stage.gear} size={128} className="shrink-0" />
        <div className="relative flex-1 bg-card border-2 border-pink-soft rounded-2xl px-4 py-3 mt-4">
          <p className="text-[16px] leading-relaxed">{greeting.text}</p>
          <span className="absolute w-3 h-3 bg-card border-l-2 border-b-2 border-pink-soft
            rotate-45 left-[-8px] top-6" />
        </div>
      </div>

      {/* 今天要練什麼 */}
      {day ? (
        <Card className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Pill tone="sky">Day {day.day}</Pill>
            <Pill tone="grape">{day.emoji} {day.scene}</Pill>
            {dayDone
              ? <Pill tone="leaf">✓ 這天練完了</Pill>
              : practicedToday
                ? <Pill tone="leaf">今天已經練過了</Pill>
                : null}
          </div>
          <h2 className="text-[21px] font-extrabold leading-snug mb-1">{day.title}</h2>
          <p className="text-[15px] text-ink-soft mb-4">{day.goal}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {STEPS.map((s) => (
              <span key={s} className="text-[13px] bg-cream-deep text-ink-soft
                px-2.5 py-1 rounded-lg">
                {STEP_META[s].emoji} {STEP_META[s].label} {STEP_META[s].minutes}′
              </span>
            ))}
          </div>

          <Button full onClick={() => onStart(false)}>
            {dayDone ? '再練一次（20 分鐘）' : '開始今天的練習（20 分鐘）'}
          </Button>
          <button
            type="button"
            onClick={() => onStart(true)}
            className="w-full mt-2.5 min-h-[48px] text-[15px] text-ink-soft
              rounded-2xl active:bg-cream-deep"
          >
            只有 8 分鐘？用迷你模式 →
          </button>
        </Card>
      ) : (
        <Card className="mb-4 text-center">
          <p className="text-[17px] font-bold mb-1">🎉 第一週的內容你全部練完了！</p>
          <p className="text-[15px] text-ink-soft">
            Day {CONTENT_DAYS + 1} 之後的課程還在準備中。
            這幾天可以回去重練任何一天，或翻翻句型小抄。
          </p>
        </Card>
      )}

      {/* 旅程 */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-[17px]">
            {city.emoji} 旅行護照
          </h3>
          <span className="text-[14px] text-ink-soft">
            {completedDays.length} / 30 天
          </span>
        </div>
        <Passport completedDays={completedDays} currentDay={progress.currentDay} compact />
        <p className="text-[13px] text-ink-soft mt-3">
          目前在 {city.name} {city.en}
        </p>
      </Card>

      {/* 小Co成長 */}
      <Card className="mb-4">
        <div className="flex items-center gap-3">
          <Co mood="idle" gear={stage.gear} size={62} className="shrink-0" />
          <div className="flex-1">
            <p className="font-extrabold text-[16px]">{stage.name}</p>
            {nextStage ? (
              <>
                <p className="text-[13px] text-ink-soft mb-1.5">
                  再 {toNext} 根胡蘿蔔就變成「{nextStage.name}」
                </p>
                <div className="h-2 bg-cream-deep rounded-full overflow-hidden">
                  <div
                    className="h-full bg-carrot rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.max(4,
                        ((progress.carrots - stage.carrots) /
                          (nextStage.carrots - stage.carrots)) * 100))}%`,
                    }}
                  />
                </div>
              </>
            ) : (
              <p className="text-[13px] text-ink-soft">裝備全部收集完成，你們準備好出發了！</p>
            )}
          </div>
        </div>
      </Card>

      <button
        type="button"
        onClick={onOpenPhrases}
        className="w-full min-h-[52px] rounded-2xl bg-cream-deep text-ink
          font-semibold active:bg-pink-wash"
      >
        📖 句型小抄（卡住的時候打開）
      </button>

      {progress.spokenCount > 0 && (
        <p className="text-center text-[14px] text-ink-soft mt-5">
          到目前為止，你已經開口說了 <b className="text-pink">{progress.spokenCount}</b> 次
        </p>
      )}
    </div>
  )
}
