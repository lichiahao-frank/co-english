import type { Day } from '../types'

export const day11: Day = {
  day: 11,
  title: '美國入境與轉機',
  scene: '洛杉磯機場入境',
  emoji: '🛂',
  goal: '入境官最常問的三個問題都答得出來；轉機也問得到路。',
  phrases: [
    { id: 'd11-1', en: "I'm here on vacation.", zh: '我來度假的。', note: '入境官問 What\'s the purpose of your visit?（來的目的）就答這句。' },
    { id: 'd11-2', en: "I'm staying for ten days.", zh: '我會待十天。', note: '數字換成你真正要待的天數。答得簡短清楚最好。' },
    { id: 'd11-3', en: "I'm staying at a hotel in Los Angeles.", zh: '我住在洛杉磯的飯店。', note: '問 Where are you staying? 時用。有飯店名字就直接說名字。' },
    { id: 'd11-4', en: 'Here is my hotel reservation.', zh: '這是我的飯店訂房資料。', note: '說不清楚的時候，直接拿出資料給對方看，最快也最安心。' },
    { id: 'd11-5', en: 'Where do I go for my connecting flight?', zh: '轉機要往哪裡走？', note: 'connecting flight 就是「轉機的班機」。' },
  ],
  dialogue: {
    title: '排到入境官面前',
    lines: [
      { who: 'them', en: "Next. Passport, please. What's the purpose of your visit?", zh: '下一位。請給我護照。你來的目的是什麼？' },
      { who: 'you', en: "I'm here on vacation.", zh: '我來度假的。' },
      { who: 'them', en: 'How long are you staying?', zh: '你會待多久？' },
      { who: 'you', en: "I'm staying for ten days.", zh: '我會待十天。' },
      { who: 'them', en: 'Where are you staying?', zh: '你住在哪裡？' },
      { who: 'you', en: "I'm staying at a hotel in Los Angeles. Here is my hotel reservation.", zh: '我住在洛杉磯的飯店。這是我的訂房資料。' },
      { who: 'them', en: 'Okay. Please look at the camera... Welcome to the United States.', zh: '好。請看鏡頭……歡迎來到美國。' },
      { who: 'you', en: 'Thank you!', zh: '謝謝！' },
    ],
  },
  quiz: [
    {
      q: '入境官問了哪些事？',
      options: ['來的目的、待多久、住哪裡', '工作、薪水、家人', '行李重量、座位、餐點'],
      answer: 0,
    },
    {
      q: '你說你會待幾天？',
      options: ['七天', '十天', '十四天'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你剛下飛機，排到入境官面前。冷靜回答他的問題，然後找到轉機的路。',
    start: 'n1',
    outro: '入境官的問題你都答出來了，連轉機要重新托運行李都聽懂了。最讓人緊張的一關，你過了！',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Next, please. Passport?',
        theyZh: '下一位。護照？',
        choices: [
          { en: 'Here you go.', zh: '在這裡。', next: 'n2' },
          { en: 'Hello. Here is my passport.', zh: '你好。這是我的護照。', next: 'n2' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n1-repeat' },
        ],
      },
      {
        id: 'n1-repeat',
        theyEn: 'Your passport, please.',
        theyZh: '請給我你的護照。',
        choices: [
          { en: 'Oh, here you go.', zh: '喔，在這裡。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: "What's the purpose of your visit?",
        theyZh: '你來的目的是什麼？',
        choices: [
          { en: "I'm here on vacation.", zh: '我來度假的。', next: 'n3' },
          { en: 'Sightseeing. I want to see Los Angeles.', zh: '觀光。我想看看洛杉磯。', next: 'n3' },
          { en: "Do you mean why I'm here?", zh: '你是問我為什麼來嗎？', next: 'n2-mean' },
          { en: "I'm visiting a friend.", zh: '我來找朋友。', next: 'n2-friend' },
        ],
      },
      {
        id: 'n2-mean',
        theyEn: 'Yes. Why are you visiting the U.S.?',
        theyZh: '對。你為什麼來美國？',
        choices: [
          { en: 'For vacation.', zh: '來度假。', next: 'n3' },
          { en: 'Just sightseeing.', zh: '只是來觀光。', next: 'n3' },
        ],
      },
      {
        id: 'n2-friend',
        theyEn: 'Where does your friend live?',
        theyZh: '你朋友住在哪裡？',
        choices: [
          { en: 'My friend lives in Los Angeles.', zh: '我朋友住在洛杉磯。', next: 'n3' },
          { en: 'In Los Angeles. We met in Taiwan.', zh: '在洛杉磯。我們是在台灣認識的。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'How long are you staying?',
        theyZh: '你會待多久？',
        choices: [
          { en: "I'm staying for ten days.", zh: '我會待十天。', next: 'n4' },
          { en: 'About two weeks.', zh: '大概兩個禮拜。', next: 'n4' },
          { en: 'Ten days. Here is my return ticket.', zh: '十天。這是我的回程機票。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Where are you staying?',
        theyZh: '你住在哪裡？',
        choices: [
          { en: "I'm staying at a hotel in Los Angeles.", zh: '我住在洛杉磯的飯店。', next: 'n5' },
          { en: 'At the Grand Hotel downtown. Here is my hotel reservation.', zh: '市中心的 Grand Hotel。這是我的訂房資料。', next: 'n5' },
          { en: "At my friend's house in Los Angeles.", zh: '住在我朋友洛杉磯的家。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Okay. Please look at the camera... Welcome to the United States.',
        theyZh: '好。請看鏡頭……歡迎來到美國。',
        choices: [
          { en: 'Thank you! Where do I go for my connecting flight?', zh: '謝謝！轉機要往哪裡走？', next: 'n6' },
          { en: 'Thank you! Where is the baggage claim?', zh: '謝謝！行李提領處在哪裡？', next: 'n6-bag' },
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n6',
        theyEn: "Pick up your bag first, then follow the signs for Connecting Flights. You'll need to check it again.",
        theyZh: '先去領行李，然後跟著「轉機」的指標走。你要再托運一次。',
        choices: [
          { en: 'Do you mean I need to pick up my bag first?', zh: '你是說我要先去領行李嗎？', next: 'n6-check' },
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n6-slow' },
          { en: 'Got it. Thank you. Have a good day!', zh: '懂了。謝謝。祝你有美好的一天！', next: null },
        ],
      },
      {
        id: 'n6-check',
        theyEn: 'Yes. Pick it up, then drop it off again at the transfer desk.',
        theyZh: '對。先領起來，再到轉機櫃檯重新托運。',
        choices: [
          { en: 'Got it. Thank you!', zh: '懂了。謝謝！', next: null },
        ],
      },
      {
        id: 'n6-slow',
        theyEn: 'Sure. Get your bag... then follow the signs... for Connecting Flights.',
        theyZh: '當然。先拿行李……然後跟著指標……走到轉機。',
        choices: [
          { en: 'Okay. Thank you so much!', zh: '好的。非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n6-bag',
        theyEn: 'Go down the stairs and follow the signs for Baggage Claim.',
        theyZh: '下樓，然後跟著「行李提領」的指標走。',
        choices: [
          { en: 'Got it. Thank you!', zh: '懂了。謝謝！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝入境官在你面前：用 30 秒說出你來美國的目的、會待幾天、住在哪裡。',
    hints: ["I'm here on ___.", "I'm staying for ___ days.", "I'm staying at ___."],
  },
  youtube: {
    label: '想多聽一點：入境審查的對話',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=immigration',
  },
}
