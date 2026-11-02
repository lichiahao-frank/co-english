import type { Day, RoleplayChoice } from '../types'

const thanksChoices: RoleplayChoice[] = [
  { en: 'Thank you so much.', zh: '非常謝謝你。', next: null },
  { en: "Thank you. That's very kind of you.", zh: '謝謝，你人真好。', next: null },
]

export const day10: Day = {
  day: 10,
  title: '飛機上',
  scene: '長途飛機上',
  emoji: '🥤',
  goal: '跟空服員點飲料、選餐；需要東西、設備壞了、不舒服都說得出口。',
  phrases: [
    { id: 'd10-1', en: 'Could I have some water, please?', zh: '可以給我一些水嗎？', note: '長途飛行很乾，水要多喝。water 換成 coffee、tea 都可以。' },
    { id: 'd10-2', en: "I'll have the chicken, please.", zh: '我要雞肉，謝謝。', note: '空服員常問 Chicken or beef? 選好之後加 please 就很有禮貌。' },
    { id: 'd10-3', en: 'Could I get a blanket, please?', zh: '可以給我一條毯子嗎？', note: '要枕頭就說 a pillow，要耳機就說 headphones。' },
    { id: 'd10-4', en: 'Excuse me, could I get past?', zh: '不好意思，可以借過一下嗎？', note: '坐靠窗要去洗手間時，跟旁邊的人說這句。' },
    { id: 'd10-5', en: "My screen isn't working.", zh: '我的螢幕不能用。', note: '任何東西壞了都可以說 ___ isn\'t working。' },
  ],
  dialogue: {
    title: '空服員推著餐車過來',
    lines: [
      { who: 'them', en: 'Would you like something to drink?', zh: '要喝點什麼嗎？' },
      { who: 'you', en: 'Could I have some water, please?', zh: '可以給我一些水嗎？' },
      { who: 'them', en: 'Sure. And for dinner, we have chicken with rice or beef with noodles.', zh: '好的。晚餐有雞肉飯或牛肉麵。' },
      { who: 'you', en: "I'll have the chicken, please.", zh: '我要雞肉，謝謝。' },
      { who: 'them', en: 'Here you go. Anything else?', zh: '給你。還需要什麼嗎？' },
      { who: 'you', en: "Yes. Could I get a blanket, please? It's a little cold.", zh: '有。可以給我一條毯子嗎？有點冷。' },
      { who: 'them', en: "Of course. I'll bring one right over.", zh: '當然。我馬上拿過來。' },
      { who: 'you', en: 'Thank you so much.', zh: '非常謝謝你。' },
    ],
  },
  quiz: [
    {
      q: '晚餐有哪兩種選擇？',
      options: ['雞肉飯和牛肉麵', '魚和雞肉', '牛肉飯和雞肉麵'],
      answer: 0,
    },
    {
      q: '你另外跟空服員要了什麼？',
      options: ['枕頭', '毯子', '耳機'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '長途飛行中，空服員推著餐車過來。點飲料、選餐，順便處理你需要的東西。',
    start: 'n1',
    outro: '你點了飲料和餐，還開口要了你需要的東西。十幾個小時的飛機，你可以過得很舒服。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi there. Would you like something to drink?',
        theyZh: '嗨。要喝點什麼嗎？',
        choices: [
          { en: 'Could I have some water, please?', zh: '可以給我一些水嗎？', next: 'n2' },
          { en: 'Orange juice, please.', zh: '柳橙汁，謝謝。', next: 'n2' },
          { en: 'What do you have?', zh: '你們有什麼？', next: 'n1-menu' },
          { en: "I'm good, thank you.", zh: '我不用，謝謝。', next: 'n2' },
        ],
      },
      {
        id: 'n1-menu',
        theyEn: 'We have juice, soda, coffee, tea, and wine.',
        theyZh: '我們有果汁、汽水、咖啡、茶和葡萄酒。',
        choices: [
          { en: 'Hot tea, please.', zh: '熱茶，謝謝。', next: 'n2' },
          { en: 'A Coke, please. No ice.', zh: '可樂，謝謝。不要冰塊。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'And for dinner, we have chicken with rice or beef with noodles.',
        theyZh: '晚餐有雞肉飯或牛肉麵。',
        choices: [
          { en: "I'll have the chicken, please.", zh: '我要雞肉，謝謝。', next: 'n3' },
          { en: 'Beef, please.', zh: '牛肉，謝謝。', next: 'n3' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n2-repeat' },
          { en: 'Do you have a vegetarian meal?', zh: '有素食餐嗎？', next: 'n2-veg' },
        ],
      },
      {
        id: 'n2-repeat',
        theyEn: 'Sure. Chicken... or beef?',
        theyZh: '當然。雞肉……還是牛肉？',
        choices: [
          { en: 'Chicken, please.', zh: '雞肉，謝謝。', next: 'n3' },
          { en: 'Beef, please.', zh: '牛肉，謝謝。', next: 'n3' },
        ],
      },
      {
        id: 'n2-veg',
        theyEn: 'Let me check... Yes, I have one vegetarian pasta left.',
        theyZh: '我查一下……有，還剩一份素食義大利麵。',
        choices: [
          { en: "Great, I'll take it. Thank you!", zh: '太好了，我要那個。謝謝！', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'Here you go. Is there anything else I can get you?',
        theyZh: '給你。還需要什麼嗎？',
        choices: [
          { en: "Could I get a blanket, please? It's a little cold.", zh: '可以給我一條毯子嗎？有點冷。', next: 'n4-blanket' },
          { en: "My screen isn't working.", zh: '我的螢幕不能用。', next: 'n4-screen' },
          { en: "I don't feel well. Do you have anything for a headache?", zh: '我不太舒服。有頭痛可以吃的東西嗎？', next: 'n4-sick' },
          { en: "No, I'm fine. Thank you.", zh: '不用了，謝謝。', next: null },
        ],
      },
      {
        id: 'n4-blanket',
        theyEn: "Of course. I'll bring one right over.",
        theyZh: '當然。我馬上拿過來。',
        choices: thanksChoices,
      },
      {
        id: 'n4-screen',
        theyEn: "Oh, sorry about that. Let me try restarting it for you.",
        theyZh: '喔，不好意思。我幫你重新開機看看。',
        choices: thanksChoices,
      },
      {
        id: 'n4-sick',
        theyEn: "I'm sorry to hear that. I'll bring you some water and a pain reliever.",
        theyZh: '很抱歉。我拿水和止痛藥給你。',
        choices: thanksChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '想像你在飛機上：點一杯飲料、選一份餐，再跟空服員要一樣東西。用 30 秒說完。',
    hints: ['Could I have ___, please?', "I'll have the ___, please.", 'Could I get a ___, please?'],
  },
  youtube: {
    label: '想多聽一點：飛機上的對話',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=airplane',
  },
}
