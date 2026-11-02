import type { Day, RoleplayChoice } from '../types'

const missedChoices: RoleplayChoice[] = [
  { en: 'Yes. My first flight was delayed.', zh: '對。我的第一段班機延誤了。', next: 'n2' },
  { en: 'Oh no. Yes, I did.', zh: '喔不。對，我錯過了。', next: 'n2' },
]

const confirmChoices: RoleplayChoice[] = [
  { en: 'Okay. Can you put me on that flight?', zh: '好的。可以幫我改到那班嗎？', next: 'n3' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you so much for your help.', zh: '非常謝謝你的幫忙。', next: null },
  { en: 'Great. Have a good night!', zh: '太好了。祝你有個美好的夜晚！', next: null },
]

export const day23: Day = {
  day: 23,
  title: '轉機出狀況：延誤與改票',
  scene: '舊金山機場轉機櫃檯',
  emoji: '⏱️',
  goal: '班機延誤、錯過轉機時，能說清楚狀況，問到下一班、行李和住宿怎麼辦。',
  phrases: [
    { id: 'd23-1', en: 'My flight was delayed, and I missed my connection.', zh: '我的班機延誤，我錯過轉機了。', note: '到轉機櫃檯先說這句，對方就知道要幫你做什麼。' },
    { id: 'd23-2', en: 'Can you put me on the next flight?', zh: '可以幫我改到下一班嗎？', note: 'put me on ___ 是「幫我排上某班飛機」。' },
    { id: 'd23-3', en: 'Has the gate changed?', zh: '登機門換了嗎？', note: '登機門常臨時更換，看到螢幕跟登機證不一樣就問。' },
    { id: 'd23-4', en: 'Can I get a hotel voucher?', zh: '可以給我飯店住宿券嗎？', note: '如果要隔天才能飛，記得問。是航空公司造成的延誤，通常會提供。' },
    { id: 'd23-5', en: 'What about my checked bag?', zh: '那我托運的行李怎麼辦？', note: '改班機時一定要問，確認行李會跟著你走。' },
  ],
  dialogue: {
    title: '錯過轉機，到櫃檯求助',
    lines: [
      { who: 'you', en: 'Excuse me. My flight was delayed, and I missed my connection.', zh: '不好意思。我的班機延誤，我錯過轉機了。' },
      { who: 'them', en: "I'm sorry about that. Where were you going?", zh: '很抱歉。你原本要去哪裡？' },
      { who: 'you', en: 'Taipei.', zh: '台北。' },
      { who: 'them', en: 'The next flight to Taipei leaves tomorrow at 11 a.m.', zh: '下一班飛台北的是明天早上十一點。' },
      { who: 'you', en: 'Can you put me on the next flight?', zh: '可以幫我改到下一班嗎？' },
      { who: 'them', en: "Yes, I've booked you on it.", zh: '可以，我已經幫你訂好了。' },
      { who: 'you', en: 'Thank you. Can I get a hotel voucher?', zh: '謝謝。可以給我飯店住宿券嗎？' },
      { who: 'them', en: "Yes. Here's a voucher for the airport hotel, and one for dinner.", zh: '可以。這是機場飯店的住宿券，還有一張晚餐券。' },
    ],
  },
  quiz: [
    {
      q: '下一班飛台北的是什麼時候？',
      options: ['今晚十一點', '明天早上十一點', '明天晚上'],
      answer: 1,
    },
    {
      q: '航空公司給了你什麼？',
      options: ['機票退款', '飯店住宿券和晚餐券', '升等商務艙'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你從波士頓飛到舊金山要轉機回台北，但第一段延誤了。去轉機櫃檯處理，看看能怎麼安排。',
    start: 'n1',
    outro: '錯過轉機是旅行中最慌的時刻之一。你冷靜地問了下一班、行李和住宿——這就是應變能力。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Next, please. How can I help you?',
        theyZh: '下一位。有什麼可以幫你的？',
        choices: [
          { en: 'My flight was delayed, and I missed my connection.', zh: '我的班機延誤，我錯過轉機了。', next: 'n2' },
          { en: 'Hi. I think I missed my flight to Taipei.', zh: '嗨。我好像錯過飛台北的班機了。', next: 'n2' },
          { en: 'Hi. Has the gate changed for the flight to Taipei?', zh: '嗨。飛台北的班機換登機門了嗎？', next: 'n1-gate' },
        ],
      },
      {
        id: 'n1-gate',
        theyEn: "I'm afraid that flight already left. Did you miss it?",
        theyZh: '恐怕那班已經飛走了。你錯過了嗎？',
        choices: missedChoices,
      },
      {
        id: 'n2',
        theyEn: "I'm sorry about that. Let me check... The next flight to Taipei leaves tomorrow at 11 a.m.",
        theyZh: '很抱歉。我查一下……下一班飛台北的是明天早上十一點。',
        choices: [
          { en: 'Can you put me on the next flight?', zh: '可以幫我改到下一班嗎？', next: 'n3' },
          { en: 'Tomorrow? Is there anything tonight?', zh: '明天？今晚有沒有其他班？', next: 'n2-tonight' },
          { en: 'Let me make sure I understand. Tomorrow at eleven in the morning?', zh: '讓我確認一下。明天早上十一點？', next: 'n2-check' },
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n2-slow' },
        ],
      },
      {
        id: 'n2-check',
        theyEn: "That's right. 11 a.m. tomorrow.",
        theyZh: '沒錯，明天早上十一點。',
        choices: confirmChoices,
      },
      {
        id: 'n2-slow',
        theyEn: 'Sure. The next flight... is tomorrow... at eleven a.m.',
        theyZh: '當然。下一班……是明天……早上十一點。',
        choices: confirmChoices,
      },
      {
        id: 'n2-tonight',
        theyEn: "There's a flight through Tokyo tonight, but you'd land four hours later.",
        theyZh: '今晚有一班經東京轉機的，但你會晚四個小時到。',
        choices: [
          { en: "That's okay. I'll take tomorrow's flight.", zh: '沒關係，我搭明天那班。', next: 'n3' },
          { en: 'Through Tokyo is fine. Can you book that?', zh: '經東京也可以。可以幫我訂那班嗎？', next: 'n3-tokyo' },
        ],
      },
      {
        id: 'n3',
        theyEn: "Done. You're booked on tomorrow's flight. Here's your new boarding pass.",
        theyZh: '好了。已經幫你訂明天那班。這是你的新登機證。',
        choices: [
          { en: 'Thank you. Can I get a hotel voucher?', zh: '謝謝。可以給我飯店住宿券嗎？', next: 'n4-hotel' },
          { en: 'What about my checked bag?', zh: '那我托運的行李怎麼辦？', next: 'n4-bag' },
          { en: 'Which gate does it leave from?', zh: '是從哪個登機門出發？', next: 'n4-gate' },
        ],
      },
      {
        id: 'n3-tokyo',
        theyEn: "Done. You're on the Tokyo flight tonight, from gate G9. Here's your boarding pass.",
        theyZh: '好了。你改搭今晚經東京的班機，G9 登機門。這是你的登機證。',
        choices: [
          { en: 'What about my checked bag?', zh: '那我托運的行李怎麼辦？', next: 'n4-tokyo-bag' },
          { en: 'How do I get to gate G9?', zh: 'G9 登機門要怎麼走？', next: 'n4-g9' },
        ],
      },
      {
        id: 'n4-hotel',
        theyEn: "Yes. Here's a voucher for the airport hotel, and one for dinner.",
        theyZh: '可以。這是機場飯店的住宿券，還有一張晚餐券。',
        choices: [
          { en: 'How do I get to the hotel?', zh: '飯店要怎麼去？', next: 'n5' },
          { en: 'Thank you so much for your help.', zh: '非常謝謝你的幫忙。', next: null },
        ],
      },
      {
        id: 'n4-bag',
        theyEn: "It will go on tomorrow's flight with you. You don't need to pick it up.",
        theyZh: '它會跟你搭明天同一班。你不用去領。',
        choices: [
          { en: 'Great. Can I get a hotel voucher?', zh: '太好了。可以給我飯店住宿券嗎？', next: 'n4-hotel' },
          { en: 'Okay, thank you.', zh: '好的，謝謝。', next: null },
        ],
      },
      {
        id: 'n4-gate',
        theyEn: 'Gate G5, in the International Terminal. Check the screens tomorrow — gates can change.',
        theyZh: '國際航廈的 G5 登機門。明天記得看一下螢幕，登機門可能會換。',
        choices: [
          { en: 'G5. Got it. Can I get a hotel voucher?', zh: 'G5，懂了。可以給我飯店住宿券嗎？', next: 'n4-hotel' },
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n4-tokyo-bag',
        theyEn: "We'll move it to your new flight for you.",
        theyZh: '我們會幫你把它轉到新的班機。',
        choices: endChoices,
      },
      {
        id: 'n4-g9',
        theyEn: 'Take the AirTrain to the International Terminal, then follow the signs.',
        theyZh: '搭機場電車到國際航廈，再跟著指標走。',
        choices: endChoices,
      },
      {
        id: 'n5',
        theyEn: "There's a free shuttle outside door 7.",
        theyZh: '七號門外面有免費的接駁車。',
        choices: endChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你錯過轉機了：用 30 秒跟櫃檯說明狀況，要求改到下一班，再問一個你在意的問題（行李、住宿、登機門）。',
    hints: ['My flight was delayed, and I missed ___.', 'Can you put me on the next flight?', 'What about my ___?'],
  },
  youtube: {
    label: '想多聽一點：班機延誤的對話',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=flight%20delayed',
  },
}
