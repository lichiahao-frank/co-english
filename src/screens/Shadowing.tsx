import { useState } from 'react'
import CoSays from '../components/CoSays'
import { Button, Card, SpeakButton } from '../components/ui'
import type { Day } from '../content/types'
import { looseMatchAny, useRecognition, type MatchResult } from '../audio/recognition'
import { useRecorder } from '../audio/recorder'
import { useApp } from '../state/AppContext'

/**
 * 跟讀模仿。這裡是「容納台灣腔」原則最關鍵的落點：
 * 比對結果永遠只有「說到了」或「再試一次，記得說到 ___」，
 * 沒有分數、沒有百分比、沒有任何關於腔調或標準的字眼。
 */
export default function Shadowing({ day, onDone }: { day: Day; onDone: () => void }) {
  const { progress, actions } = useApp()
  const rec = useRecognition()
  const recorder = useRecorder()

  const [i, setI] = useState(0)
  const [result, setResult] = useState<MatchResult | null>(null)
  const [tries, setTries] = useState(0)

  const phrase = day.phrases[i]
  const isLast = i === day.phrases.length - 1
  const useRecognize = progress.settings.recognitionEnabled && rec.supported
  const listening = rec.state === 'listening'

  const reset = () => {
    setResult(null)
    setTries(0)
    recorder.reset()
  }

  const handleListen = async () => {
    setResult(null)
    const alts = await rec.listen()
    setTries((t) => t + 1)
    const r = looseMatchAny(alts, phrase.en)
    setResult(r)
    if (alts.length > 0) actions.countSpoken()
  }

  const handleRecord = async () => {
    if (recorder.state === 'recording') {
      recorder.stop()
      actions.countSpoken()
    } else {
      recorder.reset()
      await recorder.start()
    }
  }

  const goNext = () => {
    if (isLast) {
      onDone()
    } else {
      setI(i + 1)
      reset()
    }
  }

  const bunny = (() => {
    if (listening) return { mood: 'listen' as const, text: '我在聽，慢慢說沒關係～' }
    if (result?.ok) return { mood: 'cheer' as const, text: '說到了！這句你會了。' }
    if (result && result.hit < 0) return { mood: 'idle' as const, text: '我沒聽到聲音耶，再大聲一點試試？' }
    if (result) return { mood: 'happy' as const, text: '有說出來就很好了，要不要再試一次？' }
    return { mood: 'idle' as const, text: '先聽一次，再跟著說。重點是節奏，不是腔調。' }
  })()

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[14px] text-ink-soft">
        第 {i + 1} / {day.phrases.length} 句
      </div>

      <Card className="text-center">
        <p className="en text-[23px] font-extrabold leading-relaxed mb-2">{phrase.en}</p>
        <p className="text-[16px] text-ink-soft mb-1">{phrase.zh}</p>
        {phrase.note && (
          <p className="text-[14px] text-ink-soft bg-cream-deep rounded-xl px-3 py-2 mt-3">
            💡 {phrase.note}
          </p>
        )}
        <div className="flex gap-2 justify-center mt-4">
          <SpeakButton text={phrase.en} />
          <SpeakButton text={phrase.en} slow label="慢速" />
        </div>
      </Card>

      <CoSays mood={bunny.mood} size={92}>{bunny.text}</CoSays>

      {/* 辨識結果：只有「說到了」或「試著說到 ___」，永遠沒有分數 */}
      {result && result.heard && (
        <Card className={result.ok ? 'bg-leaf-soft border-leaf' : 'bg-pink-wash border-pink-soft'}>
          <p className="text-[13px] text-ink-soft mb-1">我聽到你說：</p>
          <p className="en text-[17px] font-semibold">{result.heard}</p>
          {result.ok ? (
            <p className="text-[15px] font-bold text-leaf mt-2">關鍵字都說到了 ✓</p>
          ) : result.missing.length > 0 ? (
            <p className="text-[15px] mt-2">
              再試一次的話，試著說到{' '}
              {result.missing.map((w) => (
                <b key={w} className="en text-pink">「{w}」</b>
              ))}
            </p>
          ) : null}
        </Card>
      )}

      {/* 錄音回放 */}
      {recorder.url && (
        <Card className="bg-sky-soft border-sky">
          <p className="text-[14px] mb-2">這是你剛剛說的，聽聽看：</p>
          <audio src={recorder.url} controls className="w-full" />
        </Card>
      )}

      {recorder.state === 'denied' && (
        <Card className="bg-carrot-soft border-carrot">
          <p className="text-[15px]">
            麥克風沒有開啟。沒關係，<b>跳過錄音也能繼續練</b>——
            在心裡跟著說一樣有效。想開啟的話，到網址列旁邊的鎖頭圖示允許麥克風。
          </p>
        </Card>
      )}

      {/* 主要動作 */}
      <div className="flex flex-col gap-2.5">
        {useRecognize ? (
          <Button
            full
            variant={listening ? 'soft' : 'primary'}
            onClick={() => (listening ? rec.stop() : void handleListen())}
          >
            {listening ? '🔴 正在聽…（說完按這裡）' : tries === 0 ? '🎤 換我說說看' : '🎤 再說一次'}
          </Button>
        ) : (
          <Button
            full
            variant={recorder.state === 'recording' ? 'soft' : 'primary'}
            onClick={() => void handleRecord()}
          >
            {recorder.state === 'recording'
              ? `🔴 錄音中 ${recorder.seconds}s（按這裡停止）`
              : '⏺ 錄下來聽聽看'}
          </Button>
        )}

        {useRecognize && recorder.state !== 'unsupported' && (
          <button
            type="button"
            onClick={() => void handleRecord()}
            className="min-h-[48px] text-[15px] text-ink-soft rounded-2xl active:bg-cream-deep"
          >
            {recorder.state === 'recording'
              ? `🔴 錄音中 ${recorder.seconds}s（按這裡停止）`
              : '⏺ 也想錄下來聽聽自己的聲音'}
          </button>
        )}

        <Button full variant={result?.ok ? 'leaf' : 'soft'} onClick={goNext}>
          {isLast ? '跟讀完成，去情境實戰' : '下一句'}
        </Button>
      </div>
    </div>
  )
}
