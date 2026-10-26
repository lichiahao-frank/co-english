/** 共用 UI。按鈕一律至少 52px 高、字 17px 起跳——使用者 40 歲、在手機上單手操作。 */
import type { ReactNode } from 'react'
import { useApp } from '../state/AppContext'

/* ---------- 按鈕 ---------- */

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'soft' | 'ghost' | 'leaf'
  full?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-pink text-white shadow-[0_4px_0_#e87a94] active:shadow-[0_1px_0_#e87a94]',
  leaf: 'bg-leaf text-white shadow-[0_4px_0_#58a566] active:shadow-[0_1px_0_#58a566]',
  soft: 'bg-pink-wash text-ink border-2 border-pink-soft active:bg-pink-soft',
  ghost: 'bg-transparent text-ink-soft active:bg-cream-deep',
}

export function Button({
  children, onClick, variant = 'primary', full, disabled, className = '', ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[52px] px-5 py-3 rounded-2xl font-semibold text-[17px]
        transition-all duration-100 active:translate-y-[3px]
        disabled:opacity-40 disabled:active:translate-y-0 disabled:shadow-none
        ${VARIANTS[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ---------- 卡片 ---------- */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-bunny p-5 border border-line
      shadow-[0_2px_10px_rgba(190,160,145,0.10)] ${className}`}>
      {children}
    </div>
  )
}

export function Pill({ children, tone = 'pink' }: { children: ReactNode; tone?: 'pink' | 'sky' | 'leaf' | 'grape' | 'carrot' }) {
  const tones = {
    pink: 'bg-pink-wash text-pink',
    sky: 'bg-sky-soft text-sky',
    leaf: 'bg-leaf-soft text-leaf',
    grape: 'bg-grape-soft text-grape',
    carrot: 'bg-carrot-soft text-carrot',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full
      text-[13px] font-bold ${tones[tone]}`}>
      {children}
    </span>
  )
}

/* ---------- 播放英文句子 ---------- */

export function SpeakButton({
  text, label, slow, variant = 'soft', full,
}: { text: string; label?: string; slow?: boolean; variant?: ButtonProps['variant']; full?: boolean }) {
  const { tts, progress } = useApp()
  if (!tts.supported) return null
  return (
    <Button
      variant={variant}
      full={full}
      onClick={() => void tts.speak(text, { rate: slow ? Math.min(0.65, progress.settings.rate) : undefined })}
      aria-label={label ?? '播放'}
    >
      <span className="inline-flex items-center gap-2 justify-center">
        <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
          <path d="M4 9.5h3.6L13 5v14l-5.4-4.5H4z" fill="currentColor" />
          {!slow && (
            <path d="M16.5 8.8a4.4 4.4 0 0 1 0 6.4M19 6.4a7.8 7.8 0 0 1 0 11.2"
              stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" />
          )}
        </svg>
        {label ?? (slow ? '慢速播放' : '播放')}
      </span>
    </Button>
  )
}

/* ---------- 進度環 ---------- */

export function ProgressRing({
  value, max, size = 72, stroke = 8, children,
}: { value: number; max: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = max > 0 ? Math.min(1, value / max) : 0
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--color-pink-soft)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--color-pink)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

/* ---------- 得到胡蘿蔔的飄浮提示 ---------- */

export function RewardBurst({ amount, trigger }: { amount: number; trigger: number }) {
  if (!trigger) return null
  return (
    <div key={trigger} className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0
      text-carrot font-extrabold text-xl"
      style={{ animation: 'float-up 1.1s ease-out forwards' }}>
      +{amount} 🥕
    </div>
  )
}

/* ---------- 區塊標題 ---------- */

export function SectionTitle({ emoji, children, sub }: { emoji?: string; children: ReactNode; sub?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-[19px] font-extrabold flex items-center gap-2">
        {emoji && <span aria-hidden="true">{emoji}</span>}
        {children}
      </h2>
      {sub && <p className="text-[15px] text-ink-soft mt-0.5">{sub}</p>}
    </div>
  )
}
