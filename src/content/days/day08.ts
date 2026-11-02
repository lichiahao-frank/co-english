import type { Day, RoleplayChoice } from '../types'

const seatChoices: RoleplayChoice[] = [
  { en: "I'd like a window seat, please.", zh: '我想要靠窗的位子，謝謝。', next: 'n5' },
  { en: 'An aisle seat, please.', zh: '走道的位子，謝謝。', next: 'n5' },
  { en: 'Do you have any seats with more legroom?', zh: '有腳比較能伸展的位子嗎？', next: 'n4-leg' },
  { en: 'Sorry, could you repeat that?', zh: '不好意思，可以再說一次嗎？', next: 'n4-repeat' },
]

export const day08: Day = {
  day: 8,
  title: '機場報到',
  scene: '桃園機場報到櫃檯',
  emoji: '🧳',
  goal: '自己辦好報到：托運行李、選位子、問清楚登機門和登機時間。',
  phrases: [
    { id: 'd8-1', en: "I'd like to check in for my flight to Los Angeles.", zh: '我要辦理飛往洛杉磯的報到。', note: '走到櫃檯的第一句。把城市換掉，以後每次搭飛機都能用。' },
    { id: 'd8-2', en: 'Can I check this bag?', zh: '這件行李可以托運嗎？', note: '在機場，check 的意思是「托運」。' },
    { id: 'd8-3', en: "I'd like a window seat, please.", zh: '我想要靠窗的位子，謝謝。', note: "想坐走道就換成 an aisle seat（aisle 的 s 不發音，唸起來像 I'll）。" },
    { id: 'd8-4', en: 'Where is my boarding gate?', zh: '我的登機門在哪裡？', note: '登機證上的字太小看不懂時，直接問最快。' },
    { id: 'd8-5', en: 'What time does boarding start?', zh: '幾點開始登機？', note: '登機時間比起飛時間早，要問的是這個。' },
  ],
  dialogue: {
    title: '在航空公司櫃檯辦報到',
    lines: [
      { who: 'them', en: 'Good morning. Where are you flying today?', zh: '早安。今天要飛去哪裡？' },
      { who: 'you', en: "Hi, I'd like to check in for my flight to Los Angeles.", zh: '嗨，我要辦理飛往洛杉磯的報到。' },
      { who: 'them', en: 'Sure. May I see your passport, please?', zh: '好的。可以看一下你的護照嗎？' },
      { who: 'you', en: 'Here you go.', zh: '在這裡。' },
      { who: 'them', en: 'Thank you. Are you checking any bags today?', zh: '謝謝。今天有要托運行李嗎？' },
      { who: 'you', en: 'Yes, just this one. Can I check this bag?', zh: '有，就這一件。這件可以托運嗎？' },
      { who: 'them', en: 'Of course. Would you like a window or an aisle seat?', zh: '當然。你想坐靠窗還是走道？' },
      { who: 'you', en: "I'd like a window seat, please.", zh: '我想要靠窗的位子，謝謝。' },
      { who: 'them', en: 'All set. Your gate is B7, and boarding starts at 10:40.', zh: '好了。你的登機門是 B7，十點四十分開始登機。' },
    ],
  },
  quiz: [
    {
      q: '你要了什麼位子？',
      options: ['靠窗', '走道', '中間'],
      answer: 0,
    },
    {
      q: '幾點開始登機？',
      options: ['十點十四分', '十點四十分', '十一點四十分'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在桃園機場的航空公司櫃檯，要搭飛機去洛杉磯。把報到從頭辦到尾。',
    start: 'n1',
    outro: '你自己辦好了報到：托運、選位、問登機門，一樣都沒漏。出國的第一關過了！',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good morning! Where are you flying today?',
        theyZh: '早安！今天要飛去哪裡？',
        choices: [
          { en: "I'd like to check in for my flight to Los Angeles.", zh: '我要辦理飛往洛杉磯的報到。', next: 'n2' },
          { en: "To Los Angeles. Here's my passport.", zh: '洛杉磯。這是我的護照。', next: 'n3' },
          { en: 'Hi. Sorry, is this the right line for Los Angeles?', zh: '嗨。不好意思，去洛杉磯是排這一排嗎？', next: 'n1-line' },
        ],
      },
      {
        id: 'n1-line',
        theyEn: 'Yes, it is. Are you checking in now?',
        theyZh: '對，沒錯。你現在要辦報到嗎？',
        choices: [
          { en: "Yes, please. Here's my passport.", zh: '對，麻煩你。這是我的護照。', next: 'n3' },
          { en: "Yes. I'd like to check in, please.", zh: '對。我要辦報到，謝謝。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Sure. May I see your passport, please?',
        theyZh: '好的。可以看一下你的護照嗎？',
        choices: [
          { en: 'Here you go.', zh: '在這裡。', next: 'n3' },
          { en: 'Sure, one second.', zh: '好，等我一下。', next: 'n3' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n2-repeat' },
        ],
      },
      {
        id: 'n2-repeat',
        theyEn: 'Your passport, please.',
        theyZh: '請給我你的護照。',
        choices: [
          { en: 'Oh, here you go.', zh: '喔，在這裡。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'Thank you. Are you checking any bags today?',
        theyZh: '謝謝。今天有要托運行李嗎？',
        choices: [
          { en: 'Yes, just this one.', zh: '有，就這一件。', next: 'n4' },
          { en: 'Yes, two bags.', zh: '有，兩件。', next: 'n4' },
          { en: 'No, just this carry-on.', zh: '沒有，只有這件隨身行李。', next: 'n4-carry' },
          { en: "Can I check this bag? It's a little heavy.", zh: '這件可以托運嗎？它有點重。', next: 'n4-heavy' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Great. Please put it on the scale... Perfect. Would you like a window or an aisle seat?',
        theyZh: '好的。請放上磅秤……沒問題。你想坐靠窗還是走道？',
        choices: seatChoices,
      },
      {
        id: 'n4-carry',
        theyEn: 'No problem. Would you like a window or an aisle seat?',
        theyZh: '沒問題。你想坐靠窗還是走道？',
        choices: seatChoices,
      },
      {
        id: 'n4-heavy',
        theyEn: "Let's see... It's 22 kilos. That's fine — the limit is 23. Would you like a window or an aisle seat?",
        theyZh: '我看看……22 公斤。沒問題，上限是 23 公斤。你想坐靠窗還是走道？',
        choices: seatChoices,
      },
      {
        id: 'n4-leg',
        theyEn: 'Exit row seats have more legroom, but they cost eighty dollars extra.',
        theyZh: '逃生門那排腳比較能伸展，但要多付八十美金。',
        choices: [
          { en: "Oh, I'll just take a window seat, then.", zh: '喔，那我坐靠窗就好。', next: 'n5' },
          { en: "That's okay. An aisle seat is fine.", zh: '沒關係，走道的位子就可以了。', next: 'n5' },
        ],
      },
      {
        id: 'n4-repeat',
        theyEn: 'Sure. Window seat... or aisle seat?',
        theyZh: '當然。靠窗……還是走道？',
        choices: [
          { en: 'Window, please.', zh: '靠窗，謝謝。', next: 'n5' },
          { en: 'Aisle, please.', zh: '走道，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: "You're all set. Your gate is B7, and boarding starts at 10:40.",
        theyZh: '好了。你的登機門是 B7，十點四十分開始登機。',
        choices: [
          { en: 'Where is my boarding gate?', zh: '我的登機門在哪裡？', next: 'n6-where' },
          { en: 'Let me make sure I understand. Gate B7 at 10:40?', zh: '讓我確認一下。B7 登機門，十點四十分？', next: 'n6-check' },
          { en: 'Is the flight on time today?', zh: '今天班機有準時嗎？', next: 'n6-time' },
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n6-where',
        theyEn: "Go through security, then turn left. It's about a ten-minute walk.",
        theyZh: '過了安檢之後左轉，大概走十分鐘。',
        choices: [
          { en: 'Got it. Thank you so much!', zh: '懂了。非常謝謝你！', next: null },
          { en: 'Ten minutes, okay. Thank you!', zh: '十分鐘，好的。謝謝！', next: null },
        ],
      },
      {
        id: 'n6-check',
        theyEn: "That's right. Have a great flight!",
        theyZh: '沒錯。祝你飛行愉快！',
        choices: [
          { en: 'Thank you. Have a nice day!', zh: '謝謝。祝你有美好的一天！', next: null },
        ],
      },
      {
        id: 'n6-time',
        theyEn: 'Yes, it is on time today.',
        theyZh: '有，今天是準時的。',
        choices: [
          { en: 'Great, thank you!', zh: '太好了，謝謝！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你在報到櫃檯，用 30 秒說完：要飛去哪裡、有幾件行李、想坐哪裡，最後問一個問題。',
    hints: ["I'd like to check in for my flight to ___.", 'I have ___ bag(s) to check.', 'What time does boarding start?'],
  },
  youtube: {
    label: '想多聽一點：機場報到對話',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=airport%20check%20in',
  },
}
