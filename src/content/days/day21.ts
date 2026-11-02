import type { Day, RoleplayChoice } from '../types'

const howKnowChoices: RoleplayChoice[] = [
  { en: 'We met on a walking tour last week!', zh: '我們上禮拜在徒步導覽認識的！', next: 'n3-tour' },
  { en: 'Actually, I just met her tonight. My friend brought me.', zh: '其實我今晚才認識她，是朋友帶我來的。', next: 'n3-new' },
  { en: "She's a friend of a friend.", zh: '她是我朋友的朋友。', next: 'n3-new' },
]

const jobChoices: RoleplayChoice[] = [
  { en: 'I work in the medical device industry. How about you?', zh: '我在醫療器材產業工作。你呢？', next: 'n4' },
  { en: "I work in healthcare. It's busy, but I like it. What do you do?", zh: '我在醫療相關的領域工作。很忙，但我喜歡。你做什麼？', next: 'n4' },
  { en: "It's a little hard to explain. Can I ask what you do first?", zh: '有點難解釋。我可以先問你做什麼嗎？', next: 'n4-first' },
]

const photoChoices: RoleplayChoice[] = [
  { en: "Oh, really? That's interesting. Tell me more.", zh: '喔，真的嗎？很有意思。多說一點。', next: 'n5' },
  { en: 'That sounds like a dream job! Where do you usually go?', zh: '聽起來是夢幻工作！你通常去哪裡？', next: 'n5-where' },
  { en: 'Wow. Have you ever been to Taiwan?', zh: '哇。你去過台灣嗎？', next: 'n5-tw' },
]

const japanChoices: RoleplayChoice[] = [
  { en: "Japan! Sorry, what's the word... the big market with lots of fish?", zh: '日本！不好意思，那個字是……有很多魚的大市場？', next: 'n6-market' },
  { en: 'I love Japan! Did you try the ramen?', zh: '我很愛日本！你有吃拉麵嗎？', next: 'n6-ramen' },
  { en: 'How was it? I think Japan is beautiful in the fall.', zh: '好玩嗎？我覺得日本的秋天很美。', next: 'n6-fall' },
]

const cityChoices: RoleplayChoice[] = [
  { en: "I think it's amazing, but very expensive!", zh: '我覺得很棒，但東西好貴！', next: 'n8' },
  { en: 'I love it. In my opinion, Central Park is the best part.', zh: '很喜歡。我覺得中央公園是最棒的地方。', next: 'n8' },
  { en: "It's exciting, but a little too loud for me.", zh: '很刺激，但對我來說有點太吵。', next: 'n8' },
]

export const day21: Day = {
  day: 21,
  title: '第三週驗收：派對上的長聊天',
  scene: '紐約的屋頂派對',
  emoji: '🥂',
  goal: '跟剛認識的人聊 5 分鐘：工作、旅行、食物、城市，最後交換聯絡方式。',
  phrases: [
    { id: 'd21-1', en: "That's interesting. Tell me more.", zh: '很有意思，多說一點。', note: '最輕鬆的延長話題法：讓對方多說，你多聽。' },
    { id: 'd21-2', en: 'Oh, really? Why?', zh: '喔，真的嗎？為什麼？', note: '短短三個字，對方就會開始解釋，對話就延長了。' },
    { id: 'd21-3', en: "Sorry, what's the word... It's like a big market.", zh: '不好意思，那個字是……就像一個大市場。', note: '想不起單字時，用描述的。對方通常會幫你說出那個字。' },
    { id: 'd21-4', en: 'Can I ask you something?', zh: '我可以問你一件事嗎？', note: '想換話題或問問題前，先說這句很有禮貌。' },
    { id: 'd21-5', en: "Let's keep in touch!", zh: '保持聯絡吧！', note: '聊得開心想交朋友時說。接著可以問 What\'s your Instagram?' },
  ],
  dialogue: {
    title: '派對上，認識了一位攝影師',
    lines: [
      { who: 'them', en: "Hi, I'm Jess. I'm a photographer.", zh: '嗨，我是 Jess，我是攝影師。' },
      { who: 'you', en: "Oh, really? That's interesting. Tell me more.", zh: '喔，真的嗎？很有意思，多說一點。' },
      { who: 'them', en: 'I take photos for travel magazines. I just got back from Japan.', zh: '我幫旅遊雜誌拍照。我剛從日本回來。' },
      { who: 'you', en: "Japan! Sorry, what's the word... the big market with lots of fish?", zh: '日本！不好意思，那個字是……有很多魚的大市場？' },
      { who: 'them', en: 'Oh, the fish market? Yes, I went there!', zh: '喔，魚市場嗎？對，我有去！' },
      { who: 'you', en: 'How was it?', zh: '好玩嗎？' },
      { who: 'them', en: 'It was amazing. I took so many photos.', zh: '超棒的，我拍了好多照片。' },
      { who: 'you', en: "I'd love to see them. Let's keep in touch!", zh: '我很想看看。保持聯絡吧！' },
    ],
  },
  quiz: [
    {
      q: 'Jess 是做什麼工作的？',
      options: ['記者', '攝影師', '廚師'],
      answer: 1,
    },
    {
      q: 'Jess 剛從哪裡回來？',
      options: ['日本', '台灣', '韓國'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '第三週的驗收：紐約的屋頂派對，你認識了朋友的朋友。這次的對話比較長，盡量不看中文，用「回答＋補充＋反問」聊下去。',
    start: 'n1',
    outro: '第三週完成！你在派對上跟陌生人聊了工作、旅行、食物和城市，還交換了聯絡方式。這已經是真正的 small talk 了。紐約的章蓋好了。',
    nodes: [
      {
        id: 'n1',
        theyEn: "Hi! I don't think we've met. I'm Jess.",
        theyZh: '嗨！我們好像還沒見過。我是 Jess。',
        choices: [
          { en: "Hi Jess, I'm Queeni. How do you know Lisa?", zh: '嗨 Jess，我是 Queeni。你怎麼認識 Lisa 的？', next: 'n2-ask' },
          { en: "Nice to meet you! I'm Queeni. I'm visiting from Taiwan.", zh: '很高興認識你！我是 Queeni，從台灣來玩的。', next: 'n2-tw' },
          { en: "Hi! I'm Queeni. This is a great party, isn't it?", zh: '嗨！我是 Queeni。這個派對很棒，對吧？', next: 'n2-party' },
        ],
      },
      {
        id: 'n2-ask',
        theyEn: 'We work together! How about you? How do you know her?',
        theyZh: '我們是同事！你呢？你怎麼認識她的？',
        choices: howKnowChoices,
      },
      {
        id: 'n2-tw',
        theyEn: 'Oh, wow! So how do you know Lisa?',
        theyZh: '喔，哇！那你怎麼認識 Lisa 的？',
        choices: howKnowChoices,
      },
      {
        id: 'n2-party',
        theyEn: 'It is! The view is amazing. How do you know Lisa?',
        theyZh: '對啊！景色超棒。你怎麼認識 Lisa 的？',
        choices: howKnowChoices,
      },
      {
        id: 'n3-tour',
        theyEn: "That's so fun! So, what do you do back home?",
        theyZh: '好好玩！那你在家鄉是做什麼的？',
        choices: jobChoices,
      },
      {
        id: 'n3-new',
        theyEn: 'Oh, nice! Welcome! So, what do you do back home?',
        theyZh: '喔，不錯！歡迎！那你在家鄉是做什麼的？',
        choices: jobChoices,
      },
      {
        id: 'n4',
        theyEn: "I'm a photographer. I take photos for travel magazines.",
        theyZh: '我是攝影師，幫旅遊雜誌拍照。',
        choices: photoChoices,
      },
      {
        id: 'n4-first',
        theyEn: "Ha, sure! I'm a photographer. I take photos for travel magazines.",
        theyZh: '哈，好啊！我是攝影師，幫旅遊雜誌拍照。',
        choices: photoChoices,
      },
      {
        id: 'n5',
        theyEn: 'I travel a lot for work. I just got back from Japan.',
        theyZh: '我常常因為工作出國。我剛從日本回來。',
        choices: japanChoices,
      },
      {
        id: 'n5-where',
        theyEn: 'All over Asia, mostly. I just got back from Japan.',
        theyZh: '大多是亞洲各地。我剛從日本回來。',
        choices: japanChoices,
      },
      {
        id: 'n5-tw',
        theyEn: "Not yet, but it's on my list! I just got back from Japan.",
        theyZh: '還沒，但在我的清單上！我剛從日本回來。',
        choices: japanChoices,
      },
      {
        id: 'n6-market',
        theyEn: 'Oh, the fish market? Yes, I went! It was amazing. So, how do you like New York so far?',
        theyZh: '喔，魚市場嗎？有，我有去！超棒的。那你覺得紐約怎麼樣？',
        choices: cityChoices,
      },
      {
        id: 'n6-ramen',
        theyEn: 'Every single day! What about Taiwanese food? What should I try?',
        theyZh: '每天都吃！那台灣菜呢？我該吃什麼？',
        choices: [
          { en: "You should try beef noodle soup. It's a little like ramen.", zh: '你應該試試牛肉麵，有點像拉麵。', next: 'n7' },
          { en: "Bubble tea! It's from Taiwan.", zh: '珍珠奶茶！它是台灣來的。', next: 'n7' },
        ],
      },
      {
        id: 'n6-fall',
        theyEn: 'It was perfect. The leaves were red and orange everywhere. So, how do you like New York so far?',
        theyZh: '完美。到處都是紅色和橘色的葉子。那你覺得紐約怎麼樣？',
        choices: cityChoices,
      },
      {
        id: 'n7',
        theyEn: "I'll remember that! So, how do you like New York so far?",
        theyZh: '我記住了！那你覺得紐約怎麼樣？',
        choices: cityChoices,
      },
      {
        id: 'n8',
        theyEn: 'Ha, I know what you mean. Hey, it was really nice talking to you.',
        theyZh: '哈，我懂你的意思。嘿，跟你聊天真的很開心。',
        choices: [
          { en: "You too! Let's keep in touch!", zh: '我也是！保持聯絡吧！', next: 'n9' },
          { en: 'It was nice talking to you too. Enjoy the party!', zh: '我也很高興跟你聊天。派對玩得開心！', next: null },
          { en: 'Can I ask you something? Where is a good place to take photos?', zh: '我可以問你一件事嗎？哪裡拍照好看？', next: 'n9-spot' },
        ],
      },
      {
        id: 'n9',
        theyEn: "Definitely! What's your Instagram?",
        theyZh: '當然！你的 Instagram 是什麼？',
        choices: [
          { en: "Here, I'll show you. It's on my phone.", zh: '來，我給你看，在我手機上。', next: null },
          { en: 'Let me write it down for you.', zh: '我寫下來給你。', next: null },
        ],
      },
      {
        id: 'n9-spot',
        theyEn: 'The Brooklyn Bridge at sunrise. Trust me!',
        theyZh: '日出時的布魯克林大橋，相信我！',
        choices: [
          { en: "Thank you! Let's keep in touch!", zh: '謝謝！保持聯絡吧！', next: 'n9' },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '第三週最終挑戰：用 1 分鐘，假裝在派對上認識新朋友：自我介紹、聊工作或興趣、反問兩個問題，最後說保持聯絡。',
    hints: ["Hi, I'm ___. I'm visiting from Taiwan.", "Oh, really? That's interesting. Tell me more.", "Let's keep in touch!"],
  },
  youtube: {
    label: '想多聽一點：自然的長對話',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=conversation',
  },
}
