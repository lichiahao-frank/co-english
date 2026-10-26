import { useState } from 'react'
import Co from '../components/Co'
import { Button } from '../components/ui'
import { useApp } from '../state/AppContext'

/** 首次開啟的三頁引導。目的不是教功能，是讓她知道「不會被評分」。 */
export default function Onboarding() {
  const { actions } = useApp()
  const [page, setPage] = useState(0)

  const pages = [
    {
      mood: 'happy' as const,
      title: '嗨，我是小Co！',
      body: (
        <>
          接下來 30 天，我每天陪你練 <b>20 分鐘</b> 英語。
          <br />
          目標很明確：去美國的時候，<b>搭飛機、住飯店、點餐、跟人聊天</b> 都能自己來。
        </>
      ),
      cta: '聽起來不錯',
    },
    {
      mood: 'idle' as const,
      title: '每天 20 分鐘，分成五小段',
      body: (
        <>
          <span className="block">🌤️ 暖身回想 3 分 ・ 🎧 今日聽力 5 分</span>
          <span className="block">🗣️ 跟讀模仿 5 分 ・ 🎭 情境實戰 5 分</span>
          <span className="block">🌙 今日收尾 2 分</span>
          <span className="block mt-3 text-ink-soft text-[15px]">
            累的時候可以按「迷你模式」，只做 8 分鐘，連續天數照算。
            <b className="text-ink"> 有練就好，不用完美。</b>
          </span>
        </>
      ),
      cta: '我懂了',
    },
    {
      mood: 'listen' as const,
      title: '關於開口說這件事',
      body: (
        <>
          待會會問你要不要開麥克風，那是用來<b>錄下你自己的聲音</b>，
          讓你聽見自己的進步。<b>錄音只存在你的手機裡</b>，不會傳到任何地方。
          <span className="block mt-3">
            我<b>不會</b>糾正你的腔調，也<b>不會</b>給你分數。
            台灣腔的英文在美國完全溝通得來——
            <b className="text-pink">敢說出口，比說得標準重要得多。</b>
          </span>
          <span className="block mt-3 text-ink-soft text-[15px]">
            不想開麥克風也沒關係，其他練習照樣能做。
          </span>
        </>
      ),
      cta: '開始第一天',
    },
  ]

  const p = pages[page]

  return (
    <div className="min-h-dvh flex flex-col px-5 py-8 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
        <Co mood={p.mood} size={170} />
        <h1 className="text-2xl font-extrabold">{p.title}</h1>
        <p className="text-[17px] leading-relaxed text-ink">{p.body}</p>
      </div>

      <div className="flex justify-center gap-2 mb-5">
        {pages.map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all ${
            i === page ? 'w-6 bg-pink' : 'w-2 bg-pink-soft'}`} />
        ))}
      </div>

      <Button
        full
        onClick={() => (page < pages.length - 1 ? setPage(page + 1) : actions.setSettings({ onboarded: true }))}
      >
        {p.cta}
      </Button>
    </div>
  )
}
