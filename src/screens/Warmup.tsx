import { useMemo, useState } from 'react'
import CoSays from '../components/CoSays'
import { Button, Card, SpeakButton } from '../components/ui'
import { getPhrase } from '../content'
import { useApp } from '../state/AppContext'
import { pickDue } from '../state/srs'

/**
 * 暖身回想。刻意「先看中文、自己說、再看答案」——
 * 先回想再對答案，記得的效果比直接看一遍好很多。
 */
export default function Warmup({ onDone }: { onDone: () => void }) {
  const { progress, today, actions } = useApp()
  const cards = useMemo(
    () =>
      pickDue(progress.srs, today, 6)
        .map((item) => ({ item, phrase: getPhrase(item.phraseId) }))
        .filter((x): x is { item: typeof x.item; phrase: NonNullable<typeof x.phrase> } =>
          Boolean(x.phrase)),
    // 只在進入這一步時算一次，避免評分後卡片在手上跳掉
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)

  if (cards.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <CoSays mood="happy">
          今天還沒有要複習的句子——因為這是你的第一次！
          從明天開始，我會在這裡幫你複習學過的句型。
        </CoSays>
        <Button full onClick={onDone}>直接開始今天的課</Button>
      </div>
    )
  }

  const { phrase } = cards[i]
  const isLast = i === cards.length - 1

  const grade = (remembered: boolean) => {
    actions.gradePhrase(phrase.id, remembered)
    if (isLast) {
      onDone()
    } else {
      setI(i + 1)
      setRevealed(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-[14px] text-ink-soft">
        <span>第 {i + 1} / {cards.length} 張</span>
        <span>想不起來很正常，想過再看答案就有效</span>
      </div>

      <Card className="min-h-[260px] flex flex-col justify-center text-center gap-4">
        <p className="text-[13px] text-ink-soft">用英文說說看</p>
        <p className="text-[21px] font-bold leading-relaxed">{phrase.zh}</p>

        {revealed ? (
          <div className="mt-2 pt-4 border-t border-line flex flex-col gap-3"
            style={{ animation: 'pop-in 0.3s ease-out' }}>
            <p className="en text-[20px] font-bold text-pink leading-relaxed">{phrase.en}</p>
            <div className="flex gap-2 justify-center">
              <SpeakButton text={phrase.en} />
              <SpeakButton text={phrase.en} slow label="慢速" />
            </div>
          </div>
        ) : (
          <p className="text-[15px] text-ink-soft">先自己說出來，再看答案</p>
        )}
      </Card>

      {revealed ? (
        <div className="flex gap-3">
          <Button variant="soft" full onClick={() => grade(false)}>還不熟</Button>
          <Button variant="leaf" full onClick={() => grade(true)}>想起來了</Button>
        </div>
      ) : (
        <Button full onClick={() => setRevealed(true)}>看答案</Button>
      )}
    </div>
  )
}
