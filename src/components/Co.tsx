/**
 * 小Co —— Queeni 家的兔子，照著她本人的照片畫成 Q 版。
 *
 * 保留了幾個一眼認得出來的特徵：
 *   - 栗棕色的野兔毛，頭頂和背部顏色更深
 *   - 眼睛外圈那一輪明顯的淺米色眼圈
 *   - 下巴到脖子的白色頸環，像圍了一條圍巾
 *   - 淺色的鼻吻部
 *   - 招牌姿勢：左耳豎著、右耳往外攤
 */
import type { BunnyGear } from '../state/store'

export type CoMood = 'idle' | 'happy' | 'cheer' | 'listen' | 'speak' | 'sleep'

type Props = {
  mood?: CoMood
  gear?: BunnyGear
  size?: number
  className?: string
}

const FUR = '#b58a66'
const FUR_DARK = '#916b4c'
const FUR_LIGHT = '#f5ece1'
const LINE = '#8a6446'
const INNER_EAR = '#f2b4bd'
const EYE = '#3b2f28'
const NOSE = '#c4857f'
const BLUSH = '#e49a93'

export default function Co({ mood = 'idle', gear = 'none', size = 160, className = '' }: Props) {
  const showGear = (g: Exclude<BunnyGear, 'none'>) => gear === g || gear === 'all'
  const sleeping = mood === 'sleep'
  const cheering = mood === 'cheer'
  const smiling = mood === 'happy' || cheering

  const bodyAnim = cheering
    ? 'bunny-hop 0.9s ease-in-out infinite'
    : sleeping
      ? 'bunny-breathe 4s ease-in-out infinite'
      : 'bunny-breathe 3s ease-in-out infinite'

  const earAnim =
    mood === 'listen' ? 'ear-wiggle 1.6s ease-in-out infinite'
      : cheering ? 'ear-wiggle 0.9s ease-in-out infinite'
        : undefined

  return (
    <svg
      viewBox="0 0 200 210"
      width={size}
      height={(size * 210) / 200}
      className={className}
      role="img"
      aria-label="小Co"
      style={{ overflow: 'visible' }}
    >
      <g style={{ animation: bodyAnim, transformOrigin: '100px 182px', transformBox: 'view-box' }}>
        {/* 右耳：小Co 的招牌，往外攤開 */}
        <g style={{ animation: earAnim, transformOrigin: '113px 72px', transformBox: 'view-box' }}>
          <g transform="rotate(78 113 72)">
            <ellipse cx="113" cy="39" rx="11.5" ry="33" fill={FUR} stroke={LINE} strokeWidth="2" />
            <ellipse cx="113" cy="41" rx="5" ry="22" fill={INNER_EAR} />
          </g>
        </g>

        {/* 左耳：豎著 */}
        <g style={{ animation: earAnim, transformOrigin: '87px 72px', transformBox: 'view-box' }}>
          <g transform="rotate(-9 87 72)">
            <ellipse cx="87" cy="38" rx="11.5" ry="33" fill={FUR} stroke={LINE} strokeWidth="2" />
            <ellipse cx="87" cy="40" rx="5" ry="22" fill={INNER_EAR} />
          </g>
        </g>

        {/* 身體 */}
        <ellipse cx="100" cy="152" rx="40" ry="34" fill={FUR} stroke={LINE} strokeWidth="2" />
        {/* 胸腹的淺色毛 */}
        <ellipse cx="100" cy="160" rx="25" ry="25" fill={FUR_LIGHT} opacity="0.95" />

        {/* 腳 */}
        <ellipse cx="80" cy="181" rx="16" ry="9" fill={FUR} stroke={LINE} strokeWidth="2" />
        <ellipse cx="120" cy="181" rx="16" ry="9" fill={FUR} stroke={LINE} strokeWidth="2" />

        {/* 背包 */}
        {showGear('backpack') && (
          <g>
            <rect x="52" y="134" width="22" height="26" rx="8" fill="#ff9a4d" />
            <rect x="56" y="142" width="14" height="7" rx="3" fill="#ffd0a8" />
            <path d="M70 136 Q86 130 96 140" stroke="#ff9a4d" strokeWidth="5"
              fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* 手 */}
        <ellipse
          cx="64" cy={cheering ? 126 : 146} rx="12" ry="15"
          fill={FUR} stroke={LINE} strokeWidth="2"
          transform={cheering ? 'rotate(-26 64 136)' : undefined}
        />
        <ellipse
          cx="136" cy={cheering ? 126 : 146} rx="12" ry="15"
          fill={FUR} stroke={LINE} strokeWidth="2"
          transform={cheering ? 'rotate(26 136 136)' : undefined}
        />

        {/* 相機 */}
        {showGear('camera') && (
          <g>
            <path d="M84 118 Q100 130 116 118" stroke="#6b5444" strokeWidth="3" fill="none" />
            <rect x="86" y="124" width="28" height="19" rx="5" fill="#6b7b8c" />
            <circle cx="100" cy="133" r="6.5" fill="#d9ecfb" stroke="#4a5a68" strokeWidth="2" />
            <rect x="105" y="126" width="5" height="3.5" rx="1.5" fill="#ffd166" />
          </g>
        )}

        {/* 白色頸環，像圍了一條圍巾 */}
        <ellipse cx="100" cy="117" rx="33" ry="11" fill={FUR_LIGHT} stroke={LINE} strokeWidth="1.5" />

        {/* 頭 */}
        <ellipse cx="100" cy="82" rx="43" ry="39" fill={FUR} stroke={LINE} strokeWidth="2" />
        {/* 頭頂較深的毛 */}
        <path d="M60 72 Q100 44 140 72 Q100 60 60 72Z" fill={FUR_DARK} opacity="0.75" />
        <ellipse cx="100" cy="64" rx="35" ry="17" fill={FUR_DARK} opacity="0.45" />

        {/* 淺色眼圈 */}
        {!sleeping && (
          <>
            <ellipse cx="85" cy="79" rx="14" ry="12" fill={FUR_LIGHT} opacity="0.9" />
            <ellipse cx="115" cy="79" rx="14" ry="12" fill={FUR_LIGHT} opacity="0.9" />
          </>
        )}

        {/* 腮紅 */}
        <ellipse cx="68" cy="94" rx="8" ry="5.5" fill={BLUSH} opacity="0.45" />
        <ellipse cx="132" cy="94" rx="8" ry="5.5" fill={BLUSH} opacity="0.45" />

        {/* 眼睛 */}
        {sleeping ? (
          <>
            <path d="M77 79 Q85 85 93 79" stroke={EYE} strokeWidth="3.5"
              fill="none" strokeLinecap="round" />
            <path d="M107 79 Q115 85 123 79" stroke={EYE} strokeWidth="3.5"
              fill="none" strokeLinecap="round" />
          </>
        ) : smiling ? (
          <>
            <path d="M77 82 Q85 72 93 82" stroke={EYE} strokeWidth="4"
              fill="none" strokeLinecap="round" />
            <path d="M107 82 Q115 72 123 82" stroke={EYE} strokeWidth="4"
              fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="85" cy="79" rx="6.5" ry="7.5" fill={EYE} />
            <ellipse cx="115" cy="79" rx="6.5" ry="7.5" fill={EYE} />
            <circle cx="87.5" cy="76" r="2.3" fill="#fff" />
            <circle cx="117.5" cy="76" r="2.3" fill="#fff" />
          </>
        )}

        {/* 墨鏡 */}
        {showGear('sunglasses') && !sleeping && (
          <g>
            <rect x="71" y="72" width="24" height="15" rx="7" fill="#4a5a68" />
            <rect x="105" y="72" width="24" height="15" rx="7" fill="#4a5a68" />
            <path d="M95 78 h10" stroke="#4a5a68" strokeWidth="3.5" />
            <path d="M73 76 q4 -2 8 -1" stroke="#9fb3c4" strokeWidth="2.5"
              fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* 淺色鼻吻部 */}
        <ellipse cx="100" cy="98" rx="17" ry="13" fill={FUR_LIGHT} opacity="0.95" />

        {/* 鼻子 */}
        <path d="M100 98 L94.5 92 L105.5 92 Z" fill={NOSE} />

        {/* 嘴 */}
        {mood === 'speak' ? (
          <ellipse cx="100" cy="106" rx="6.5" ry="5.5" fill={NOSE} opacity="0.9">
            <animate attributeName="ry" values="3;7.5;3" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
        ) : cheering ? (
          <ellipse cx="100" cy="106" rx="7.5" ry="6.5" fill={NOSE} opacity="0.9" />
        ) : (
          <>
            <path d="M92 102 Q100 108 100 100" stroke={NOSE} strokeWidth="2.5"
              fill="none" strokeLinecap="round" />
            <path d="M108 102 Q100 108 100 100" stroke={NOSE} strokeWidth="2.5"
              fill="none" strokeLinecap="round" />
          </>
        )}
      </g>

      {sleeping && (
        <g fill="#b9a8a0" fontSize="17" fontWeight="700">
          <text x="142" y="46">z</text>
          <text x="154" y="32" fontSize="13">z</text>
          <text x="164" y="22" fontSize="10">z</text>
        </g>
      )}
    </svg>
  )
}
