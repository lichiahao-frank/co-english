import type { Day, RoleplayChoice } from '../types'

const payChoices: RoleplayChoice[] = [
  { en: 'Okay. What is this charge for?', zh: '好的。這筆費用是什麼？', next: 'n3' },
  { en: "Okay. Here's my card.", zh: '好的。這是我的卡。', next: 'n4' },
]

const byeChoices: RoleplayChoice[] = [
  { en: 'Thank you for everything!', zh: '謝謝你們的一切！', next: null },
  { en: 'Thank you. I really enjoyed my stay.', zh: '謝謝。我住得很開心。', next: null },
]

export const day13: Day = {
  day: 13,
  title: '退房與帳單',
  scene: '飯店櫃檯退房',
  emoji: '🧾',
  goal: '退房時看懂帳單，問清楚多出來的費用；叫車、拿收據都說得出口。',
  phrases: [
    { id: 'd13-1', en: "I'd like to check out, please.", zh: '我要退房，謝謝。', note: '跟 check in 相反。走到櫃檯說這句，再把房卡交回去。' },
    { id: 'd13-2', en: 'What is this charge for?', zh: '這筆費用是什麼？', note: '帳單上有看不懂的錢，一定要問。問清楚不是失禮。' },
    { id: 'd13-3', en: "I didn't use the minibar.", zh: '我沒有用迷你吧。', note: '迷你吧就是房間冰箱裡要另外付錢的飲料零食，最常被誤收。' },
    { id: 'd13-4', en: 'Can I get a receipt, please?', zh: '可以給我收據嗎？', note: '報帳或記帳都用得到。也可以說 Could you email me the receipt?' },
    { id: 'd13-5', en: 'Could you call a taxi for me?', zh: '可以幫我叫一台計程車嗎？', note: '櫃檯通常很樂意幫忙。也可以問 How long does it take to get to the airport?' },
  ],
  dialogue: {
    title: '退房時，帳單上多了一筆錢',
    lines: [
      { who: 'you', en: "Good morning. I'd like to check out, please.", zh: '早安。我要退房，謝謝。' },
      { who: 'them', en: "Sure. Here's your bill. The total is three hundred and twelve dollars.", zh: '好的。這是你的帳單，總共三百一十二美金。' },
      { who: 'you', en: 'Thank you. What is this charge for?', zh: '謝謝。這筆費用是什麼？' },
      { who: 'them', en: "That's twenty-two dollars for the minibar.", zh: '那是迷你吧的二十二美金。' },
      { who: 'you', en: "I didn't use the minibar.", zh: '我沒有用迷你吧。' },
      { who: 'them', en: "Oh, I'm sorry. I'll take that off. The new total is two hundred and ninety dollars.", zh: '喔，很抱歉，我把它拿掉。新的總額是兩百九十美金。' },
      { who: 'you', en: 'Thank you. Can I get a receipt, please?', zh: '謝謝。可以給我收據嗎？' },
    ],
  },
  quiz: [
    {
      q: '帳單上多了哪一筆費用？',
      options: ['停車費', '迷你吧', '早餐'],
      answer: 1,
    },
    {
      q: '改過之後，總額是多少？',
      options: ['312 美金', '290 美金', '219 美金'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '要退房了。確認帳單，處理行李，再請櫃檯幫你叫車去機場。',
    start: 'n1',
    outro: '你看懂了帳單、拿掉不該付的錢，還安排好行李和車子。很多人出國最怕這一段，你處理得很好。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good morning! Checking out?',
        theyZh: '早安！要退房嗎？',
        choices: [
          { en: "Yes, I'd like to check out, please.", zh: '對，我要退房，謝謝。', next: 'n2' },
          { en: "Yes. Here's my key card.", zh: '對。這是我的房卡。', next: 'n2' },
          { en: 'Not yet. Could I get a late check-out?', zh: '還沒。可以晚一點退房嗎？', next: 'n1-late' },
        ],
      },
      {
        id: 'n1-late',
        theyEn: 'I can give you until one p.m. Is that okay?',
        theyZh: '我可以讓你待到下午一點。這樣可以嗎？',
        choices: [
          { en: "That's perfect. Thank you!", zh: '太好了。謝謝！', next: null },
          { en: "Thank you, but I'll check out now after all.", zh: '謝謝，不過我還是現在退房好了。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: "Here's your bill. The total is three hundred and twelve dollars.",
        theyZh: '這是你的帳單。總共三百一十二美金。',
        choices: [
          { en: 'What is this charge for?', zh: '這筆費用是什麼？', next: 'n3' },
          { en: 'Let me make sure I understand. Three hundred and twelve?', zh: '讓我確認一下。三百一十二？', next: 'n2-check' },
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n2-slow' },
          { en: "Okay. Here's my card.", zh: '好的。這是我的卡。', next: 'n4' },
        ],
      },
      {
        id: 'n2-check',
        theyEn: "That's right, three twelve.",
        theyZh: '沒錯，三百一十二。',
        choices: payChoices,
      },
      {
        id: 'n2-slow',
        theyEn: 'Sure. Three... hundred... and twelve dollars.',
        theyZh: '當然。三百……一十二……美金。',
        choices: payChoices,
      },
      {
        id: 'n3',
        theyEn: "That's twenty-two dollars for the minibar.",
        theyZh: '那是迷你吧的二十二美金。',
        choices: [
          { en: "I didn't use the minibar.", zh: '我沒有用迷你吧。', next: 'n3-remove' },
          { en: "Oh, right. I had a soda. That's fine.", zh: '喔，對，我喝了一罐汽水。沒問題。', next: 'n4' },
          { en: 'Do you mean the drinks in the fridge?', zh: '你是說冰箱裡的飲料嗎？', next: 'n3-mean' },
        ],
      },
      {
        id: 'n3-mean',
        theyEn: 'Yes, the snacks and drinks in your room.',
        theyZh: '對，就是你房間裡的零食和飲料。',
        choices: [
          { en: "I didn't use them.", zh: '我沒有用。', next: 'n3-remove' },
          { en: "Oh, okay. That's fine.", zh: '喔，好。沒問題。', next: 'n4' },
        ],
      },
      {
        id: 'n3-remove',
        theyEn: "Oh, I'm sorry about that. I'll take it off. The new total is two hundred and ninety.",
        theyZh: '喔，很抱歉。我把它拿掉。新的總額是兩百九十。',
        choices: [
          { en: "Thank you. Here's my card.", zh: '謝謝。這是我的卡。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: "All done. Here's your receipt. Anything else I can do for you?",
        theyZh: '好了。這是你的收據。還有什麼我可以幫忙的嗎？',
        choices: [
          { en: 'Could I leave my luggage here until two?', zh: '行李可以放這裡到兩點嗎？', next: 'n5-bag' },
          { en: 'Could you call a taxi for me?', zh: '可以幫我叫一台計程車嗎？', next: 'n5-taxi' },
          { en: 'How long does it take to get to the airport?', zh: '到機場要多久？', next: 'n5-airport' },
          { en: "No, that's all. Thank you!", zh: '沒有了，謝謝！', next: null },
        ],
      },
      {
        id: 'n5-bag',
        theyEn: "Sure. Here's your claim ticket. Just show it when you come back.",
        theyZh: '好的。這是你的號碼牌，回來時給我們看就好。',
        choices: byeChoices,
      },
      {
        id: 'n5-taxi',
        theyEn: "Of course. It'll be here in about ten minutes.",
        theyZh: '當然。大概十分鐘會到。',
        choices: byeChoices,
      },
      {
        id: 'n5-airport',
        theyEn: 'About forty minutes, depending on traffic.',
        theyZh: '大概四十分鐘，要看交通狀況。',
        choices: [
          { en: 'Thank you. Could you call a taxi for me?', zh: '謝謝。可以幫我叫一台計程車嗎？', next: 'n5-taxi' },
          ...byeChoices,
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你在櫃檯退房：說你要退房、問一筆看不懂的費用，再請他們幫你叫車。用 30 秒說完。',
    hints: ["I'd like to check out, please.", 'What is this charge for?', 'Could you call a taxi for me?'],
  },
  youtube: {
    label: '想多聽一點：飯店退房的對話',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=hotel%20check%20out',
  },
}
