import type { ReactNode } from 'react'
import Co, { type CoMood } from './Co'
import type { BunnyGear } from '../state/store'

/** 小Co＋對話泡泡。全 app 的情緒出口，鼓勵的話都從這裡說。 */
export default function CoSays({
  children, mood = 'idle', gear = 'none', size = 120, side = 'right',
}: {
  children: ReactNode
  mood?: CoMood
  gear?: BunnyGear
  size?: number
  side?: 'right' | 'top'
}) {
  const bubble = (
    <div className={`relative bg-card border-2 border-pink-soft rounded-2xl px-4 py-3
      text-[16px] leading-relaxed ${side === 'right' ? 'flex-1' : 'w-full'}`}>
      {children}
      <span
        className={`absolute w-3 h-3 bg-card border-pink-soft rotate-45 ${
          side === 'right'
            ? 'left-[-7px] top-7 border-l-2 border-b-2'
            : 'bottom-[-8px] left-1/2 -translate-x-1/2 border-r-2 border-b-2'
        }`}
      />
    </div>
  )

  if (side === 'top') {
    return (
      <div className="flex flex-col items-center gap-3">
        {bubble}
        <Co mood={mood} gear={gear} size={size} />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <Co mood={mood} gear={gear} size={size} className="shrink-0 -mt-2" />
      {bubble}
    </div>
  )
}
