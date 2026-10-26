/** 胡蘿蔔圖示：經驗值的單位 */
export default function Carrot({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M11 8.5 L17.5 21.5 L4.5 15 Z" fill="#ff9a4d" transform="rotate(14 11 15)" />
      <path d="M11.5 8 q0.5 -4 4 -5.5 q-0.5 3.5 -2.5 5" fill="#6cbf7b" />
      <path d="M10.5 8 q-2.5 -3.5 -6 -3.5 q1.5 3 4.5 4" fill="#6cbf7b" />
    </svg>
  )
}
