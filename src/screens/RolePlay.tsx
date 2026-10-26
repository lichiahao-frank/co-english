import { useEffect, useRef, useState } from 'react'
import CoSays from '../components/CoSays'
import { Button, Card } from '../components/ui'
import type { Day, RoleplayChoice } from '../content/types'
import { useApp } from '../state/AppContext'

type Turn = { who: 'them' | 'you'; en: string; zh: string }

/**
 * 情境實戰：劇本分支對話。
 * 選項都給中英對照，但英文放大、中文放小——目標是慢慢讓眼睛離開中文。
 */
export default function RolePlay({ day, onDone }: { day: Day; onDone: () => void }) {
  const { tts, actions } = useApp()
  const rp = day.roleplay
  const [started, setStarted] = useState(false)
  const [nodeId, setNodeId] = useState<string | null>(rp.start)
  const [history, setHistory] = useState<Turn[]>([])
  const [finished, setFinished] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const node = nodeId ? rp.nodes.find((n) => n.id === nodeId) : null

  // 對方一開口就自動唸出來，像真的有人在跟你說話
  useEffect(() => {
    if (!started || !node) return
    setHistory((h) =>
      h.length && h[h.length - 1].en === node.theyEn
        ? h
        : [...h, { who: 'them', en: node.theyEn, zh: node.theyZh }],
    )
    void tts.speak(node.theyEn, { pitch: 0.92 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, started])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [history, finished])

  const choose = (c: RoleplayChoice) => {
    setHistory((h) => [...h, { who: 'you', en: c.en, zh: c.zh }])
    void tts.speak(c.en, { pitch: 1.18 })
    actions.countSpoken()
    if (c.next) {
      setNodeId(c.next)
    } else {
      setNodeId(null)
      setFinished(true)
    }
  }

  if (!started) {
    return (
      <div className="flex flex-col gap-5">
        <CoSays mood="happy">
          換你上場了！我會演對方，你照自己想說的選。<b>選錯不會怎樣</b>，
          對話照樣會走下去。
        </CoSays>
        <Card className="text-center py-6">
          <p className="text-[15px] text-ink-soft mb-2">{day.emoji} {day.scene}</p>
          <p className="text-[17px] leading-relaxed">{rp.intro}</p>
        </Card>
        <Button full onClick={() => setStarted(true)}>開始對話</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 對話紀錄 */}
      <div className="flex flex-col gap-2.5">
        {history.map((t, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => void tts.speak(t.en, { pitch: t.who === 'you' ? 1.18 : 0.92 })}
            className={`text-left rounded-2xl px-4 py-3 border-2
              ${t.who === 'you'
                ? 'bg-pink-wash border-pink-soft ml-8'
                : 'bg-card border-line mr-8'}`}
            style={{ animation: 'pop-in 0.3s ease-out' }}
          >
            <span className="text-[12px] font-bold text-ink-soft">
              {t.who === 'you' ? '你' : '對方'}
            </span>
            <p className="en text-[17px] font-semibold leading-relaxed">{t.en}</p>
            <p className="text-[13px] text-ink-soft">{t.zh}</p>
          </button>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 選項 */}
      {node && (
        <div className="flex flex-col gap-2.5">
          <p className="text-[14px] text-ink-soft">你會怎麼回？</p>
          {node.choices.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => choose(c)}
              className="text-left min-h-[60px] px-4 py-3 rounded-2xl border-2 border-pink-soft
                bg-card active:bg-pink-wash active:scale-[0.99] transition-transform"
            >
              <p className="en text-[17px] font-bold leading-snug">{c.en}</p>
              <p className="text-[14px] text-ink-soft mt-0.5">{c.zh}</p>
            </button>
          ))}
        </div>
      )}

      {finished && (
        <>
          <CoSays mood="cheer">{rp.outro}</CoSays>
          <Button full variant="leaf" onClick={onDone}>太好了，繼續</Button>
        </>
      )}
    </div>
  )
}
