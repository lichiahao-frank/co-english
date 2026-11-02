import type { Day, RoleplayChoice } from '../types'

const seenChoices: RoleplayChoice[] = [
  { en: 'I went to the Statue of Liberty yesterday. It was amazing, but very crowded.', zh: '我昨天去了自由女神像。很棒，但人超多。', next: 'n2-liberty' },
  { en: 'I went to Times Square last night. It was so bright and so loud!', zh: '我昨晚去了時代廣場。超亮又超吵！', next: 'n2-times' },
  { en: 'Not much yet. I just got here yesterday. How about you?', zh: '還沒去什麼地方，我昨天才到。你呢？', next: 'n2-new' },
]

const parkChoices: RoleplayChoice[] = [
  { en: 'Not yet. Is it worth it?', zh: '還沒。值得去嗎？', next: 'n3' },
  { en: 'Yes! I had a picnic there. It was so relaxing.', zh: '去了！我在那裡野餐，很放鬆。', next: 'n3-yes' },
  { en: 'Yes, I walked there this morning. Have you been?', zh: '去了，今天早上去散步。你去過了嗎？', next: 'n3-ask' },
]

const todayChoices: RoleplayChoice[] = [
  { en: "I'm not sure yet. Do you have any recommendations?", zh: '還不確定。你有什麼推薦嗎？', next: 'n4-rec' },
  { en: "I'm going to a museum. Have you been to the Met?", zh: '我要去博物館。你去過大都會博物館嗎？', next: 'n4-met' },
  { en: 'I want to go shopping. Where should I go?', zh: '我想去逛街。該去哪裡？', next: 'n4-shop' },
]

export const day16: Day = {
  day: 16,
  title: '旅行與景點',
  scene: '紐約的飯店早餐',
  emoji: '📸',
  goal: '分享你去過哪裡、感覺如何，也開口問別人的推薦。',
  phrases: [
    { id: 'd16-1', en: 'Have you been to Central Park yet?', zh: '你去過中央公園了嗎？', note: 'yet 放在句尾，就是「了沒」的意思。' },
    { id: 'd16-2', en: 'I went to the Statue of Liberty yesterday.', zh: '我昨天去了自由女神像。', note: '說已經發生的事，go 要變成 went。' },
    { id: 'd16-3', en: 'It was amazing, but very crowded.', zh: '很棒，但是人超多。', note: '多補一個感覺，對方就有東西可以接話。' },
    { id: 'd16-4', en: 'Do you have any recommendations?', zh: '你有什麼推薦嗎？', note: '問當地人或其他遊客都很好用，大家都很愛推薦。' },
    { id: 'd16-5', en: "That's a great idea. I'll try that.", zh: '好主意。我會去試試看。', note: '別人給建議之後，用這句回應最自然。' },
  ],
  dialogue: {
    title: '飯店早餐時，同桌的旅客跟你聊天',
    lines: [
      { who: 'them', en: 'Good morning! Have you been to Central Park yet?', zh: '早安！你去過中央公園了嗎？' },
      { who: 'you', en: 'Not yet. I went to the Statue of Liberty yesterday.', zh: '還沒。我昨天去了自由女神像。' },
      { who: 'them', en: 'Oh, how was it?', zh: '喔，怎麼樣？' },
      { who: 'you', en: 'It was amazing, but very crowded. Do you have any recommendations for today?', zh: '很棒，但人超多。今天你有什麼推薦嗎？' },
      { who: 'them', en: 'You should walk across the Brooklyn Bridge. The view is beautiful.', zh: '你應該走一趟布魯克林大橋，風景很美。' },
      { who: 'you', en: "That's a great idea. I'll try that.", zh: '好主意。我會去試試看。' },
      { who: 'them', en: "Go early in the morning. It's less crowded then.", zh: '早上早一點去，那時候人比較少。' },
    ],
  },
  quiz: [
    {
      q: '你昨天去了哪裡？',
      options: ['中央公園', '自由女神像', '布魯克林大橋'],
      answer: 1,
    },
    {
      q: '對方建議什麼時候去布魯克林大橋？',
      options: ['早上早一點', '中午', '晚上'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '你在紐約的飯店吃早餐，同桌的旅客跟你聊起這幾天去了哪裡。分享你的經驗，也問問他的推薦。',
    start: 'n1',
    outro: '你不只說了去過哪裡，還補了感覺、問了推薦。旅行中最好聊的話題，就是彼此的行程。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Morning! So, what have you seen in New York so far?',
        theyZh: '早！你到紐約之後去了哪些地方？',
        choices: [
          ...seenChoices,
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n1-repeat' },
        ],
      },
      {
        id: 'n1-repeat',
        theyEn: 'Sure. What places have you visited here?',
        theyZh: '當然。你在這裡去過哪些地方？',
        choices: seenChoices,
      },
      {
        id: 'n2-liberty',
        theyEn: 'I know, the lines are so long! Have you been to Central Park yet?',
        theyZh: '對啊，排隊排超久！你去過中央公園了嗎？',
        choices: parkChoices,
      },
      {
        id: 'n2-times',
        theyEn: "Ha! It's crazy at night, isn't it? Have you been to Central Park yet?",
        theyZh: '哈！晚上超瘋狂的對吧？你去過中央公園了嗎？',
        choices: parkChoices,
      },
      {
        id: 'n2-new',
        theyEn: "I've been here a week. I went to three museums! Have you been to Central Park yet?",
        theyZh: '我來一個禮拜了，去了三間博物館！你去過中央公園了嗎？',
        choices: parkChoices,
      },
      {
        id: 'n3',
        theyEn: 'Definitely. You can rent a bike there — it\'s really fun. So, what are you doing today?',
        theyZh: '絕對值得。可以在那裡租腳踏車，很好玩。那你今天要做什麼？',
        choices: todayChoices,
      },
      {
        id: 'n3-yes',
        theyEn: "Nice! It's beautiful, isn't it? So, what are you doing today?",
        theyZh: '真好！很美對吧？那你今天要做什麼？',
        choices: todayChoices,
      },
      {
        id: 'n3-ask',
        theyEn: 'Yes, I went running there this morning! So, what are you doing today?',
        theyZh: '去了，我今天早上去那裡跑步！那你今天要做什麼？',
        choices: todayChoices,
      },
      {
        id: 'n4-rec',
        theyEn: "You should walk across the Brooklyn Bridge. Go early — it's less crowded.",
        theyZh: '你應該走一趟布魯克林大橋。早點去，人比較少。',
        choices: [
          { en: "That's a great idea. I'll try that.", zh: '好主意。我會去試試看。', next: null },
          { en: 'Thanks! How long does it take to walk across?', zh: '謝謝！走過去要多久？', next: 'n5-bridge' },
        ],
      },
      {
        id: 'n5-bridge',
        theyEn: 'About thirty minutes. Bring some water!',
        theyZh: '大概三十分鐘。記得帶水！',
        choices: [
          { en: 'Got it. Thank you so much!', zh: '了解。非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n4-met',
        theyEn: "Yes! It's huge. Plan at least three hours.",
        theyZh: '去過！超大的。至少要留三個小時。',
        choices: [
          { en: 'Three hours! Thank you for the tip.', zh: '三個小時！謝謝你的提醒。', next: null },
          { en: 'Wow. What did you like the most?', zh: '哇。你最喜歡哪個部分？', next: 'n5-met' },
        ],
      },
      {
        id: 'n5-met',
        theyEn: "The Egyptian art. It's amazing.",
        theyZh: '埃及的展區，超厲害的。',
        choices: [
          { en: "I'll check it out. Thanks!", zh: '我會去看看。謝謝！', next: null },
        ],
      },
      {
        id: 'n4-shop',
        theyEn: 'Try SoHo. There are lots of small shops there.',
        theyZh: '去 SoHo 看看，那裡有很多小店。',
        choices: [
          { en: 'SoHo. Could you write that down?', zh: 'SoHo。可以幫我寫下來嗎？', next: 'n5-write' },
          { en: 'Sounds fun. Thank you!', zh: '聽起來很好玩。謝謝！', next: null },
        ],
      },
      {
        id: 'n5-write',
        theyEn: 'Sure — S-O-H-O. Have fun!',
        theyZh: '好啊——S-O-H-O。玩得開心！',
        choices: [
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒說說你最近去過的一個地方（台灣或國外都可以）：去了哪裡、感覺怎樣，最後問對方一個推薦。',
    hints: ['I went to ___.', 'It was ___, but ___.', 'Do you have any recommendations?'],
  },
  youtube: {
    label: '想多聽一點：聊旅行經驗',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=travel',
  },
}
