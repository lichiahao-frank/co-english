import { Button, Card } from '../components/ui'
import { SURVIVAL_PHRASES } from '../content'
import { useApp } from '../state/AppContext'

/** 隨時可查的小抄：原規劃書的 20 個萬用句型＋五句救援英文 */
export default function PhraseBook({ onBack }: { onBack: () => void }) {
  const { tts } = useApp()

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
        <h1 className="text-[21px] font-extrabold">📖 句型小抄</h1>
      </div>

      <p className="text-[15px] text-ink-soft mb-5">
        卡住的時候打開這裡。點任何一句都可以聽發音。
      </p>

      <div className="flex flex-col gap-4">
        {SURVIVAL_PHRASES.map((group) => (
          <Card key={group.group}>
            <h2 className="font-extrabold text-[17px] mb-3">{group.group}</h2>
            <div className="flex flex-col gap-2">
              {group.items.map((it) => (
                <button
                  key={it.en}
                  type="button"
                  onClick={() => void tts.speak(it.en)}
                  className="text-left px-3 py-2.5 rounded-xl bg-cream active:bg-pink-wash"
                >
                  <p className="en text-[17px] font-semibold">{it.en}</p>
                  <p className="text-[14px] text-ink-soft">{it.zh}</p>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button full className="mt-6" onClick={onBack}>回首頁</Button>
    </div>
  )
}
