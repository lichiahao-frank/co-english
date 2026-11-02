import type { Day, RoleplayChoice } from '../types'

const whereChoices: RoleplayChoice[] = [
  { en: 'San Francisco, Los Angeles, New York, and Boston.', zh: '舊金山、洛杉磯、紐約和波士頓。', next: 'n4' },
  { en: 'Four cities! I started in San Francisco and ended in Boston.', zh: '四個城市！從舊金山開始，在波士頓結束。', next: 'n4' },
]

const favoriteChoices: RoleplayChoice[] = [
  { en: "New York. In my opinion, it's the most exciting city.", zh: '紐約。我覺得它是最刺激的城市。', next: 'n5-ny' },
  { en: "Boston. It's so beautiful in the fall.", zh: '波士頓。秋天好美。', next: 'n5-boston' },
  { en: 'Los Angeles. I loved the weather and the tacos!', zh: '洛杉磯。我很愛那裡的天氣和塔可！', next: 'n5-la' },
]

const problemCore: RoleplayChoice[] = [
  { en: 'Yes! I missed a connecting flight, but I solved it myself.', zh: '有！我錯過一班轉機，但我自己處理好了。', next: 'n6-flight' },
  { en: "Once, the hotel couldn't find my reservation. It was okay in the end.", zh: '有一次飯店找不到我的訂房，最後還是解決了。', next: 'n6-hotel' },
  { en: 'Not really. Everyone was so kind.', zh: '沒有耶。大家都好友善。', next: 'n6-kind' },
]

const problemChoices: RoleplayChoice[] = [
  ...problemCore,
  { en: 'Sorry, what does "difficult" mean?', zh: '不好意思，difficult 是什麼意思？', next: 'n5-mean' },
]

const englishChoices: RoleplayChoice[] = [
  { en: 'Thank you! My English got better every day.', zh: '謝謝！我的英文每天都進步一點。', next: 'n7' },
  { en: 'Really? Thank you! I practiced every day for thirty days.', zh: '真的嗎？謝謝！我連續三十天每天練習。', next: 'n7' },
  { en: "Thank you. I'm still nervous sometimes, but I'm not afraid anymore.", zh: '謝謝。我有時候還是會緊張，但已經不害怕了。', next: 'n7' },
]

const goodbyeChoices: RoleplayChoice[] = [
  { en: "Let's keep in touch! Thank you for chatting with me.", zh: '保持聯絡吧！謝謝你陪我聊天。', next: null },
  { en: "It's a deal!", zh: '一言為定！', next: null },
]

export const day30: Day = {
  day: 30,
  title: '最終測驗：回家的飛機上',
  scene: '飛回台灣的飛機上',
  emoji: '🏆',
  goal: '用這 30 天學到的一切，跟老朋友聊完一整段：旅行、意見、遇到的問題、下次的約定。',
  phrases: [
    { id: 'd30-1', en: 'I just finished my trip to the U.S.', zh: '我剛結束美國的旅行。', note: 'just 在這裡是「剛剛」。' },
    { id: 'd30-2', en: 'The best part was meeting people.', zh: '最棒的部分是認識了很多人。', note: 'The best part was ___ 可以總結任何經驗。' },
    { id: 'd30-3', en: 'My English got better every day.', zh: '我的英文每天都進步一點。', note: 'got better 是「變好了」。這句是說給你自己聽的。' },
    { id: 'd30-4', en: "I can't wait to come back.", zh: '我等不及要再來了。', note: "I can't wait to ___ 表示非常期待。" },
    { id: 'd30-5', en: 'Thank you for chatting with me.', zh: '謝謝你陪我聊天。', note: '結束一段愉快的聊天時，比 Bye 溫暖很多。' },
  ],
  dialogue: {
    title: '回程的飛機上，遇到老朋友',
    lines: [
      { who: 'them', en: 'Wait — Queeni? We met on the plane last month!', zh: '等等——Queeni？我們上個月在飛機上認識的！' },
      { who: 'you', en: 'Dana! What a surprise!', zh: 'Dana！太巧了吧！' },
      { who: 'them', en: 'So, how was your trip?', zh: '那你的旅行怎麼樣？' },
      { who: 'you', en: 'It was amazing. The best part was meeting people.', zh: '超棒的。最棒的部分是認識了很多人。' },
      { who: 'them', en: 'Your English sounds so much better!', zh: '你的英文聽起來進步好多！' },
      { who: 'you', en: 'Thank you! My English got better every day.', zh: '謝謝！我的英文每天都進步一點。' },
      { who: 'them', en: 'Will you come back?', zh: '你還會再來嗎？' },
      { who: 'you', en: "Definitely. I can't wait to come back.", zh: '一定會。我等不及要再來了。' },
    ],
  },
  quiz: [
    {
      q: '這次在飛機上遇到誰？',
      options: ['一位新的乘客', 'Day 1 認識的 Dana', '空服員'],
      answer: 1,
    },
    {
      q: '你說這趟旅行最棒的是什麼？',
      options: ['食物', '風景', '認識了很多人'],
      answer: 2,
    },
  ],
  roleplay: {
    intro: '最終測驗！你坐上回台灣的飛機，隔壁竟然是第一天在飛機上認識的 Dana。用這 30 天學到的一切跟她聊——自我介紹、旅行、意見、應變，全部都會用到。',
    start: 'n1',
    outro: '30 天完成了！第一天你在飛機上緊張地自我介紹；今天在同一個場景，你聊了旅行、意見、遇到的問題，還約好下次見面。你做到了。波士頓的章蓋好了，整本護照集滿了！',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Excuse me, is this seat 32B? ...Wait. Queeni? Is that you?',
        theyZh: '不好意思，這是 32B 嗎？……等等。Queeni？是你嗎？',
        choices: [
          { en: 'Dana! What a surprise!', zh: 'Dana！太巧了吧！', next: 'n2' },
          { en: 'Sorry, do I know you?', zh: '不好意思，我們認識嗎？', next: 'n1-who' },
          { en: 'Yes! Dana, right? How are you?', zh: '是我！你是 Dana 對吧？你好嗎？', next: 'n2' },
        ],
      },
      {
        id: 'n1-who',
        theyEn: "It's Dana! We sat together on your flight to the U.S.!",
        theyZh: '我是 Dana！你飛來美國那班，我們坐在一起！',
        choices: [
          { en: 'Oh, Dana! Of course! How are you?', zh: '喔，Dana！當然記得！你好嗎？', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: "I'm great! So, how was your trip?",
        theyZh: '我很好！那你的旅行怎麼樣？',
        choices: [
          { en: 'It was amazing. The best part was meeting people.', zh: '超棒的。最棒的部分是認識了很多人。', next: 'n3-people' },
          { en: 'It was wonderful, but so tiring! My feet hurt.', zh: '很精采，但好累！我的腳好痠。', next: 'n3-tired' },
          { en: 'Great! I went to four cities. Can you guess my favorite?', zh: '很棒！我去了四個城市。你猜我最喜歡哪個？', next: 'n3-guess' },
        ],
      },
      {
        id: 'n3-people',
        theyEn: "That's the best part of traveling, isn't it? Where did you go?",
        theyZh: '那就是旅行最棒的地方，對吧？你去了哪裡？',
        choices: whereChoices,
      },
      {
        id: 'n3-tired',
        theyEn: 'Ha! That means you did a lot. Where did you go?',
        theyZh: '哈！代表你玩了很多地方。你去了哪裡？',
        choices: whereChoices,
      },
      {
        id: 'n3-guess',
        theyEn: 'Hmm... New York?',
        theyZh: '嗯……紐約？',
        choices: [
          { en: 'Yes! New York was so exciting.', zh: '答對了！紐約超刺激的。', next: 'n5-ny' },
          { en: 'Close! I loved New York, but Boston was my favorite.', zh: '很接近！我很愛紐約，但最喜歡波士頓。', next: 'n5-boston' },
          { en: 'No! It was Los Angeles. I loved the weather.', zh: '不是！是洛杉磯。我很愛那裡的天氣。', next: 'n5-la' },
        ],
      },
      {
        id: 'n4',
        theyEn: "Wow, that's a lot! Which was your favorite?",
        theyZh: '哇，好多地方！你最喜歡哪一個？',
        choices: favoriteChoices,
      },
      {
        id: 'n5-ny',
        theyEn: 'I feel the same way! Did anything difficult happen on your trip?',
        theyZh: '我也有同感！旅行中有遇到什麼困難嗎？',
        choices: problemChoices,
      },
      {
        id: 'n5-boston',
        theyEn: 'Good choice! Did anything difficult happen on your trip?',
        theyZh: '選得好！旅行中有遇到什麼困難嗎？',
        choices: problemChoices,
      },
      {
        id: 'n5-la',
        theyEn: 'Tacos and sunshine, nice! Did anything difficult happen on your trip?',
        theyZh: '塔可配陽光，真不錯！旅行中有遇到什麼困難嗎？',
        choices: problemChoices,
      },
      {
        id: 'n5-mean',
        theyEn: 'Difficult means hard. Did you have any problems?',
        theyZh: 'Difficult 就是「困難」。你有遇到什麼問題嗎？',
        choices: problemCore,
      },
      {
        id: 'n6-flight',
        theyEn: "Wow, all in English? That's impressive! Your English sounds so much better than last month.",
        theyZh: '哇，全部用英文？好厲害！你的英文聽起來比上個月進步好多。',
        choices: englishChoices,
      },
      {
        id: 'n6-hotel',
        theyEn: 'That sounds stressful. Good for you for handling it! Your English sounds so much better than last month.',
        theyZh: '聽起來壓力好大，你處理得真好！你的英文聽起來比上個月進步好多。',
        choices: englishChoices,
      },
      {
        id: 'n6-kind',
        theyEn: "That's so nice to hear. And your English sounds so much better than last month!",
        theyZh: '聽了真開心。而且你的英文聽起來比上個月進步好多！',
        choices: englishChoices,
      },
      {
        id: 'n7',
        theyEn: "That's amazing. So, will you come back to the U.S.?",
        theyZh: '太厲害了。那你還會再來美國嗎？',
        choices: [
          { en: "Definitely. I can't wait to come back.", zh: '一定會。我等不及要再來了。', next: 'n8' },
          { en: 'Yes! Next time, I want to see Seattle.', zh: '會！下次我想去西雅圖。', next: 'n8-seattle' },
          { en: 'Maybe. But first, I want you to visit Taiwan!', zh: '也許吧。不過我想先請你來台灣玩！', next: 'n8-taiwan' },
        ],
      },
      {
        id: 'n8',
        theyEn: 'Next time, come visit me in Seattle!',
        theyZh: '下次來西雅圖找我玩！',
        choices: goodbyeChoices,
      },
      {
        id: 'n8-seattle',
        theyEn: "That's where I live! Come visit me!",
        theyZh: '我就住在那裡！來找我玩！',
        choices: goodbyeChoices,
      },
      {
        id: 'n8-taiwan',
        theyEn: "I'd love that! You can show me the night markets!",
        theyZh: '我很想去！你可以帶我去逛夜市！',
        choices: goodbyeChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '最終挑戰：用 1–2 分鐘、不看提示，從自我介紹開始，說說這 30 天你學到了什麼、最喜歡哪一天，以及接下來想用英文做什麼。錄下來，留給自己當紀念。',
    hints: ["Hi, I'm Queeni. I'm from Taiwan.", 'The best part was ___.', 'Next, I want to ___.'],
  },
  youtube: {
    label: '想多聽一點：繼續練下去',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=conversation',
  },
}
