import { useRef, useState } from 'react'
import { Button, Card } from '../components/ui'
import { isRecognitionSupported } from '../audio/recognition'
import { isRecordingSupported } from '../audio/recorder'
import { isTTSSupported } from '../audio/tts'
import { useApp } from '../state/AppContext'
import { toDateKey } from '../state/storage'

const RATES = [
  { v: 0.7, label: '慢' },
  { v: 0.85, label: '中等' },
  { v: 1.0, label: '正常' },
]

export default function Settings({ onBack }: { onBack: () => void }) {
  const { progress, actions, tts } = useApp()
  const { settings } = progress
  const [confirmReset, setConfirmReset] = useState(false)
  const [importMsg, setImportMsg] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const exportFile = () => {
    const blob = new Blob([actions.exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `小Co英語進度_${toDateKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importFile = async (file: File) => {
    const text = await file.text()
    setImportMsg(actions.importData(text) ? '進度已經匯入了 ✓' : '這個檔案讀不出來，請確認是匯出的進度檔。')
  }

  const Status = ({ ok, name, note }: { ok: boolean; name: string; note: string }) => (
    <div className="flex items-start gap-2 py-1.5">
      <span className={ok ? 'text-leaf' : 'text-ink-soft'}>{ok ? '✓' : '✕'}</span>
      <div>
        <p className="text-[15px] font-semibold">{name}</p>
        <p className="text-[13px] text-ink-soft">{ok ? note : '這個瀏覽器不支援，建議改用 Chrome'}</p>
      </div>
    </div>
  )

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
        <h1 className="text-[21px] font-extrabold">設定</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* 語速 */}
        <Card>
          <h2 className="font-extrabold text-[17px] mb-1">朗讀速度</h2>
          <p className="text-[14px] text-ink-soft mb-3">
            剛開始建議用「慢」或「中等」。聽得懂比聽得快重要。
          </p>
          <div className="flex gap-2">
            {RATES.map((r) => (
              <button
                key={r.v}
                type="button"
                onClick={() => actions.setSettings({ rate: r.v })}
                className={`flex-1 min-h-[52px] rounded-2xl border-2 font-semibold
                  ${settings.rate === r.v
                    ? 'bg-pink text-white border-pink'
                    : 'bg-card border-line text-ink'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button
            variant="soft"
            full
            className="mt-3"
            onClick={() => void tts.speak('I would like to check in, please.')}
          >
            🔊 試聽看看
          </Button>
        </Card>

        {/* 語音 */}
        {tts.voices.length > 0 && (
          <Card>
            <h2 className="font-extrabold text-[17px] mb-1">英語聲音</h2>
            <p className="text-[14px] text-ink-soft mb-3">
              不同手機可選的聲音不一樣。挑一個你聽起來最舒服的。
            </p>
            <select
              value={settings.voiceURI ?? tts.voices[0]?.voiceURI ?? ''}
              onChange={(e) => actions.setSettings({ voiceURI: e.target.value })}
              className="w-full min-h-[52px] px-4 rounded-2xl border-2 border-line
                bg-card text-[16px]"
            >
              {tts.voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name}（{v.lang}）
                </option>
              ))}
            </select>
          </Card>
        )}

        {/* 語音辨識 */}
        <Card>
          <h2 className="font-extrabold text-[17px] mb-1">開口檢查</h2>
          <p className="text-[14px] text-ink-soft mb-3">
            開啟後，跟讀時我會顯示「我聽到你說……」。
            <b className="text-ink">我只看關鍵字有沒有說到，不會管腔調，也不會給分數。</b>
            覺得有壓力的話，關掉它改用錄音回放一樣有效。
          </p>
          <button
            type="button"
            onClick={() => actions.setSettings({ recognitionEnabled: !settings.recognitionEnabled })}
            className={`w-full min-h-[52px] rounded-2xl border-2 font-semibold
              ${settings.recognitionEnabled
                ? 'bg-leaf text-white border-leaf'
                : 'bg-card border-line text-ink-soft'}`}
          >
            {settings.recognitionEnabled ? '✓ 開啟中' : '已關閉'}
          </button>
        </Card>

        {/* 支援狀態 */}
        <Card>
          <h2 className="font-extrabold text-[17px] mb-2">這台裝置可以做什麼</h2>
          <Status ok={isTTSSupported()} name="英文朗讀" note="可以聽對話與句子" />
          <Status ok={isRecordingSupported()} name="錄音回放" note="可以錄下自己的聲音" />
          <Status ok={isRecognitionSupported()} name="開口檢查" note="可以顯示我聽到你說什麼" />
        </Card>

        {/* 進度備份 */}
        <Card>
          <h2 className="font-extrabold text-[17px] mb-1">進度備份</h2>
          <p className="text-[14px] text-ink-soft mb-3">
            你的進度只存在這台裝置裡。換手機前先匯出，到新手機再匯入。
          </p>
          <div className="flex gap-2">
            <Button variant="soft" full onClick={exportFile}>匯出進度</Button>
            <Button variant="soft" full onClick={() => fileRef.current?.click()}>匯入進度</Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void importFile(f)
            }}
          />
          {importMsg && <p className="text-[14px] mt-2">{importMsg}</p>}
        </Card>

        {/* 重新開始 */}
        <Card>
          <h2 className="font-extrabold text-[17px] mb-1">重新開始</h2>
          <p className="text-[14px] text-ink-soft mb-3">
            會清空所有進度、胡蘿蔔與連續天數，<b>而且救不回來</b>。
          </p>
          {confirmReset ? (
            <div className="flex gap-2">
              <Button variant="soft" full onClick={() => setConfirmReset(false)}>算了</Button>
              <Button
                full
                onClick={() => {
                  actions.resetAll()
                  setConfirmReset(false)
                  onBack()
                }}
              >
                確定清空
              </Button>
            </div>
          ) : (
            <Button variant="ghost" full onClick={() => setConfirmReset(true)}>
              清空所有進度
            </Button>
          )}
        </Card>

        <p className="text-center text-[13px] text-ink-soft">
          小Co 英語陪練・每天 20 分鐘
          <br />
          所有資料都存在這台裝置，不會上傳到任何地方
        </p>
      </div>
    </div>
  )
}
