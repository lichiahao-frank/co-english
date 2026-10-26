import type { Day } from '../types'

export const day02: Day = {
  day: 2,
  title: '打招呼與結束聊天',
  scene: '飯店大廳',
  emoji: '👋',
  goal: '能自然地開始一段閒聊，也能禮貌地結束它。',
  phrases: [
    { id: 'd2-1', en: "How's it going?", zh: '最近好嗎？', note: '比 How are you 更日常，美國人天天在用。' },
    { id: 'd2-2', en: "I'm good, thank you. How about you?", zh: '我很好，謝謝。你呢？', note: '最萬用的回答，記起來就不會卡住。' },
    { id: 'd2-3', en: "I'm really into traveling.", zh: '我很喜歡旅行。', note: 'really into 後面換成任何興趣：cooking、movies、learning new things。' },
    { id: 'd2-4', en: "I'm looking forward to this trip.", zh: '我很期待這趟旅行。', note: '表達期待，對方通常會接著問你要去哪。' },
    { id: 'd2-5', en: 'It was nice talking to you.', zh: '很高興跟你聊天。', note: '想結束對話時說這句，禮貌又自然。' },
  ],
  dialogue: {
    title: '在飯店大廳等電梯時',
    lines: [
      { who: 'them', en: 'Morning! How\'s it going?', zh: '早安！最近好嗎？' },
      { who: 'you', en: "I'm good, thank you. How about you?", zh: '我很好，謝謝。你呢？' },
      { who: 'them', en: "Pretty good. Are you here on vacation?", zh: '還不錯。你是來度假的嗎？' },
      { who: 'you', en: "Yes, I'm looking forward to this trip.", zh: '對，我很期待這趟旅行。' },
      { who: 'them', en: 'Nice! What are you planning to do today?', zh: '太好了！你今天打算做什麼？' },
      { who: 'you', en: "I'm not sure yet. Maybe just walk around.", zh: '還不確定，可能就到處走走。' },
      { who: 'them', en: 'That sounds lovely. Well, have a great day!', zh: '聽起來很棒。祝你有美好的一天！' },
      { who: 'you', en: 'You too. It was nice talking to you.', zh: '你也是。很高興跟你聊天。' },
    ],
  },
  quiz: [
    {
      q: '對方問你今天打算做什麼，你怎麼回答？',
      options: ['還不確定，可能到處走走', '我要回家了', '我不會說英文'],
      answer: 0,
    },
    {
      q: '最後兩個人怎麼結束對話？',
      options: ['直接走掉', '互道祝福並說很高興聊天', '約好明天見'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在飯店電梯口遇到同樓層的房客，她先跟你打招呼。',
    start: 'n1',
    outro: '你不只接住了話，還自己結束了對話。這比你想的更難、也更重要。',
    nodes: [
      {
        id: 'n1',
        theyEn: "Good morning! How's it going?",
        theyZh: '早安！最近好嗎？',
        choices: [
          { en: "I'm good, thank you. How about you?", zh: '我很好，謝謝。你呢？', next: 'n2' },
          { en: "Morning! I'm doing well.", zh: '早安！我很好。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: "Can't complain. Are you traveling for work or for fun?",
        theyZh: '還不錯。你是來出差還是來玩的？',
        choices: [
          { en: "For fun. I'm looking forward to this trip.", zh: '來玩的，我很期待這趟旅行。', next: 'n3' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n2b' },
        ],
      },
      {
        id: 'n2b',
        theyEn: 'Sure — are you here for work, or for fun?',
        theyZh: '當然——你是來工作，還是來玩的？',
        choices: [
          { en: 'For fun! My first trip to the States.', zh: '來玩的！我第一次來美國。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'How fun! What do you like to do in your free time?',
        theyZh: '真好玩！你空閒時喜歡做什麼？',
        choices: [
          { en: "I'm really into traveling.", zh: '我很喜歡旅行。', next: 'n4' },
          { en: "I'm really into learning new things.", zh: '我很喜歡學新東西。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Oh nice, there is so much to see around here. Anyway, I should get going.',
        theyZh: '喔不錯，這附近有很多值得看的。不過我該走了。',
        choices: [
          { en: 'It was nice talking to you. Have a great day!', zh: '很高興跟你聊天。祝你有美好的一天！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒說說你空閒時喜歡做什麼，為什麼喜歡。',
    hints: ["I'm really into ___.", 'I like it because ___.', 'I usually do it on weekends.'],
  },
  youtube: {
    label: '想多聽一點：美國人怎麼閒聊',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=small%20talk',
  },
}
