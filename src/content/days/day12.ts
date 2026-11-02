import type { Day, RoleplayChoice } from '../types'

const firstAsk: RoleplayChoice[] = [
  { en: 'Hi, this is room 615. Could I get some extra towels?', zh: '嗨，我是 615 號房。可以多給我幾條毛巾嗎？', next: 'n2-towel' },
  { en: 'Hi. Could I have a wake-up call at seven tomorrow?', zh: '嗨。明天早上七點可以叫我起床嗎？', next: 'n2-wake' },
  { en: 'Hi. How do I connect to the Wi-Fi?', zh: '嗨。Wi-Fi 要怎麼連？', next: 'n2-wifi' },
]

const moreAsk: RoleplayChoice[] = [
  { en: 'Yes. What time does the pool close?', zh: '有。游泳池開到幾點？', next: 'n3-pool' },
  { en: 'Could you recommend a good place for dinner nearby?', zh: '可以推薦附近好吃的晚餐嗎？', next: 'n3-dinner' },
  { en: "That's all. Thank you so much.", zh: '這樣就好了。非常謝謝你。', next: null },
]

const byeChoices: RoleplayChoice[] = [
  { en: 'Great. Thank you for your help!', zh: '太好了。謝謝你的幫忙！', next: null },
  { en: 'Perfect. Have a good night!', zh: '太好了。祝你有個美好的夜晚！', next: null },
]

export const day12: Day = {
  day: 12,
  title: '飯店：跟櫃檯提出需求',
  scene: '洛杉磯的飯店',
  emoji: '🛎️',
  goal: '跟櫃檯要東西、問設施；房間還沒好的時候，也知道怎麼安排。',
  phrases: [
    { id: 'd12-1', en: 'Is my room ready?', zh: '我的房間好了嗎？', note: '太早到飯店時先問這句。還沒好的話，通常可以先寄放行李。' },
    { id: 'd12-2', en: 'Could you keep my luggage until then?', zh: '在那之前可以幫我保管行李嗎？', note: '寄放行李會拿到一張號碼牌（claim ticket），要收好。' },
    { id: 'd12-3', en: 'Could I get some extra towels?', zh: '可以多給我幾條毛巾嗎？', note: 'extra 是「額外、多的」。extra pillows、extra blanket 都一樣用。' },
    { id: 'd12-4', en: 'Could I have a wake-up call at seven?', zh: '可以在七點打電話叫我起床嗎？', note: '要趕早班飛機的時候特別好用。時間換掉就好。' },
    { id: 'd12-5', en: 'What time does the pool close?', zh: '游泳池開到幾點？', note: 'pool 換成 gym（健身房）、restaurant 都可以問。' },
  ],
  dialogue: {
    title: '太早到飯店，房間還沒好',
    lines: [
      { who: 'you', en: 'Hi, I have a reservation under Queeni. Is my room ready?', zh: '嗨，我用 Queeni 的名字訂了房。我的房間好了嗎？' },
      { who: 'them', en: "Let me check. I'm sorry, it won't be ready until three.", zh: '我查一下。很抱歉，要到三點才會好。' },
      { who: 'you', en: 'Could you keep my luggage until then?', zh: '在那之前可以幫我保管行李嗎？' },
      { who: 'them', en: "Of course. Here's your claim ticket.", zh: '當然。這是你的寄放號碼牌。' },
      { who: 'you', en: 'Thank you. What time does the pool close?', zh: '謝謝。游泳池開到幾點？' },
      { who: 'them', en: "It's open until ten p.m.", zh: '開到晚上十點。' },
      { who: 'you', en: 'Great. Could I have a wake-up call at seven tomorrow?', zh: '太好了。明天早上七點可以叫我起床嗎？' },
      { who: 'them', en: "No problem. I'll set that up for you.", zh: '沒問題，我幫你設定好。' },
    ],
  },
  quiz: [
    {
      q: '房間幾點才會好？',
      options: ['一點', '三點', '五點'],
      answer: 1,
    },
    {
      q: '游泳池開到幾點？',
      options: ['晚上八點', '晚上九點', '晚上十點'],
      answer: 2,
    },
  ],
  roleplay: {
    intro: '你已經進到房間，拿起電話打給櫃檯。把你需要的東西一次問清楚。',
    start: 'n1',
    outro: '一通電話就把毛巾、叫醒服務、Wi-Fi、晚餐都搞定了。講電話比面對面難，你做到了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Front desk, this is Mike. How can I help you?',
        theyZh: '這裡是櫃檯，我是 Mike。有什麼可以幫你的？',
        choices: [
          ...firstAsk,
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n1-slow' },
        ],
      },
      {
        id: 'n1-slow',
        theyEn: 'Sure. This is the front desk. How can I help?',
        theyZh: '當然。這裡是櫃檯。有什麼需要嗎？',
        choices: firstAsk,
      },
      {
        id: 'n2-towel',
        theyEn: "Sure, I'll send some up right away. Anything else?",
        theyZh: '好的，我馬上請人送上去。還有別的需要嗎？',
        choices: moreAsk,
      },
      {
        id: 'n2-wake',
        theyEn: 'Seven a.m., no problem. Anything else?',
        theyZh: '早上七點，沒問題。還有別的需要嗎？',
        choices: moreAsk,
      },
      {
        id: 'n2-wifi',
        theyEn: 'Choose "Sunset Guest." The password is your room number. Anything else?',
        theyZh: '選「Sunset Guest」，密碼是你的房號。還有別的需要嗎？',
        choices: moreAsk,
      },
      {
        id: 'n3-pool',
        theyEn: 'The pool is open until ten p.m. Towels are by the door.',
        theyZh: '游泳池開到晚上十點。毛巾放在門口。',
        choices: byeChoices,
      },
      {
        id: 'n3-dinner',
        theyEn: "There's a great Mexican place right across the street. Try the tacos!",
        theyZh: '對街有一家很棒的墨西哥餐廳。可以試試他們的塔可！',
        choices: byeChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '想像你打電話給櫃檯：先說你的房號，再要兩樣東西。用 30 秒說完。',
    hints: ['Hi, this is room ___.', 'Could I get some extra ___?', 'Could I have a wake-up call at ___?'],
  },
  youtube: {
    label: '想多聽一點：跟飯店提出需求',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=hotel',
  },
}
