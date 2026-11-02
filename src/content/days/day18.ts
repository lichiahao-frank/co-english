import type { Day, RoleplayChoice } from '../types'

const petChoices: RoleplayChoice[] = [
  { en: 'Yes! I have a pet rabbit at home in Taiwan.', zh: '有！我在台灣家裡養了一隻兔子。', next: 'n3-rabbit' },
  { en: "No, but I'd love a dog someday.", zh: '沒有，但我有一天很想養狗。', next: 'n3-no' },
  { en: 'Not now, but I had a cat when I was a kid.', zh: '現在沒有，但我小時候養過貓。', next: 'n3-cat' },
]

const hobbyChoices: RoleplayChoice[] = [
  { en: 'I like yoga. It helps me relax.', zh: '我喜歡瑜伽，可以幫我放鬆。', next: 'n5-yoga' },
  { en: "I'm not really into sports. I like reading and watching dramas.", zh: '我不太喜歡運動。我喜歡看書和追劇。', next: 'n5-read' },
  { en: "I love traveling. That's why I'm here! How about you?", zh: '我很愛旅行，所以我才在這裡！你呢？', next: 'n6' },
]

const askBack: RoleplayChoice[] = [
  { en: 'About twice a week. How about you? What do you do for fun?', zh: '大概一週兩次。你呢？你都做什麼休閒？', next: 'n6' },
  { en: 'Not as often as I want! How about you?', zh: '沒有我想要的那麼常！你呢？', next: 'n6' },
]

export const day18: Day = {
  day: 18,
  title: '興趣與休閒',
  scene: '紐約的公園長椅',
  emoji: '🐰',
  goal: '聊寵物、運動和休閒；說自己喜歡什麼，也問對方多久做一次。',
  phrases: [
    { id: 'd18-1', en: 'Do you have any pets?', zh: '你有養寵物嗎？', note: '遇到帶狗的人，這是最好開口的話題。' },
    { id: 'd18-2', en: 'I have a pet rabbit at home.', zh: '我家裡養了一隻兔子。', note: '小Co 的原型就是你家的兔子！外國人通常會覺得兔子很可愛，很好聊。' },
    { id: 'd18-3', en: 'What do you like to do in your free time?', zh: '你空閒的時候喜歡做什麼？', note: '問興趣最標準的一句。' },
    { id: 'd18-4', en: "I'm not really into sports.", zh: '我不太喜歡運動。', note: '說「不太喜歡」的委婉說法。喜歡的話就說 I\'m really into ___。' },
    { id: 'd18-5', en: 'How often do you go?', zh: '你多久去一次？', note: '對方說了一個興趣，用這句接下去，話題就延長了。' },
  ],
  dialogue: {
    title: '公園長椅上，旁邊的人帶著狗',
    lines: [
      { who: 'them', en: "Isn't he cute? Do you have any pets?", zh: '他很可愛吧？你有養寵物嗎？' },
      { who: 'you', en: 'Yes! I have a pet rabbit at home in Taiwan.', zh: '有！我在台灣家裡養了一隻兔子。' },
      { who: 'them', en: "A rabbit? That's so cute! Is it friendly?", zh: '兔子？好可愛！牠親人嗎？' },
      { who: 'you', en: 'Very friendly. It loves carrots.', zh: '很親人，超愛吃紅蘿蔔。' },
      { who: 'them', en: 'Ha! So, what do you like to do in your free time?', zh: '哈！那你空閒的時候喜歡做什麼？' },
      { who: 'you', en: 'I like yoga. How about you?', zh: '我喜歡瑜伽。你呢？' },
      { who: 'them', en: 'I play tennis.', zh: '我打網球。' },
      { who: 'you', en: 'How often do you go?', zh: '你多久去一次？' },
      { who: 'them', en: 'Twice a week, if I can.', zh: '可以的話，一週兩次。' },
    ],
  },
  quiz: [
    {
      q: '你家養了什麼寵物？',
      options: ['狗', '貓', '兔子'],
      answer: 2,
    },
    {
      q: '對方多久打一次網球？',
      options: ['一週一次', '一週兩次', '每天'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在紐約的公園長椅休息，旁邊的人帶著狗坐下來。從寵物聊到興趣，記得把問題丟回去。',
    start: 'n1',
    outro: '你從寵物聊到興趣，還把問題丟了回去。聊興趣是最容易交到朋友的話題，你已經會了。',
    nodes: [
      {
        id: 'n1',
        theyEn: "Sorry, is it okay if my dog sits here? He's very friendly.",
        theyZh: '不好意思，我的狗可以坐這裡嗎？他很友善的。',
        choices: [
          { en: "Of course! He's so cute. What's his name?", zh: '當然！他好可愛。他叫什麼名字？', next: 'n2-name' },
          { en: 'Sure, no problem. I love dogs.', zh: '可以，沒問題。我很喜歡狗。', next: 'n2' },
          { en: 'Sure. Can I pet him?', zh: '可以。我可以摸摸他嗎？', next: 'n2-pet' },
        ],
      },
      {
        id: 'n2-name',
        theyEn: 'His name is Max. Do you have any pets?',
        theyZh: '他叫 Max。你有養寵物嗎？',
        choices: petChoices,
      },
      {
        id: 'n2',
        theyEn: 'Oh, good! Do you have any pets?',
        theyZh: '喔，太好了！你有養寵物嗎？',
        choices: petChoices,
      },
      {
        id: 'n2-pet',
        theyEn: 'Of course, he loves it! Do you have any pets?',
        theyZh: '當然，他超喜歡！你有養寵物嗎？',
        choices: petChoices,
      },
      {
        id: 'n3-rabbit',
        theyEn: "A rabbit? How cute! What's it like?",
        theyZh: '兔子？好可愛！牠是什麼個性？',
        choices: [
          { en: "It's very friendly. It loves carrots!", zh: '很親人，超愛吃紅蘿蔔！', next: 'n4' },
          { en: "It's shy, but it's very smart.", zh: '牠很害羞，但很聰明。', next: 'n4' },
          { en: 'Let me show you a picture!', zh: '我給你看照片！', next: 'n3-photo' },
        ],
      },
      {
        id: 'n3-photo',
        theyEn: 'Oh my gosh, look at those ears! So cute.',
        theyZh: '天啊，你看那對耳朵！好可愛。',
        choices: [
          { en: 'Thank you! I miss it so much.', zh: '謝謝！我好想牠。', next: 'n4' },
        ],
      },
      {
        id: 'n3-no',
        theyEn: "You should! They're great company.",
        theyZh: '你該養的！牠們是很棒的陪伴。',
        choices: [
          { en: 'Maybe someday!', zh: '也許有一天吧！', next: 'n4' },
        ],
      },
      {
        id: 'n3-cat',
        theyEn: 'Cats are great too.',
        theyZh: '貓也很棒。',
        choices: [
          { en: 'Yes, I loved her so much.', zh: '對，我超愛她的。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'So, what do you like to do in your free time?',
        theyZh: '那你空閒的時候喜歡做什麼？',
        choices: hobbyChoices,
      },
      {
        id: 'n5-yoga',
        theyEn: 'Nice! How often do you go?',
        theyZh: '不錯！你多久去一次？',
        choices: askBack,
      },
      {
        id: 'n5-read',
        theyEn: 'Me too, honestly! What are you watching now?',
        theyZh: '老實說我也是！你現在在看什麼？',
        choices: [
          { en: "A Korean drama. It's so good! How about you?", zh: '一部韓劇，超好看！你呢？', next: 'n6' },
          { en: "A Taiwanese drama. You can watch it on Netflix! What do you do for fun?", zh: '一部台劇，Netflix 上就有！你都做什麼休閒？', next: 'n6' },
        ],
      },
      {
        id: 'n6',
        theyEn: 'I play tennis twice a week. And I walk Max every morning.',
        theyZh: '我一週打兩次網球。還有每天早上遛 Max。',
        choices: [
          { en: 'That sounds fun. It was nice talking to you!', zh: '聽起來很好玩。很高興跟你聊天！', next: null },
          { en: "Every morning? That's great! Bye, Max!", zh: '每天早上？好棒！Max 掰掰！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒聊聊你的興趣：喜歡做什麼、多久做一次、為什麼喜歡。也可以聊聊你家的兔子！',
    hints: ["I'm really into ___.", 'I usually ___ on weekends.', 'What do you like to do in your free time?'],
  },
  youtube: {
    label: '想多聽一點：聊興趣與休閒',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=hobbies',
  },
}
