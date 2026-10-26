import { useRef, useState } from 'react'
import CoSays from '../components/CoSays'
import { Button, Card } from '../components/ui'
import type { Day } from '../content/types'
import { useApp } from '../state/AppContext'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type Phase = 'blind' | 'quiz' | 'script'

/**
 * 今日聽力：先盲聽（不給字），答完理解題才看逐句。
 * 順序很重要——先看字就變成「閱讀」，耳朵不會進步。
 */
export default function Listening({ day, onDone }: { day: Day; onDone: () => void }) {
  const { tts } = useApp()
  const [phase, setPhase] = useState<Phase>('blind')
  const [playing, setPlaying] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const stopRef = useRef(false)

  const stopPlayback = () => {
    stopRef.current = true
    tts.stop()
    setPlaying(false)
  }

  const playAll = async () => {
    if (playing) {
      stopPlayback()
      return
    }
    stopRef.current = false
    setPlaying(true)
    setPlayCount((c) => c + 1)
    for (const line of day.dialogue.lines) {
      if (stopRef.current) break
      // 兩個說話者用不同音高，耳朵比較容易分辨誰在講
      await tts.speak(line.en, { pitch: line.who === 'you' ? 1.18 : 0.92 })
      if (stopRef.current) break
      await sleep(320)
    }
    setPlaying(false)
  }

  /* ---------- 盲聽 ---------- */
  if (phase === 'blind') {
    return (
      <div className="flex flex-col gap-5">
        <CoSays mood={playing ? 'listen' : 'idle'}>
          先不看字，聽聽看就好。<b>聽不懂很正常</b>，等一下會逐句看。
        </CoSays>

        <Card className="text-center py-8">
          <p className="text-[15px] text-ink-soft mb-1">今天的情境</p>
          <p className="text-[19px] font-extrabold mb-6">
            {day.emoji} {day.dialogue.title}
          </p>
          <Button full variant={playing ? 'soft' : 'primary'} onClick={() => void playAll()}>
            {playing ? '⏸ 停止播放' : playCount === 0 ? '▶ 播放對話' : '🔁 再聽一次'}
          </Button>
          {playCount > 0 && (
            <p className="text-[14px] text-ink-soft mt-3">已經聽了 {playCount} 次</p>
          )}
        </Card>

        {!tts.supported && (
          <Card className="bg-carrot-soft border-carrot">
            <p className="text-[15px]">
              這個瀏覽器不支援朗讀功能。建議用 <b>Chrome</b> 開啟，
              就能聽到對話了。你仍然可以往下看逐句內容。
            </p>
          </Card>
        )}

        <Button
          full
          variant="soft"
          onClick={() => { stopPlayback(); setPhase('quiz') }}
          disabled={playCount === 0 && tts.supported}
        >
          我聽完了，來回答問題
        </Button>
      </div>
    )
  }

  /* ---------- 理解題 ---------- */
  if (phase === 'quiz') {
    const q = day.quiz[qIndex]
    const correct = picked === q.answer
    return (
      <div className="flex flex-col gap-4">
        <div className="text-[14px] text-ink-soft">
          理解題 {qIndex + 1} / {day.quiz.length}・答錯不扣分，只是看看抓到多少
        </div>

        <Card>
          <p className="text-[19px] font-bold mb-4">{q.q}</p>
          <div className="flex flex-col gap-2.5">
            {q.options.map((opt, idx) => {
              const chosen = picked === idx
              const isAnswer = idx === q.answer
              const tone = picked === null
                ? 'bg-cream border-line'
                : isAnswer
                  ? 'bg-leaf-soft border-leaf font-bold'
                  : chosen
                    ? 'bg-pink-wash border-pink-soft'
                    : 'bg-cream border-line opacity-60'
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => setPicked(idx)}
                  className={`min-h-[52px] px-4 py-3 rounded-2xl border-2 text-left
                    text-[16px] transition-colors ${tone}`}
                >
                  {opt}
                  {picked !== null && isAnswer && ' ✓'}
                </button>
              )
            })}
          </div>
        </Card>

        {picked !== null && (
          <>
            <CoSays mood={correct ? 'cheer' : 'happy'} size={86}>
              {correct
                ? '答對了！你聽懂重點了。'
                : '沒關係，這題抓到重點不容易。等一下看逐句就會懂。'}
            </CoSays>
            <Button
              full
              onClick={() => {
                if (qIndex < day.quiz.length - 1) {
                  setQIndex(qIndex + 1)
                  setPicked(null)
                } else {
                  stopPlayback()
                  setPhase('script')
                }
              }}
            >
              {qIndex < day.quiz.length - 1 ? '下一題' : '看逐句對照'}
            </Button>
          </>
        )}

        <button
          type="button"
          onClick={() => void playAll()}
          className="text-[15px] text-ink-soft min-h-[44px]"
        >
          {playing ? '⏸ 停止' : '🔁 再聽一次對話'}
        </button>
      </div>
    )
  }

  /* ---------- 逐句對照 ---------- */
  return (
    <div className="flex flex-col gap-4">
      <CoSays mood="happy" size={86}>
        現在對照著看。哪一句剛剛沒聽出來，就點它多聽幾次。
      </CoSays>

      <div className="flex flex-col gap-2.5">
        {day.dialogue.lines.map((line, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => void tts.speak(line.en, { pitch: line.who === 'you' ? 1.18 : 0.92 })}
            className={`text-left rounded-2xl px-4 py-3 border-2 active:scale-[0.99] transition-transform
              ${line.who === 'you'
                ? 'bg-pink-wash border-pink-soft ml-6'
                : 'bg-card border-line mr-6'}`}
          >
            <span className="text-[12px] font-bold text-ink-soft">
              {line.who === 'you' ? '你' : '對方'}
            </span>
            <p className="en text-[17px] font-semibold leading-relaxed">{line.en}</p>
            <p className="text-[14px] text-ink-soft">{line.zh}</p>
          </button>
        ))}
      </div>

      <p className="text-[13px] text-ink-soft text-center">點任何一句可以單獨重聽</p>

      <Button full onClick={onDone}>聽力練完了，去跟讀</Button>
    </div>
  )
}
