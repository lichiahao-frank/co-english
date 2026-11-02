import type { Day, RoleplayChoice } from '../types'

const roomNumberChoices: RoleplayChoice[] = [
  { en: 'Room 1204.', zh: '1204 號房。', next: 'n3' },
  { en: "It's 1204. My name is Queeni.", zh: '1204。我叫 Queeni。', next: 'n3' },
  { en: 'Twelve-oh-four.', zh: '十二、零四（美國人唸房號的方式）。', next: 'n3' },
]

const afterKeyChoices: RoleplayChoice[] = [
  { en: 'Thank you. Also, the Wi-Fi keeps disconnecting.', zh: '謝謝。還有，Wi-Fi 一直斷線。', next: 'n5-wifi' },
  { en: 'Thanks. Also, the people next door are very loud.', zh: '謝謝。還有，隔壁的人很吵。', next: 'n5-noise' },
  { en: 'Thank you. Could I get a late check-out tomorrow?', zh: '謝謝。明天可以晚一點退房嗎？', next: 'n5-late' },
  { en: 'Thank you so much. Good night!', zh: '非常謝謝。晚安！', next: null },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you so much. Good night!', zh: '非常謝謝。晚安！', next: null },
  { en: 'I really appreciate it.', zh: '真的很感謝。', next: null },
]

export const day25: Day = {
  day: 25,
  title: '飯店突發狀況',
  scene: '波士頓飯店的深夜',
  emoji: '🔑',
  goal: '房卡失靈、網路斷線、隔壁吵鬧，都能清楚描述問題、請飯店處理。',
  phrases: [
    { id: 'd25-1', en: 'I locked myself out of my room.', zh: '我把自己鎖在房門外了。', note: '房卡忘在房間裡時用。飯店很常遇到，不用不好意思。' },
    { id: 'd25-2', en: "My key card isn't working.", zh: '我的房卡不能用。', note: '房卡放在手機旁邊容易消磁，櫃檯重做一張就好。' },
    { id: 'd25-3', en: 'The Wi-Fi keeps disconnecting.', zh: 'Wi-Fi 一直斷線。', note: 'keeps + -ing 是「一直……」。The baby keeps crying 也是同一個用法。' },
    { id: 'd25-4', en: 'The people next door are very loud.', zh: '隔壁的人很吵。', note: '晚上被吵到可以直接打給櫃檯，他們會處理。' },
    { id: 'd25-5', en: 'Could you send someone to check?', zh: '可以派人來看一下嗎？', note: '自己處理不了的問題，用這句請飯店派人。' },
  ],
  dialogue: {
    title: '半夜打電話給櫃檯',
    lines: [
      { who: 'them', en: 'Front desk. How can I help?', zh: '櫃檯您好。有什麼需要幫忙的？' },
      { who: 'you', en: 'Hi, this is room 1204. The people next door are very loud.', zh: '嗨，我是 1204 號房。隔壁的人很吵。' },
      { who: 'them', en: "I'm so sorry. I'll call them right away.", zh: '真的很抱歉。我馬上打給他們。' },
      { who: 'you', en: 'Thank you. Also, the Wi-Fi keeps disconnecting.', zh: '謝謝。還有，Wi-Fi 一直斷線。' },
      { who: 'them', en: 'Let me reset it for you. Try again in five minutes.', zh: '我幫你重新設定。五分鐘後再試試看。' },
      { who: 'you', en: "Okay. If it doesn't work, could you send someone to check?", zh: '好的。如果還是不行，可以派人來看一下嗎？' },
      { who: 'them', en: 'Of course. Just give us a call.', zh: '當然。再打給我們就好。' },
    ],
  },
  quiz: [
    {
      q: '你一開始打給櫃檯是為了什麼？',
      options: ['房間太冷', '隔壁很吵', '沒有熱水'],
      answer: 1,
    },
    {
      q: '櫃檯說 Wi-Fi 要等多久再試？',
      options: ['一分鐘', '五分鐘', '十五分鐘'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '晚上你出去買宵夜，回來才發現房卡打不開門。到櫃檯求救，順便反映其他問題。',
    start: 'n1',
    outro: '進不了房間、網路斷線、隔壁吵鬧，你都冷靜地說清楚了。出問題時敢開口，旅行就不可怕了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good evening. How can I help you?',
        theyZh: '晚安。有什麼可以幫你的？',
        choices: [
          { en: "Hi. My key card isn't working.", zh: '嗨。我的房卡不能用。', next: 'n2-card' },
          { en: 'I locked myself out of my room. My key is inside.', zh: '我把自己鎖在房門外了，房卡在裡面。', next: 'n2-locked' },
          { en: "Excuse me. Sorry, I can't open my door.", zh: '不好意思，我打不開我的房門。', next: 'n2-card' },
        ],
      },
      {
        id: 'n2-card',
        theyEn: "Let me take a look. What's your room number?",
        theyZh: '我看一下。你的房號是？',
        choices: roomNumberChoices,
      },
      {
        id: 'n2-locked',
        theyEn: "No problem, it happens all the time! What's your room number?",
        theyZh: '沒問題，這很常發生！你的房號是？',
        choices: roomNumberChoices,
      },
      {
        id: 'n3',
        theyEn: 'Can I see your ID, please?',
        theyZh: '可以看一下你的證件嗎？',
        choices: [
          { en: "Here's my passport.", zh: '這是我的護照。', next: 'n4' },
          { en: 'My passport is in my room. Could someone come up with me?', zh: '我的護照在房間裡。可以請人跟我上去嗎？', next: 'n3-come' },
          { en: 'Sorry, what is ID?', zh: '不好意思，ID 是什麼？', next: 'n3-what' },
        ],
      },
      {
        id: 'n3-what',
        theyEn: 'Something with your name and photo, like a passport.',
        theyZh: '有你名字和照片的東西，像是護照。',
        choices: [
          { en: "Oh! Here's my passport.", zh: '喔！這是我的護照。', next: 'n4' },
          { en: 'My passport is in my room. Could someone come up with me?', zh: '我的護照在房間裡。可以請人跟我上去嗎？', next: 'n3-come' },
        ],
      },
      {
        id: 'n3-come',
        theyEn: "Sure, I'll walk up with you and check it there... Okay, all good. Here's a new key card.",
        theyZh: '好，我陪你上去看……好，沒問題。這是新的房卡。',
        choices: afterKeyChoices,
      },
      {
        id: 'n4',
        theyEn: "Thank you. Here's a new key card. Sorry about that!",
        theyZh: '謝謝。這是新的房卡。不好意思！',
        choices: afterKeyChoices,
      },
      {
        id: 'n5-wifi',
        theyEn: "I'm sorry. Let me reset it. Try again in five minutes.",
        theyZh: '很抱歉。我重新設定一下。五分鐘後再試試看。',
        choices: [
          { en: "If it doesn't work, could you send someone to check?", zh: '如果還是不行，可以派人來看一下嗎？', next: 'n6-wifi' },
          { en: "Okay, I'll try again. Thank you.", zh: '好，我再試試看。謝謝。', next: null },
        ],
      },
      {
        id: 'n6-wifi',
        theyEn: 'Of course. Just call the front desk.',
        theyZh: '當然。打給櫃檯就好。',
        choices: endChoices,
      },
      {
        id: 'n5-noise',
        theyEn: "I'm so sorry. I'll call them right away.",
        theyZh: '真的很抱歉。我馬上打給他們。',
        choices: [
          { en: "Thank you. If it doesn't stop, can I change rooms?", zh: '謝謝。如果還是很吵，我可以換房嗎？', next: 'n6-room' },
          { en: 'Thank you. I really need to sleep!', zh: '謝謝。我真的需要睡覺！', next: null },
        ],
      },
      {
        id: 'n6-room',
        theyEn: "Yes. I'll keep a quiet room ready for you, just in case.",
        theyZh: '可以。我先幫你留一間安靜的房間，以防萬一。',
        choices: endChoices,
      },
      {
        id: 'n5-late',
        theyEn: 'Sure, I can give you until noon.',
        theyZh: '可以，我可以讓你待到中午。',
        choices: [
          { en: 'Noon is perfect. Thank you!', zh: '中午剛好。謝謝！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '想一個住飯店可能遇到的問題（冷氣、熱水、Wi-Fi、吵鬧都可以），用 30 秒打電話跟櫃檯說明，並請他們處理。',
    hints: ['Hi, this is room ___.', 'The ___ keeps ___.', 'Could you send someone to check?'],
  },
  youtube: {
    label: '想多聽一點：反映飯店問題',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=hotel%20problem',
  },
}
