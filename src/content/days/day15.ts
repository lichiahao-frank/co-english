import type { Day, RoleplayChoice } from '../types'

const fromChoices: RoleplayChoice[] = [
  { en: 'Taiwan.', zh: '台灣。', next: 'n3-short' },
  { en: "I'm from Taiwan. It's a small island near Japan.", zh: '我來自台灣，是日本附近的一個小島。', next: 'n3-detail' },
  { en: "I'm from Taiwan. How about you?", zh: '我來自台灣。那你呢？', next: 'n3-ask' },
]

const firstTimeChoices: RoleplayChoice[] = [
  { en: 'Yes.', zh: '對。', next: 'n4-short' },
  { en: "Yes, it's my first time, and I love it so far.", zh: '對，是第一次來，到目前為止很喜歡。', next: 'n4-detail' },
  { en: "Yes, it's my first time. How about you?", zh: '對，是第一次。那你呢？', next: 'n4-ask' },
  { en: "Yes, and I'm a little nervous. My English isn't perfect.", zh: '對，而且我有點緊張。我的英文不是很好。', next: 'n4-nervous' },
]

const stayChoices: RoleplayChoice[] = [
  { en: 'About a week. How about you?', zh: '大概一個禮拜。你呢？', next: 'n5-ask' },
  { en: 'One week. I really want to see a Broadway show.', zh: '一個禮拜。我很想看一場百老匯。', next: 'n5-show' },
  { en: 'About a week.', zh: '大概一個禮拜。', next: 'n5' },
]

const goChoices: RoleplayChoice[] = [
  { en: "Sure, let's go!", zh: '好啊，走吧！', next: null },
  { en: 'Sounds good!', zh: '好喔！', next: null },
]

export const day15: Day = {
  day: 15,
  title: '認識新朋友：回答＋補充＋反問',
  scene: '紐約的徒步導覽',
  emoji: '🤝',
  goal: '學會讓對話接得下去的祕訣：回答之後多補一句，再反問一句。',
  phrases: [
    { id: 'd15-1', en: 'Where are you visiting from?', zh: '你是從哪裡來玩的？', note: '遇到其他遊客時的開場問題，比 Where are you from? 更自然。' },
    { id: 'd15-2', en: 'Is this your first time in New York?', zh: '這是你第一次來紐約嗎？', note: '城市換掉，到哪裡都能問。' },
    { id: 'd15-3', en: "Yes, it's my first time, and I love it so far.", zh: '對，是第一次來，到目前為止很喜歡。', note: 'so far 是「到目前為止」。回答＋補充，對方就有話可以接。' },
    { id: 'd15-4', en: 'How long are you staying here?', zh: '你會在這裡待多久？', note: '跟入境官問的一樣，但這次是你問別人。' },
    { id: 'd15-5', en: 'What brings you to New York?', zh: '你為什麼來紐約？', note: '比 Why are you here? 溫和很多，是很道地的問法。' },
  ],
  dialogue: {
    title: '徒步導覽開始前，旁邊的遊客跟你聊天',
    lines: [
      { who: 'them', en: 'Hi! Are you here for the walking tour too?', zh: '嗨！你也是來參加徒步導覽的嗎？' },
      { who: 'you', en: "Yes! I'm Queeni. Where are you visiting from?", zh: '對！我是 Queeni。你是從哪裡來玩的？' },
      { who: 'them', en: "I'm Tom, from Australia. How about you?", zh: '我是 Tom，從澳洲來的。你呢？' },
      { who: 'you', en: "I'm from Taiwan. Is this your first time in New York?", zh: '我來自台灣。這是你第一次來紐約嗎？' },
      { who: 'them', en: "No, it's my third time. I love it here. What about you?", zh: '不是，第三次了。我很愛這裡。你呢？' },
      { who: 'you', en: "Yes, it's my first time, and I love it so far. How long are you staying here?", zh: '對，是第一次來，到目前為止很喜歡。你會在這裡待多久？' },
      { who: 'them', en: 'Just five days. And you?', zh: '只有五天。你呢？' },
      { who: 'you', en: 'About a week.', zh: '大概一個禮拜。' },
    ],
  },
  quiz: [
    {
      q: 'Tom 從哪裡來？',
      options: ['英國', '澳洲', '加拿大'],
      answer: 1,
    },
    {
      q: '這是 Tom 第幾次來紐約？',
      options: ['第一次', '第二次', '第三次'],
      answer: 2,
    },
  ],
  roleplay: {
    intro: '你在紐約參加徒步導覽，旁邊的遊客跟你搭話。試試三種回答：只回一個字、多補一句、再反問一句，感受對話有什麼不同。',
    start: 'n1',
    outro: '你發現了嗎？只回一個字，對話容易卡住；多補一句、再反問一句，對方就接得下去。這就是「回答＋補充＋反問」。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi! Are you here for the walking tour too?',
        theyZh: '嗨！你也是來參加徒步導覽的嗎？',
        choices: [
          { en: "Yes! I'm Queeni. Nice to meet you.", zh: '對！我是 Queeni，很高興認識你。', next: 'n2' },
          { en: 'Yes. Is this the right place?', zh: '對。是在這裡集合嗎？', next: 'n2-place' },
          { en: "Yes! I'm Queeni. Where are you visiting from?", zh: '對！我是 Queeni。你是從哪裡來玩的？', next: 'n2-ask' },
        ],
      },
      {
        id: 'n2',
        theyEn: "Nice to meet you! I'm Tom. Where are you visiting from?",
        theyZh: '很高興認識你！我是 Tom。你是從哪裡來玩的？',
        choices: fromChoices,
      },
      {
        id: 'n2-place',
        theyEn: "Yes, it starts here at ten. I'm Tom, by the way. Where are you visiting from?",
        theyZh: '對，十點在這裡出發。對了，我是 Tom。你是從哪裡來玩的？',
        choices: fromChoices,
      },
      {
        id: 'n2-ask',
        theyEn: "I'm Tom, from Australia. How about you?",
        theyZh: '我是 Tom，從澳洲來的。你呢？',
        choices: [
          { en: 'Taiwan.', zh: '台灣。', next: 'n3-short' },
          { en: "I'm from Taiwan. I've always wanted to go to Australia!", zh: '我來自台灣。我一直很想去澳洲！', next: 'n3-aus' },
          { en: "I'm from Taiwan. Which city in Australia?", zh: '我來自台灣。你是澳洲哪個城市？', next: 'n3-city' },
        ],
      },
      {
        id: 'n3-short',
        theyEn: 'Oh, cool... So, um... is this your first time in New York?',
        theyZh: '喔，酷……那，嗯……這是你第一次來紐約嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3-detail',
        theyEn: "Oh, I've heard of it! Is this your first time in New York?",
        theyZh: '喔，我聽過！這是你第一次來紐約嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3-ask',
        theyEn: "I'm from Sydney, Australia. Is this your first time in New York?",
        theyZh: '我從澳洲雪梨來的。這是你第一次來紐約嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3-aus',
        theyEn: 'You should come! Is this your first time in New York?',
        theyZh: '你該來玩！這是你第一次來紐約嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3-city',
        theyEn: 'Sydney. Is this your first time in New York?',
        theyZh: '雪梨。這是你第一次來紐約嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n4-short',
        theyEn: 'Oh, nice... So, how long are you staying?',
        theyZh: '喔，不錯……那你會待多久？',
        choices: stayChoices,
      },
      {
        id: 'n4-detail',
        theyEn: "That's great! It's an amazing city. How long are you staying?",
        theyZh: '太好了！這城市很棒。你會待多久？',
        choices: stayChoices,
      },
      {
        id: 'n4-ask',
        theyEn: "It's my third time. I just love this city. How long are you staying?",
        theyZh: '這是我第三次來。我就是很愛這城市。你會待多久？',
        choices: stayChoices,
      },
      {
        id: 'n4-nervous',
        theyEn: "Your English is great! Don't worry. How long are you staying?",
        theyZh: '你的英文很好啊！別擔心。你會待多久？',
        choices: stayChoices,
      },
      {
        id: 'n5',
        theyEn: "Nice. Oh, the tour is starting! Let's walk together.",
        theyZh: '不錯。喔，導覽要開始了！我們一起走吧。',
        choices: goChoices,
      },
      {
        id: 'n5-ask',
        theyEn: "Just five days. Oh, the tour is starting! Let's walk together.",
        theyZh: '只有五天。喔，導覽要開始了！我們一起走吧。',
        choices: goChoices,
      },
      {
        id: 'n5-show',
        theyEn: "Oh, you have to! I saw one last night. Oh, the tour is starting — let's walk together!",
        theyZh: '喔，一定要看！我昨晚看了一場。喔，導覽要開始了——我們一起走吧！',
        choices: goChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '用「回答＋補充＋反問」回答這一題：Is this your first time in New York? 30 秒內把三個部分都說出來。',
    hints: ["Yes, it's my first time.", 'I really want to see ___.', 'How about you?'],
  },
  youtube: {
    label: '想多聽一點：認識新朋友的對話',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=meeting%20new%20people',
  },
}
