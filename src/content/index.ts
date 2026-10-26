import type { Day, Phrase } from './types'
import { day01 } from './days/day01'
import { day02 } from './days/day02'
import { day03 } from './days/day03'
import { day04 } from './days/day04'
import { day05 } from './days/day05'
import { day06 } from './days/day06'
import { day07 } from './days/day07'

export const DAYS: Day[] = [day01, day02, day03, day04, day05, day06, day07]

/** 已經寫好內容的天數。還沒寫到的天，首頁會顯示「敬請期待」而不是壞掉。 */
export const CONTENT_DAYS = DAYS.length

export function getDay(n: number): Day | undefined {
  return DAYS.find((d) => d.day === n)
}

const PHRASE_INDEX = new Map<string, Phrase>(
  DAYS.flatMap((d) => d.phrases.map((p) => [p.id, p] as const)),
)

export function getPhrase(id: string): Phrase | undefined {
  return PHRASE_INDEX.get(id)
}

/** 原規劃書第五節的 20 個萬用句型，做成隨時可查的小抄 */
export const SURVIVAL_PHRASES: { group: string; items: { en: string; zh: string }[] }[] = [
  {
    group: '聽不懂的時候（最重要）',
    items: [
      { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？' },
      { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？' },
      { en: 'What do you mean by that?', zh: '你的意思是什麼？' },
      { en: 'Do you mean...?', zh: '你的意思是……嗎？' },
      { en: 'Let me make sure I understand.', zh: '讓我確認一下我是否理解正確。' },
    ],
  },
  {
    group: '表達需求',
    items: [
      { en: "I'd like...", zh: '我想要……' },
      { en: 'Could I...?', zh: '我可以……嗎？' },
      { en: 'Could you help me...?', zh: '你可以幫我……嗎？' },
      { en: 'Where can I find...?', zh: '請問哪裡可以找到……？' },
    ],
  },
  {
    group: '問資訊',
    items: [
      { en: 'What do you recommend?', zh: '你推薦什麼？' },
      { en: 'Is ... included?', zh: '有包含……嗎？' },
      { en: 'What time does...?', zh: '……幾點？' },
      { en: 'How much is...?', zh: '……多少錢？' },
    ],
  },
  {
    group: '聊天與回應',
    items: [
      { en: 'That sounds great.', zh: '聽起來很棒。' },
      { en: 'I think...', zh: '我覺得……' },
      { en: "I've been...", zh: '我曾經……／我已經……' },
      { en: 'Have you ever...?', zh: '你有沒有……過？' },
      { en: 'How about you?', zh: '那你呢？' },
      { en: "I'm really into...", zh: '我很喜歡……' },
      { en: "I'm looking forward to...", zh: '我很期待……' },
      { en: "I'm good, thank you.", zh: '我很好，謝謝。（也可用來婉拒）' },
      { en: 'It was nice talking to you.', zh: '很高興跟你聊天。' },
    ],
  },
]
