import type { Day, RoleplayChoice } from '../types'

const destinationChoices: RoleplayChoice[] = [
  { en: 'That\'s right. How long have you lived in Boston?', zh: '對。你住波士頓多久了？', next: 'n3' },
  { en: 'Yes. Is it far from here?', zh: '對。離這裡遠嗎？', next: 'n2-far' },
  { en: 'Yes. Have you been there?', zh: '對。你去過嗎？', next: 'n2-been' },
]

const firstTimeChoices: RoleplayChoice[] = [
  { en: "Yes! I've had a great time here so far.", zh: '對！到目前為止我玩得很開心。', next: 'n4' },
  { en: "Yes. I've been traveling for a month. Boston is my last stop.", zh: '對。我已經旅行一個月了，波士頓是最後一站。', next: 'n4-last' },
  { en: 'Yes. How about you? Are you from here?', zh: '對。那你呢？你是本地人嗎？', next: 'n4-local' },
]

const doneChoices: RoleplayChoice[] = [
  { en: 'I walked the Freedom Trail yesterday. It was so interesting.', zh: '我昨天走了自由之路，很有意思。', next: 'n5' },
  { en: 'I ate a lot of clam chowder!', zh: '我吃了好多蛤蜊巧達湯！', next: 'n5-food' },
  { en: 'Not much. I mostly rested at the hotel. I was tired!', zh: '沒做什麼，大多在飯店休息。我太累了！', next: 'n5' },
]

const favoriteChoices: RoleplayChoice[] = [
  { en: 'How cold does it get?', zh: '會冷到什麼程度？', next: 'n4-cold' },
  { en: 'I think the fall here is beautiful too.', zh: '我也覺得這裡的秋天很美。', next: 'n4-agree' },
  { en: 'Tough? What do you mean?', zh: '很難熬？什麼意思？', next: 'n4-tough' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you. Have a good one!', zh: '謝謝。祝你有美好的一天！', next: null },
  { en: 'Thanks for the chat! Bye!', zh: '謝謝你陪我聊天！掰掰！', next: null },
]

export const day27: Day = {
  day: 27,
  title: 'Small talk 實戰：跟司機聊一路',
  scene: '搭 Uber 的路上',
  emoji: '🚗',
  goal: '不看稿跟陌生人聊 5 分鐘：問他的生活，也分享你的旅行。',
  phrases: [
    { id: 'd27-1', en: 'How long have you lived in Boston?', zh: '你住波士頓多久了？', note: '跟當地人聊天最好用的開場。城市換掉就能一直用。' },
    { id: 'd27-2', en: "What's your favorite thing about living here?", zh: '住在這裡你最喜歡什麼？', note: '大家都很愛回答這題，話題一下就打開了。' },
    { id: 'd27-3', en: "I've had a great time here.", zh: '我在這裡玩得很開心。', note: '當地人聽到這句都會很高興。' },
    { id: 'd27-4', en: 'What do people here do for fun?', zh: '這裡的人都做什麼休閒？', note: '問出當地人才知道的好去處。' },
    { id: 'd27-5', en: 'Have a good one!', zh: '祝你有美好的一天！', note: '美國人超常用的道別，比 Have a nice day 更口語。' },
  ],
  dialogue: {
    title: '搭 Uber，司機跟你聊天',
    lines: [
      { who: 'them', en: 'Hi, are you Queeni?', zh: '嗨，你是 Queeni 嗎？' },
      { who: 'you', en: "Yes, that's me.", zh: '對，是我。' },
      { who: 'them', en: 'Great. Heading to the Museum of Fine Arts?', zh: '好的。要去美術館對吧？' },
      { who: 'you', en: "That's right. How long have you lived in Boston?", zh: '對。你住波士頓多久了？' },
      { who: 'them', en: 'About ten years. I moved here for college.', zh: '大概十年了。我是來這裡念大學的。' },
      { who: 'you', en: "What's your favorite thing about living here?", zh: '住在這裡你最喜歡什麼？' },
      { who: 'them', en: 'The fall. The colors are amazing. But the winters are tough!', zh: '秋天。顏色超美的。但冬天很難熬！' },
      { who: 'you', en: "I've had a great time here so far.", zh: '到目前為止我在這裡玩得很開心。' },
      { who: 'them', en: 'Glad to hear it. Here we are!', zh: '很高興聽你這麼說。到了！' },
      { who: 'you', en: 'Thank you. Have a good one!', zh: '謝謝。祝你有美好的一天！' },
    ],
  },
  quiz: [
    {
      q: '司機住在波士頓多久了？',
      options: ['兩年', '五年', '十年'],
      answer: 2,
    },
    {
      q: '司機最喜歡哪個季節？',
      options: ['春天', '秋天', '冬天'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '最後一週的閒聊挑戰：你搭 Uber 去美術館，司機很健談。車程 20 分鐘，把話聊下去——試著都不看中文。',
    start: 'n1',
    outro: '你跟司機聊了一整趟車：問他的生活、說你的旅行、聊天氣和城市。不看稿也能聊下去，這就是真正的 small talk。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi! Are you Queeni?',
        theyZh: '嗨！你是 Queeni 嗎？',
        choices: [
          { en: "Yes, that's me!", zh: '對，是我！', next: 'n2' },
          { en: 'Yes. Are you Mike?', zh: '對。你是 Mike 嗎？', next: 'n2-mike' },
          { en: 'Yes. Could you open the trunk, please?', zh: '對。可以幫我開後車廂嗎？', next: 'n2-trunk' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Great. Heading to the Museum of Fine Arts?',
        theyZh: '好的。要去美術館對吧？',
        choices: destinationChoices,
      },
      {
        id: 'n2-mike',
        theyEn: "That's me! Hop in. Heading to the Museum of Fine Arts?",
        theyZh: '就是我！上車吧。要去美術館對吧？',
        choices: destinationChoices,
      },
      {
        id: 'n2-trunk',
        theyEn: 'Sure thing! ...Okay, all set. Heading to the Museum of Fine Arts?',
        theyZh: '沒問題！……好了。要去美術館對吧？',
        choices: destinationChoices,
      },
      {
        id: 'n2-far',
        theyEn: 'About twenty minutes, with traffic. Is this your first time in Boston?',
        theyZh: '大概二十分鐘，要看交通。這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n2-been',
        theyEn: 'Many times! The Egyptian section is great. Is this your first time in Boston?',
        theyZh: '去過好多次！埃及展區很棒。這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3',
        theyEn: 'Not originally. I moved here about ten years ago, for college.',
        theyZh: '我不是本地人。大概十年前搬來這裡念大學。',
        choices: [
          { en: 'Oh, really? Which college?', zh: '喔，真的嗎？哪間大學？', next: 'n3-college' },
          { en: "That's a long time! What's your favorite thing about living here?", zh: '好久了！住在這裡你最喜歡什麼？', next: 'n4-favorite' },
          { en: 'Do you like it here?', zh: '你喜歡這裡嗎？', next: 'n4-favorite' },
        ],
      },
      {
        id: 'n3-college',
        theyEn: 'Boston University. I studied music. Now I drive, and I play guitar on weekends!',
        theyZh: '波士頓大學，我念音樂。現在我開車，週末彈吉他！',
        choices: [
          { en: "That's so cool! What kind of music?", zh: '好酷！什麼樣的音樂？', next: 'n3-music' },
          { en: "You play guitar? I'd love to hear you someday.", zh: '你會彈吉他？有一天很想聽你彈。', next: 'n3-music2' },
        ],
      },
      {
        id: 'n3-music',
        theyEn: 'Mostly jazz. So, is this your first time in Boston?',
        theyZh: '大多是爵士。那這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n3-music2',
        theyEn: 'Ha, thanks! So, is this your first time in Boston?',
        theyZh: '哈，謝啦！那這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n4-favorite',
        theyEn: 'The fall. The colors are amazing. But the winters are tough!',
        theyZh: '秋天，顏色超美的。但冬天很難熬！',
        choices: favoriteChoices,
      },
      {
        id: 'n4-cold',
        theyEn: 'Sometimes minus fifteen, with lots of snow! Is this your first time in Boston?',
        theyZh: '有時候零下十五度，還有好多雪！這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n4-agree',
        theyEn: 'Right? Is this your first time in Boston?',
        theyZh: '對吧？這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n4-tough',
        theyEn: 'Very cold, with lots of snow. Is this your first time in Boston?',
        theyZh: '超冷，還有很多雪。這是你第一次來波士頓嗎？',
        choices: firstTimeChoices,
      },
      {
        id: 'n4',
        theyEn: 'Glad to hear it! What have you done so far?',
        theyZh: '很高興聽你這麼說！你到目前為止做了什麼？',
        choices: doneChoices,
      },
      {
        id: 'n4-local',
        theyEn: "Not originally. I moved here about ten years ago, for college. So, what have you done in Boston so far?",
        theyZh: '我不是本地人，大概十年前搬來念大學。那你在波士頓做了些什麼？',
        choices: doneChoices,
      },
      {
        id: 'n4-last',
        theyEn: "Wow, a month! Saving the best for last, huh? What's been your favorite city?",
        theyZh: '哇，一個月！把最好的留到最後，對吧？你最喜歡哪個城市？',
        choices: [
          { en: 'New York! It was so exciting.', zh: '紐約！超刺激的。', next: 'n6-ny' },
          { en: 'Los Angeles. I loved the weather.', zh: '洛杉磯，我很愛那裡的天氣。', next: 'n6-la' },
          { en: "Maybe Boston! It's so beautiful.", zh: '可能是波士頓！好美。', next: 'n6-boston' },
        ],
      },
      {
        id: 'n5',
        theyEn: "Nice! What's next on your list?",
        theyZh: '不錯！接下來打算做什麼？',
        choices: [
          { en: "I'm not sure. What do people here do for fun?", zh: '還不確定。這裡的人都做什麼休閒？', next: 'n6-fun' },
          { en: 'Maybe shopping. Any recommendations?', zh: '可能去逛街。有推薦的地方嗎？', next: 'n6-shop' },
          { en: 'Just the museum today. I fly home tomorrow.', zh: '今天就去美術館。我明天就飛回家了。', next: 'n6-home' },
        ],
      },
      {
        id: 'n5-food',
        theyEn: 'Ha! Did you have a lobster roll too?',
        theyZh: '哈！你也吃了龍蝦堡嗎？',
        choices: [
          { en: 'Yes! It was expensive, but worth it.', zh: '吃了！很貴，但很值得。', next: 'n5' },
          { en: 'Not yet. Where should I get one?', zh: '還沒。該去哪裡吃？', next: 'n6-lobster' },
        ],
      },
      {
        id: 'n6-lobster',
        theyEn: 'Try the place near the harbor. Ask for extra butter! Oh — here we are.',
        theyZh: '去港口附近那家，記得多要一點奶油！喔——到了。',
        choices: endChoices,
      },
      {
        id: 'n6-fun',
        theyEn: 'Watch a Red Sox game! Baseball is huge here. Oh — here we are.',
        theyZh: '去看紅襪隊的比賽！棒球在這裡超熱門。喔——到了。',
        choices: endChoices,
      },
      {
        id: 'n6-shop',
        theyEn: 'Newbury Street. Lots of nice shops there. Oh — here we are.',
        theyZh: 'Newbury Street，那裡有很多好逛的店。喔——到了。',
        choices: endChoices,
      },
      {
        id: 'n6-home',
        theyEn: 'Oh, that\'s soon! I hope you had a great trip. Here we are.',
        theyZh: '喔，好快！希望你這趟玩得很開心。到了。',
        choices: endChoices,
      },
      {
        id: 'n6-ny',
        theyEn: "Can't argue with that! Well, here we are.",
        theyZh: '這我沒辦法反駁！好，到了。',
        choices: endChoices,
      },
      {
        id: 'n6-la',
        theyEn: "The weather there is the best! Well, here we are.",
        theyZh: '那裡的天氣真的最好！好，到了。',
        choices: endChoices,
      },
      {
        id: 'n6-boston',
        theyEn: 'Ha! Good answer! Well, here we are.',
        theyZh: '哈！好答案！好，到了。',
        choices: endChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '不看提示挑戰：用 1 分鐘，假裝跟司機聊天——問他兩個問題，再說說你這趟旅行最喜歡的事。',
    hints: ['How long have you lived in ___?', "What's your favorite thing about ___?", "I've had a great time here."],
  },
  youtube: {
    label: '想多聽一點：跟陌生人閒聊',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=small%20talk',
  },
}
