import { useState } from 'react'
import CoSays from '../components/CoSays'
import { Button, Card } from '../components/ui'
import type { Day } from '../content/types'
import { useRecorder } from '../audio/recorder'
import { useApp } from '../state/AppContext'
import { putRecording, toDateKey } from '../state/storage'

/**
 * 今日收尾：30 秒即興。
 * 這段會存進手機，之後可以回頭聽——「聽見自己三週前的樣子」是最有效的鼓勵。
 */
export default function Wrapup({ day, onDone }: { day: Day; onDone: () => void }) {
  const { actions } = useApp()
  const recorder = useRecorder()
  const [showHints, setShowHints] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggle = async () => {
    if (recorder.state === 'recording') {
      recorder.stop()
      actions.countSpoken()
    } else {
      recorder.reset()
      setSaved(false)
      await recorder.start()
    }
  }

  const save = async () => {
    if (recorder.blob) {
      await putRecording(`day${day.day}-freetalk`, recorder.blob, toDateKey())
      setSaved(true)
    }
    onDone()
  }

  return (
    <div className="flex flex-col gap-4">
      <CoSays mood={recorder.state === 'recording' ? 'listen' : 'happy'}>
        最後一件事：<b>說 30 秒就好</b>。說得結巴、停下來想，都完全沒關係——
        這段只有你自己會聽到。
      </CoSays>

      <Card>
        <p className="text-[13px] text-ink-soft mb-1">今天的即興題</p>
        <p className="text-[18px] font-bold leading-relaxed">{day.freeTalk.prompt}</p>

        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="mt-3 text-[15px] text-ink-soft min-h-[44px]"
        >
          {showHints ? '▲ 收起提示' : '▼ 卡住了？看一下可以用的句型'}
        </button>

        {showHints && (
          <div className="flex flex-col gap-1.5 mt-1" style={{ animation: 'pop-in 0.25s ease-out' }}>
            {day.freeTalk.hints.map((h) => (
              <p key={h} className="en text-[16px] bg-cream-deep rounded-xl px-3 py-2">{h}</p>
            ))}
          </div>
        )}
      </Card>

      {recorder.state === 'unsupported' ? (
        <Card className="bg-carrot-soft border-carrot">
          <p className="text-[15px]">
            這個瀏覽器不能錄音。沒關係，<b>直接對著自己說 30 秒</b>，
            效果一樣——說出口才是重點。
          </p>
        </Card>
      ) : recorder.state === 'denied' ? (
        <Card className="bg-carrot-soft border-carrot">
          <p className="text-[15px]">
            麥克風沒開啟。還是可以<b>直接說出口</b>，說完按下面的按鈕就好。
          </p>
        </Card>
      ) : (
        <Button
          full
          variant={recorder.state === 'recording' ? 'soft' : 'primary'}
          onClick={() => void toggle()}
        >
          {recorder.state === 'recording'
            ? `🔴 錄音中 ${recorder.seconds} 秒（說完按這裡）`
            : recorder.url ? '🔁 重錄一次' : '⏺ 開始錄 30 秒'}
        </Button>
      )}

      {recorder.url && (
        <Card className="bg-sky-soft border-sky">
          <p className="text-[14px] mb-2">
            這是今天的你。{saved && '已經存進手機了。'}
          </p>
          <audio src={recorder.url} controls className="w-full" />
        </Card>
      )}

      <Button full variant="leaf" onClick={() => void save()}>
        完成今天的練習 🎉
      </Button>
    </div>
  )
}
