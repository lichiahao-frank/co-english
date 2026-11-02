import type { Day, RoleplayChoice } from '../types'

const orderChoices: RoleplayChoice[] = [
  { en: "Great, I'll have the fish tacos.", zh: '太好了，我要魚肉塔可。', next: 'n3' },
  { en: 'Are they spicy?', zh: '會辣嗎？', next: 'n2-spicy' },
]

const payChoices: RoleplayChoice[] = [
  { en: 'Is the tip included?', zh: '小費有含在裡面嗎？', next: 'n6-tip' },
  { en: 'Can I pay by card?', zh: '可以刷卡嗎？', next: 'n6-card' },
]

export const day14: Day = {
  day: 14,
  title: '第二週驗收：餐廳從候位到結帳',
  scene: '洛杉磯的人氣餐廳',
  emoji: '🌮',
  goal: '候位、點餐、說過敏，到打包、問小費、結帳，一頓飯全部自己來。',
  phrases: [
    { id: 'd14-1', en: 'How long is the wait?', zh: '要等多久？', note: '熱門餐廳常要候位。對方會問你名字，等一下會叫你。' },
    { id: 'd14-2', en: "I'm allergic to peanuts.", zh: '我對花生過敏。', note: '有過敏一定要說。peanuts 換成 shrimp（蝦）、milk（牛奶）等你真正會過敏的東西。' },
    { id: 'd14-3', en: 'Could I get a box for the rest?', zh: '剩下的可以給我一個盒子打包嗎？', note: '美國份量很大，打包很正常，不用不好意思。' },
    { id: 'd14-4', en: 'Is the tip included?', zh: '小費有含在裡面嗎？', note: '美國小費大約 18–20%。有些帳單已經加了，問一下就不會付兩次。' },
    { id: 'd14-5', en: 'Can I pay by card?', zh: '可以刷卡嗎？', note: '大部分店都能刷卡。服務生會拿走你的卡，再拿收據回來給你簽名。' },
  ],
  dialogue: {
    title: '熱門餐廳要候位',
    lines: [
      { who: 'them', en: 'Hi! Just one today?', zh: '嗨！今天一位嗎？' },
      { who: 'you', en: 'Yes. How long is the wait?', zh: '對。要等多久？' },
      { who: 'them', en: 'About fifteen minutes. Can I get your name?', zh: '大概十五分鐘。可以給我你的名字嗎？' },
      { who: 'you', en: "It's Queeni.", zh: '我叫 Queeni。' },
      { who: 'them', en: 'Queeni, your table is ready! Are you ready to order?', zh: 'Queeni，你的位子好了！準備好點餐了嗎？' },
      { who: 'you', en: "Yes. I'd like the fish tacos. I'm allergic to peanuts.", zh: '好了。我要魚肉塔可。我對花生過敏。' },
      { who: 'them', en: "Good to know. The tacos don't have any peanuts, so you're fine.", zh: '好的，知道了。塔可裡沒有花生，你可以放心。' },
      { who: 'you', en: 'Great, thank you.', zh: '太好了，謝謝。' },
    ],
  },
  quiz: [
    {
      q: '要等多久才有位子？',
      options: ['五分鐘', '十五分鐘', '五十分鐘'],
      answer: 1,
    },
    {
      q: '點餐時，你特別跟服務生說了什麼？',
      options: ['你不吃辣', '你對花生過敏', '你吃素'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '第二週的驗收。你在洛杉磯一家人氣餐廳，從候位一路到結帳。盡量不看中文。',
    start: 'n1',
    outro: '第二週完成！你從報到、安檢、搭機、入境，一路走到飯店和餐廳，全部自己來。洛杉磯的章蓋好了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi there! How many?',
        theyZh: '嗨！請問幾位？',
        choices: [
          { en: 'Just one. How long is the wait?', zh: '一位。要等多久？', next: 'n1-wait' },
          { en: 'Just one, please.', zh: '一位，謝謝。', next: 'n2' },
          { en: 'Two, please. Can we sit outside?', zh: '兩位，謝謝。可以坐外面嗎？', next: 'n1-outside' },
        ],
      },
      {
        id: 'n1-wait',
        theyEn: 'About fifteen minutes. Can I get your name?',
        theyZh: '大概十五分鐘。可以給我你的名字嗎？',
        choices: [
          { en: "It's Queeni.", zh: '我叫 Queeni。', next: 'n2' },
          { en: "Fifteen minutes is fine. It's Queeni.", zh: '十五分鐘可以。我叫 Queeni。', next: 'n2' },
        ],
      },
      {
        id: 'n1-outside',
        theyEn: 'Sure, we have a table on the patio.',
        theyZh: '可以，戶外區有一張桌子。',
        choices: [
          { en: 'Great, thank you.', zh: '太好了，謝謝。', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: "Here's your table. Are you ready to order?",
        theyZh: '這是你的位子。準備好點餐了嗎？',
        choices: [
          { en: "Yes. I'd like the fish tacos, please.", zh: '好了。我要魚肉塔可，謝謝。', next: 'n3' },
          { en: 'What do you recommend?', zh: '你推薦什麼？', next: 'n2-rec' },
          { en: "I'm allergic to peanuts. What's safe for me?", zh: '我對花生過敏。我可以吃什麼？', next: 'n2-allergy' },
        ],
      },
      {
        id: 'n2-rec',
        theyEn: 'The fish tacos are our most popular dish.',
        theyZh: '魚肉塔可是我們最受歡迎的菜。',
        choices: orderChoices,
      },
      {
        id: 'n2-allergy',
        theyEn: 'The fish tacos and the salads are both peanut-free.',
        theyZh: '魚肉塔可和沙拉都沒有花生。',
        choices: orderChoices,
      },
      {
        id: 'n2-spicy',
        theyEn: 'Just a little. I can ask the kitchen to make them mild.',
        theyZh: '一點點。我可以請廚房做不辣的。',
        choices: [
          { en: 'Mild, please.', zh: '不辣的，謝謝。', next: 'n3' },
          { en: 'A little spicy is fine.', zh: '辣一點點沒關係。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'Great choice. Do you have any food allergies?',
        theyZh: '選得好。你有任何食物過敏嗎？',
        choices: [
          { en: "Yes, I'm allergic to peanuts.", zh: '有，我對花生過敏。', next: 'n3-allergy' },
          { en: "No, I don't. Thank you for asking.", zh: '沒有。謝謝你問。', next: 'n4' },
          { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n3-repeat' },
        ],
      },
      {
        id: 'n3-repeat',
        theyEn: 'Sure. Is there any food you can\'t eat?',
        theyZh: '當然。有沒有什麼東西你不能吃？',
        choices: [
          { en: 'Yes, peanuts.', zh: '有，花生。', next: 'n3-allergy' },
          { en: "No, I can eat anything.", zh: '沒有，我什麼都能吃。', next: 'n4' },
        ],
      },
      {
        id: 'n3-allergy',
        theyEn: "Got it. I'll let the kitchen know.",
        theyZh: '知道了。我會跟廚房說。',
        choices: [
          { en: 'Thank you so much.', zh: '非常謝謝你。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'How was everything? Can I get you anything else?',
        theyZh: '餐點還好嗎？還需要什麼嗎？',
        choices: [
          { en: 'It was delicious! Could I get a box for the rest?', zh: '很好吃！剩下的可以給我一個盒子打包嗎？', next: 'n4-box' },
          { en: 'Everything was great. Could I get the check, please?', zh: '都很棒。可以幫我結帳嗎？', next: 'n5' },
          { en: 'It was good, but a little too salty for me.', zh: '很好吃，不過對我來說有點太鹹。', next: 'n4-salty' },
        ],
      },
      {
        id: 'n4-box',
        theyEn: "Sure, I'll bring one with your check.",
        theyZh: '好的，我拿帳單過來的時候順便帶一個盒子。',
        choices: [
          { en: 'Thank you!', zh: '謝謝！', next: 'n5' },
        ],
      },
      {
        id: 'n4-salty',
        theyEn: "Oh, I'm sorry. I'll tell the chef. Can I get you anything else?",
        theyZh: '喔，很抱歉，我會跟廚師說。還需要什麼嗎？',
        choices: [
          { en: 'No problem. Could I get the check, please?', zh: '沒關係。可以幫我結帳嗎？', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: "Here's your check. No rush.",
        theyZh: '這是你的帳單。慢慢來。',
        choices: [
          ...payChoices,
          { en: 'Let me make sure I understand. The total is forty-two dollars?', zh: '讓我確認一下。總共是四十二美金嗎？', next: 'n6-total' },
        ],
      },
      {
        id: 'n6-total',
        theyEn: "That's right. Forty-two, before tip.",
        theyZh: '沒錯。四十二，還沒含小費。',
        choices: payChoices,
      },
      {
        id: 'n6-tip',
        theyEn: "No, it isn't. You can add it on the receipt.",
        theyZh: '沒有。你可以寫在收據上。',
        choices: [
          { en: 'Got it. Can I pay by card?', zh: '了解。可以刷卡嗎？', next: 'n6-card' },
        ],
      },
      {
        id: 'n6-card',
        theyEn: "Of course! I'll be right back with that.",
        theyZh: '當然！我馬上回來。',
        choices: [
          { en: 'Thank you. Everything was great!', zh: '謝謝。一切都很棒！', next: null },
          { en: 'Thanks so much. Have a good night!', zh: '非常謝謝。祝你有個美好的夜晚！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '第二週最終挑戰：用 1 分鐘，從「我要報到」一路說到「我要結帳」，挑你記得的句子串起來。',
    hints: ["I'd like to check in for my flight to ___.", "I'm here on vacation.", 'Could I get the check, please?'],
  },
  youtube: {
    label: '想多聽一點：美國餐廳的對話',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=restaurant',
  },
}
