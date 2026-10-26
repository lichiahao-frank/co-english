import type { Day } from '../types'

export const day05: Day = {
  day: 5,
  title: '飯店 Check-in',
  scene: '飯店櫃檯',
  emoji: '🏨',
  goal: '能報出訂房、拿到房卡，並問清楚早餐與退房時間。',
  phrases: [
    { id: 'd5-1', en: "I have a reservation under the name Queeni.", zh: '我用 Queeni 的名字訂了房。', note: '換成你訂房時用的英文名字。櫃檯一定會問這句。' },
    { id: 'd5-2', en: "I'd like to check in, please.", zh: '我想辦理入住，謝謝。', note: '走到櫃檯第一句就說這個。' },
    { id: 'd5-3', en: 'Is breakfast included?', zh: '有含早餐嗎？', note: 'included 很好用：Is Wi-Fi included?' },
    { id: 'd5-4', en: 'What time is check-out?', zh: '退房時間是幾點？', note: '通常是 11 點，但一定要問。' },
    { id: 'd5-5', en: 'Could I leave my luggage here after check-out?', zh: '退房後可以把行李寄放在這裡嗎？', note: '最後一天超好用。' },
  ],
  dialogue: {
    title: '抵達飯店，辦理入住',
    lines: [
      { who: 'you', en: "Hi, I'd like to check in, please.", zh: '嗨，我想辦理入住，謝謝。' },
      { who: 'them', en: 'Of course. Can I have your name and ID?', zh: '當然。可以給我你的名字和證件嗎？' },
      { who: 'you', en: 'I have a reservation under the name Queeni.', zh: '我用 Queeni 的名字訂了房。' },
      { who: 'them', en: 'Found it. Two nights, one queen bed. Is that right?', zh: '找到了。兩晚，一張大床。對嗎？' },
      { who: 'you', en: "Yes, that's right. Is breakfast included?", zh: '對，沒錯。有含早餐嗎？' },
      { who: 'them', en: 'It is. Breakfast is from seven to ten in the lobby.', zh: '有的。早餐是七點到十點，在大廳。' },
      { who: 'you', en: 'Great. And what time is check-out?', zh: '太好了。那退房時間是幾點？' },
      { who: 'them', en: 'Eleven a.m. Here is your key card. Room 408.', zh: '早上十一點。這是你的房卡，408 號房。' },
    ],
  },
  quiz: [
    {
      q: '早餐供應時間是？',
      options: ['六點到九點', '七點到十點', '八點到十一點'],
      answer: 1,
    },
    {
      q: '櫃檯最後給了什麼資訊？',
      options: ['房卡和房號', 'Wi-Fi 密碼', '停車位置'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '你剛到飯店，拖著行李走到櫃檯。完成入住，並問清楚你需要知道的事。',
    start: 'n1',
    outro: '你完成了整個 check-in，還主動問了早餐和退房時間。這一關過了，住宿就不用怕了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good evening! Checking in?',
        theyZh: '晚安！要辦理入住嗎？',
        choices: [
          { en: "Yes, I'd like to check in, please.", zh: '是的，我想辦理入住，謝謝。', next: 'n2' },
          { en: 'Yes, please. I have a reservation.', zh: '是的，麻煩你。我有訂房。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Wonderful. May I have the name on the reservation?',
        theyZh: '太好了。可以給我訂房的名字嗎？',
        choices: [
          { en: 'I have a reservation under the name Queeni.', zh: '我用 Queeni 的名字訂了房。', next: 'n3' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n2b' },
        ],
      },
      {
        id: 'n2b',
        theyEn: 'Sure — what name is the booking under?',
        theyZh: '當然——訂房是用什麼名字？',
        choices: [
          { en: "It's under Queeni.", zh: '是 Queeni。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'Thank you. I see two nights with a city view. Everything correct?',
        theyZh: '謝謝。我看到是兩晚，城市景觀房。都正確嗎？',
        choices: [
          { en: "Yes, that's right. Is breakfast included?", zh: '對，沒錯。有含早餐嗎？', next: 'n4' },
          { en: 'Yes. Is Wi-Fi included?', zh: '是的。有含 Wi-Fi 嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Yes, both are included. Breakfast runs from seven to ten.',
        theyZh: '是的，兩個都有包含。早餐七點到十點供應。',
        choices: [
          { en: 'Great. What time is check-out?', zh: '太好了。退房時間是幾點？', next: 'n5' },
          { en: 'Perfect, thank you.', zh: '太好了，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Check-out is at eleven. Here is your key card — room 408. Enjoy your stay!',
        theyZh: '退房時間是十一點。這是你的房卡，408 號房。住宿愉快！',
        choices: [
          { en: 'Thank you so much. Could I leave my luggage here after check-out?', zh: '非常謝謝。退房後可以把行李寄放在這裡嗎？', next: null },
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你站在飯店櫃檯，用 30 秒完成入住：說你要 check in、報名字、問一個你最在意的問題。',
    hints: ["I'd like to check in, please.", 'I have a reservation under ___.', 'Is breakfast included?'],
  },
  youtube: {
    label: '想多聽一點：飯店入住對話',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=hotel%20check%20in',
  },
}
