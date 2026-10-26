import type { Day } from '../types'

export const day03: Day = {
  day: 3,
  title: '餐廳點餐',
  scene: '美式餐廳',
  emoji: '🍽️',
  goal: '從坐下到結帳，能自己完成一餐。這是最容易成功的情境，先把信心建起來。',
  phrases: [
    { id: 'd3-1', en: 'Could I see the menu, please?', zh: '可以給我菜單嗎？', note: 'Could I 開頭最禮貌，而且萬用。' },
    { id: 'd3-2', en: 'What do you recommend?', zh: '你推薦什麼？', note: '不知道點什麼時超好用，服務生通常很樂意講。' },
    { id: 'd3-3', en: "I'd like the grilled chicken, please.", zh: '我想點烤雞，謝謝。', note: "I'd like 後面換成任何餐點名稱。" },
    { id: 'd3-4', en: 'Could I have it without onions?', zh: '可以不要加洋蔥嗎？', note: 'without 後面換成你不吃的東西。' },
    { id: 'd3-5', en: 'Could I get the check, please?', zh: '可以幫我結帳嗎？', note: '美國說 check，英國說 bill。' },
  ],
  dialogue: {
    title: '在餐廳，從入座到結帳',
    lines: [
      { who: 'them', en: 'Hi! Welcome in. Just one today?', zh: '嗨！歡迎光臨。今天一位嗎？' },
      { who: 'you', en: 'Yes, just one. Could I see the menu, please?', zh: '對，一位。可以給我菜單嗎？' },
      { who: 'them', en: 'Here you go. Can I start you off with something to drink?', zh: '請拿。要先來點喝的嗎？' },
      { who: 'you', en: 'Just water, thank you. What do you recommend?', zh: '水就好，謝謝。你推薦什麼？' },
      { who: 'them', en: 'The grilled chicken is really popular today.', zh: '今天烤雞很受歡迎。' },
      { who: 'you', en: "I'd like the grilled chicken, please. Could I have it without onions?", zh: '那我要烤雞，謝謝。可以不要加洋蔥嗎？' },
      { who: 'them', en: 'Absolutely. No onions. Anything else?', zh: '當然可以，不加洋蔥。還需要別的嗎？' },
      { who: 'you', en: "That's all, thank you.", zh: '這樣就好，謝謝。' },
    ],
  },
  quiz: [
    {
      q: '服務生推薦了什麼？',
      options: ['今日濃湯', '烤雞', '牛排'],
      answer: 1,
    },
    {
      q: '客人提出了什麼特別要求？',
      options: ['不要洋蔥', '不要辣', '要加起司'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '你走進一家美式餐廳，服務生過來帶位。從頭到尾點完一餐。',
    start: 'n1',
    outro: '你剛剛獨力點完了一餐，連客製化需求都講了。下次在美國，你真的做得到。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi there! How many in your party?',
        theyZh: '嗨！請問幾位？',
        choices: [
          { en: 'Just one, please.', zh: '一位，謝謝。', next: 'n2' },
          { en: 'Two, please.', zh: '兩位，謝謝。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Great, right this way. Here is the menu. Can I get you something to drink?',
        theyZh: '好的，這邊請。這是菜單。要喝點什麼嗎？',
        choices: [
          { en: 'Just water, thank you.', zh: '水就好，謝謝。', next: 'n3' },
          { en: 'Could I have an iced tea, please?', zh: '可以給我一杯冰茶嗎？', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: "Sure thing. Are you ready to order, or do you need a few more minutes?",
        theyZh: '沒問題。準備好點餐了嗎，還是需要再看一下？',
        choices: [
          { en: 'What do you recommend?', zh: '你推薦什麼？', next: 'n4' },
          { en: 'Could I have a few more minutes?', zh: '可以再給我幾分鐘嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'The grilled chicken is our most popular dish. It comes with rice and vegetables.',
        theyZh: '烤雞是我們最受歡迎的菜，附飯和蔬菜。',
        choices: [
          { en: "I'd like the grilled chicken, please.", zh: '我想點烤雞，謝謝。', next: 'n5' },
          { en: "I'd like the grilled chicken. Could I have it without onions?", zh: '我要烤雞。可以不要加洋蔥嗎？', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Perfect. I will put that in for you right away.',
        theyZh: '好的，我馬上幫你下單。',
        choices: [
          { en: 'Thank you. Could I get the check when you have a chance?', zh: '謝謝。方便的時候可以幫我結帳嗎？', next: null },
          { en: 'Thank you so much.', zh: '非常謝謝你。', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你在餐廳，用 30 秒點一份你真的想吃的餐：先說要什麼，再加一個特別要求。',
    hints: ["I'd like the ___, please.", 'Could I have it without ___?', 'What do you recommend?'],
  },
  youtube: {
    label: '想多聽一點：美國餐廳真實對話',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=restaurant%20english',
  },
}
