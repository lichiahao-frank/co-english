import type { Day, RoleplayChoice } from '../types'

const sideChoices: RoleplayChoice[] = [
  { en: 'Salad, please. What kind of dressing do you have?', zh: '沙拉，謝謝。你們有什麼醬？', next: 'n4-dressing' },
  { en: "Soup, please. What's the soup today?", zh: '湯，謝謝。今天是什麼湯？', next: 'n4-soup' },
  { en: 'Sorry, did you say "super salad"?', zh: '不好意思，你是說「超級沙拉」嗎？', next: 'n4-super' },
]

const wrongChoices: RoleplayChoice[] = [
  { en: "Excuse me, I think this isn't what I ordered.", zh: '不好意思，這好像不是我點的。', next: 'n6' },
  { en: "Sorry, I didn't order pasta.", zh: '不好意思，我沒有點義大利麵。', next: 'n6' },
  { en: 'Hmm, is this mine? I ordered something else.', zh: '嗯，這是我的嗎？我點的是別的。', next: 'n6' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you! Everything was great.', zh: '謝謝！一切都很棒。', next: null },
  { en: 'Thanks so much. Have a good night!', zh: '非常謝謝。祝你有個美好的夜晚！', next: null },
]

export const day26: Day = {
  day: 26,
  title: '餐廳實戰：選項多又送錯菜',
  scene: '波士頓的海鮮餐廳',
  emoji: '🦞',
  goal: '聽懂服務生一連串的選項；餐點送錯能開口說；最後分開結帳。',
  phrases: [
    { id: 'd26-1', en: "I'd like my steak medium, please.", zh: '我的牛排要五分熟，謝謝。', note: 'rare 三分、medium 五分、well done 全熟。服務生會問 How would you like your steak?' },
    { id: 'd26-2', en: 'What kind of dressing do you have?', zh: '你們有什麼沙拉醬？', note: '點沙拉時服務生常問要什麼醬。聽不懂選項就用這句請他列出來。' },
    { id: 'd26-3', en: "Excuse me, I think this isn't what I ordered.", zh: '不好意思，這好像不是我點的。', note: '送錯菜時溫和地說，服務生會馬上處理。' },
    { id: 'd26-4', en: 'Could we split the check?', zh: '我們可以分開結帳嗎？', note: '跟朋友吃飯想各付各的，用這句。' },
    { id: 'd26-5', en: 'Could I get a refill, please?', zh: '可以幫我續杯嗎？', note: '美國很多飲料（汽水、冰茶、咖啡）可以免費續杯。' },
  ],
  dialogue: {
    title: '服務生一直問選項，最後還送錯了',
    lines: [
      { who: 'them', en: 'How would you like your steak?', zh: '牛排要幾分熟？' },
      { who: 'you', en: "I'd like my steak medium, please.", zh: '我的牛排要五分熟，謝謝。' },
      { who: 'them', en: 'And it comes with soup or salad.', zh: '另外附湯或沙拉。' },
      { who: 'you', en: 'Salad, please. What kind of dressing do you have?', zh: '沙拉，謝謝。你們有什麼沙拉醬？' },
      { who: 'them', en: 'Ranch, Italian, or balsamic.', zh: '田園醬、義式醬，或巴薩米克醋。' },
      { who: 'you', en: 'Italian, please.', zh: '義式醬，謝謝。' },
      { who: 'you', en: "Excuse me, I think this isn't what I ordered. I asked for salad, not fries.", zh: '不好意思，這好像不是我點的。我要的是沙拉，不是薯條。' },
      { who: 'them', en: "Oh, I'm so sorry! I'll fix that right away.", zh: '喔，真的很抱歉！我馬上處理。' },
    ],
  },
  quiz: [
    {
      q: '牛排要幾分熟？',
      options: ['三分熟', '五分熟', '全熟'],
      answer: 1,
    },
    {
      q: '服務生送錯了什麼？',
      options: ['送了薯條，不是沙拉', '送了湯，不是沙拉', '送了雞肉，不是牛排'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '你跟新朋友在波士頓的海鮮餐廳吃飯。服務生講話很快、選項很多，餐點還送錯了。最後要分開結帳。',
    start: 'n1',
    outro: '服務生講很快、選項一堆、還送錯菜，你都接住了。這就是真實的美國餐廳，你已經可以自己來。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi, folks! Can I start you off with something to drink?',
        theyZh: '嗨，兩位！先幫你們點個飲料好嗎？',
        choices: [
          { en: 'Just water for now, thanks.', zh: '先給我水就好，謝謝。', next: 'n2' },
          { en: 'A lemonade, please.', zh: '一杯檸檬汁，謝謝。', next: 'n2' },
          { en: 'Sorry, could you say that again? A little slower?', zh: '不好意思，可以再說一次嗎？慢一點？', next: 'n1-slow' },
        ],
      },
      {
        id: 'n1-slow',
        theyEn: 'Of course. What would you like to drink?',
        theyZh: '當然。你想喝什麼？',
        choices: [
          { en: 'Water, please.', zh: '水，謝謝。', next: 'n2' },
          { en: 'A lemonade, please.', zh: '一杯檸檬汁，謝謝。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Sure thing. Are you ready to order?',
        theyZh: '沒問題。準備好點餐了嗎？',
        choices: [
          { en: "Yes. I'd like the steak, please.", zh: '好了。我要牛排，謝謝。', next: 'n3-steak' },
          { en: "I'd like the lobster roll, please.", zh: '我要龍蝦堡，謝謝。', next: 'n4' },
          { en: "What's the most popular dish here?", zh: '這裡最受歡迎的是什麼？', next: 'n2-popular' },
        ],
      },
      {
        id: 'n2-popular',
        theyEn: "The lobster roll. It's a Boston favorite.",
        theyZh: '龍蝦堡。是波士頓人的最愛。',
        choices: [
          { en: "Then I'll have that!", zh: '那我就點那個！', next: 'n4' },
          { en: 'Is it expensive?', zh: '會很貴嗎？', next: 'n2-price' },
        ],
      },
      {
        id: 'n2-price',
        theyEn: "It's thirty-two dollars. But it's worth it!",
        theyZh: '三十二美金。但很值得！',
        choices: [
          { en: "Okay, I'll try it!", zh: '好，我試試看！', next: 'n4' },
          { en: "Hmm, I'll have the fish and chips instead.", zh: '嗯，那我改點炸魚薯條好了。', next: 'n4' },
        ],
      },
      {
        id: 'n3-steak',
        theyEn: 'How would you like your steak?',
        theyZh: '牛排要幾分熟？',
        choices: [
          { en: 'Medium, please.', zh: '五分熟，謝謝。', next: 'n4' },
          { en: 'Well done, please.', zh: '全熟，謝謝。', next: 'n4' },
          { en: 'Sorry, what do you mean?', zh: '不好意思，你的意思是？', next: 'n3-mean' },
        ],
      },
      {
        id: 'n3-mean',
        theyEn: 'How cooked do you want it — rare, medium, or well done?',
        theyZh: '你要煎到多熟——三分、五分，還是全熟？',
        choices: [
          { en: 'Oh! Medium, please.', zh: '喔！五分熟，謝謝。', next: 'n4' },
          { en: 'Well done, please.', zh: '全熟，謝謝。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Great. It comes with soup or salad.',
        theyZh: '好的。附湯或沙拉。',
        choices: sideChoices,
      },
      {
        id: 'n4-super',
        theyEn: 'Ha! No — soup... or salad. Two choices!',
        theyZh: '哈！不是——湯……或沙拉。兩個選一個！',
        choices: [
          { en: 'Oh! Salad, please.', zh: '喔！沙拉，謝謝。', next: 'n5' },
          { en: 'Oh! Soup, please.', zh: '喔！湯，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n4-dressing',
        theyEn: 'Ranch, Italian, or balsamic.',
        theyZh: '田園醬、義式醬，或巴薩米克醋。',
        choices: [
          { en: 'Italian, please.', zh: '義式醬，謝謝。', next: 'n5' },
          { en: 'Could I have it on the side?', zh: '醬可以另外放嗎？', next: 'n5' },
        ],
      },
      {
        id: 'n4-soup',
        theyEn: 'Clam chowder.',
        theyZh: '蛤蜊巧達湯。',
        choices: [
          { en: "Perfect, I'll have that.", zh: '太好了，我要那個。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: "Here's your shrimp pasta. Enjoy!",
        theyZh: '這是你的鮮蝦義大利麵。請慢用！',
        choices: wrongChoices,
      },
      {
        id: 'n6',
        theyEn: "Oh no, I'm so sorry! That's for another table. I'll bring yours right away.",
        theyZh: '喔不，真的很抱歉！那是別桌的。我馬上把你的送來。',
        choices: [
          { en: 'No problem. Could I get a refill, please?', zh: '沒關係。可以幫我續杯嗎？', next: 'n7' },
          { en: "That's okay. Thank you.", zh: '沒關係。謝謝。', next: 'n8' },
        ],
      },
      {
        id: 'n7',
        theyEn: "Of course! I'll bring it with your meal.",
        theyZh: '當然！我跟你的餐一起送來。',
        choices: [
          { en: 'Thank you!', zh: '謝謝！', next: 'n8' },
        ],
      },
      {
        id: 'n8',
        theyEn: 'How was everything? Can I get you anything else?',
        theyZh: '餐點還好嗎？還需要什麼嗎？',
        choices: [
          { en: 'It was great. Could we split the check?', zh: '很好吃。我們可以分開結帳嗎？', next: 'n9-split' },
          { en: "Could I get the check, please? We're paying together.", zh: '可以幫我結帳嗎？我們一起付。', next: 'n9-one' },
          { en: 'Everything was delicious. Is the tip included?', zh: '都很好吃。小費有含在裡面嗎？', next: 'n9-tip' },
        ],
      },
      {
        id: 'n9-split',
        theyEn: "Sure! I'll bring two checks.",
        theyZh: '沒問題！我拿兩張帳單過來。',
        choices: endChoices,
      },
      {
        id: 'n9-one',
        theyEn: 'Sure, here you go.',
        theyZh: '好的，給你。',
        choices: endChoices,
      },
      {
        id: 'n9-tip',
        theyEn: "No, it's not included.",
        theyZh: '沒有，沒有含在裡面。',
        choices: [
          { en: 'Got it. Could we split the check, please?', zh: '了解。我們可以分開結帳嗎？', next: 'n9-split' },
          { en: 'Okay. Could I get the check, please?', zh: '好的。可以幫我結帳嗎？', next: 'n9-one' },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你在美國的牛排館：用 1 分鐘從點飲料、點牛排（說幾分熟）、選湯或沙拉，一路說到分開結帳。',
    hints: ["I'd like my steak ___, please.", 'What kind of ___ do you have?', 'Could we split the check?'],
  },
  youtube: {
    label: '想多聽一點：美國餐廳的點餐',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=ordering%20food',
  },
}
