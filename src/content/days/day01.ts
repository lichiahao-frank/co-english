import type { Day } from '../types'

export const day01: Day = {
  day: 1,
  title: '你的自我介紹＋兩句救命英文',
  scene: '飛機上',
  emoji: '✈️',
  goal: '能說出完整的自我介紹；聽不懂的時候知道怎麼求救。',
  phrases: [
    { id: 'd1-1', en: "Hi, I'm Queeni. I'm from Taiwan.", zh: '嗨，我是 Queeni，我來自台灣。', note: '第一句話最重要，練到不用想就能說出口。' },
    { id: 'd1-2', en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。', note: '外國人很愛問 What do you do? 先把這句準備好。' },
    { id: 'd1-3', en: 'I enjoy traveling and meeting new people.', zh: '我喜歡旅行和認識新朋友。', note: 'enjoy 後面接 -ing。換成 cooking、hiking 都可以。' },
    { id: 'd1-4', en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', note: '第一句救命英文。聽不懂不用慌，問就對了。' },
    { id: 'd1-5', en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', note: '第二句救命英文。對方通常會很樂意放慢。' },
  ],
  dialogue: {
    title: '飛機上，隔壁座位的人跟你說話',
    lines: [
      { who: 'them', en: 'Hi there! Is this your first time flying to the States?', zh: '嗨！這是你第一次飛美國嗎？' },
      { who: 'you', en: "Hi! Yes, it is. I'm a little nervous.", zh: '嗨！是的。我有點緊張。' },
      { who: 'them', en: "Oh, you'll be fine. So what do you do?", zh: '喔，你會沒事的。那你是做什麼的？' },
      { who: 'you', en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。' },
      { who: 'them', en: 'That sounds interesting. Are you here for work?', zh: '聽起來很有趣。你是來出差的嗎？' },
      { who: 'you', en: 'No, just for fun. I enjoy traveling and meeting new people.', zh: '不是，純粹來玩的。我喜歡旅行和認識新朋友。' },
      { who: 'them', en: 'Nice! Where are you from?', zh: '真好！你從哪裡來？' },
      { who: 'you', en: "I'm from Taiwan. How about you?", zh: '我來自台灣。那你呢？' },
      { who: 'them', en: "I'm from Seattle. I'm heading home.", zh: '我來自西雅圖，我要回家。' },
    ],
  },
  quiz: [
    {
      q: '對方問你是做什麼工作的，你怎麼回答？',
      options: ['我在醫療器材產業工作', '我是護理師', '我還在念書'],
      answer: 0,
    },
    {
      q: '這趟去美國的目的是什麼？',
      options: ['出差', '純粹來玩', '去念書'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在飛機上，隔壁的乘客轉過來跟你打招呼。試著用你自己的身分回應她。',
    start: 'n1',
    outro: '你完成了第一次完整的自我介紹，而且用上了救命英文。這就是最難的第一步。',
    nodes: [
      {
        id: 'n1',
        theyEn: "Hi! I don't think we've met. I'm Dana.",
        theyZh: '嗨！我們好像還沒見過。我是 Dana。',
        choices: [
          { en: "Hi Dana, I'm Queeni. Nice to meet you.", zh: '嗨 Dana，我是 Queeni，很高興認識你。', next: 'n2' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n1b' },
        ],
      },
      {
        id: 'n1b',
        theyEn: "Of course! I said I'm Dana. And you are?",
        theyZh: '當然！我說我是 Dana。你呢？',
        choices: [
          { en: "I'm Queeni. Nice to meet you.", zh: '我是 Queeni，很高興認識你。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Nice to meet you too, Queeni. Where are you from?',
        theyZh: '我也很高興認識你，Queeni。你從哪裡來？',
        choices: [
          { en: "I'm from Taiwan. How about you?", zh: '我來自台灣。那你呢？', next: 'n3' },
          { en: "I'm from Taiwan.", zh: '我來自台灣。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: "Taiwan, that's wonderful. So what do you do there?",
        theyZh: '台灣，太好了。那你在那裡做什麼工作？',
        choices: [
          { en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。', next: 'n4' },
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n3b' },
        ],
      },
      {
        id: 'n3b',
        theyEn: 'Sure. What... do you do... for work?',
        theyZh: '當然。你……做什麼……工作？',
        choices: [
          { en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: "Oh, that's a great field. Is this trip for work too?",
        theyZh: '喔，那是很棒的領域。這趟也是為了工作嗎？',
        choices: [
          { en: 'No, just for fun. I enjoy traveling and meeting new people.', zh: '不是，純粹來玩的。我喜歡旅行和認識新朋友。', next: null },
          { en: 'No, just for fun.', zh: '不是，純粹來玩的。', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒說出你完整的自我介紹：名字、從哪裡來、做什麼工作、喜歡什麼、為什麼想學英文。這段之後每天都用得到。',
    hints: [
      "Hi, I'm Queeni. I'm from Taiwan.",
      'I work in the medical device industry.',
      'I enjoy traveling, meeting new people, and learning new things.',
      "I'm working on my English because I'd like to feel more comfortable talking to people when I travel.",
    ],
  },
  youtube: {
    label: '想多聽一點：自我介紹的自然說法',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=self%20introduction',
  },
}
