import type { Day, RoleplayChoice } from '../types'

const terminalChoices: RoleplayChoice[] = [
  { en: 'International departures, please.', zh: '國際線出發，謝謝。', next: 'n2-intl' },
  { en: "Sorry, I'm not sure. I'm flying to Taipei.", zh: '不好意思，我不確定。我要飛台北。', next: 'n2-intl2' },
]

const payChoices: RoleplayChoice[] = [
  { en: "Here's fifty. Keep the change.", zh: '這是五十，不用找了。', next: 'n4' },
  { en: 'Can I pay by card?', zh: '可以刷卡嗎？', next: 'n3-card' },
]

const coffeeChoices: RoleplayChoice[] = [
  { en: 'Thanks! Is there a coffee shop after security?', zh: '謝謝！過安檢之後有咖啡店嗎？', next: 'n6' },
  { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
]

export const day28: Day = {
  day: 28,
  title: '混合情境：旅行的最後一個早上',
  scene: '飯店→計程車→機場→咖啡店',
  emoji: '🧭',
  goal: '一個早上換四個場景：退房、叫車、付車資、報到、點咖啡，全部用英文搞定。',
  phrases: [
    { id: 'd28-1', en: "I'm in a bit of a hurry.", zh: '我有點趕時間。', note: '先說這句，對方會幫你加快速度。' },
    { id: 'd28-2', en: 'Could you take me to the airport, please?', zh: '可以載我去機場嗎？', note: '上計程車說目的地。the airport 換成任何地址都可以。' },
    { id: 'd28-3', en: 'How much do I owe you?', zh: '我要付你多少錢？', note: '計程車、小店結帳都能用，比 How much? 更完整。' },
    { id: 'd28-4', en: 'Keep the change.', zh: '不用找了。', note: '多給的零錢就當小費。' },
    { id: 'd28-5', en: 'Is there a coffee shop after security?', zh: '過安檢之後有咖啡店嗎？', note: 'coffee shop 換成 restroom、pharmacy 都可以問。' },
  ],
  dialogue: {
    title: '搭計程車去機場',
    lines: [
      { who: 'you', en: "Could you take me to the airport, please? I'm in a bit of a hurry.", zh: '可以載我去機場嗎？我有點趕時間。' },
      { who: 'them', en: 'Sure. Which terminal?', zh: '好的。哪個航廈？' },
      { who: 'you', en: 'International departures, please.', zh: '國際線出發，謝謝。' },
      { who: 'them', en: "No problem. Traffic is light today, so we'll be there in twenty minutes.", zh: '沒問題。今天車不多，二十分鐘就到。' },
      { who: 'them', en: 'Here we are!', zh: '到了！' },
      { who: 'you', en: 'How much do I owe you?', zh: '我要付你多少錢？' },
      { who: 'them', en: "That's forty-five dollars.", zh: '四十五美金。' },
      { who: 'you', en: "Here's fifty. Keep the change.", zh: '這是五十，不用找了。' },
      { who: 'them', en: 'Thanks! Have a safe flight.', zh: '謝謝！祝你一路平安。' },
    ],
  },
  quiz: [
    {
      q: '車資是多少？',
      options: ['40 美金', '45 美金', '50 美金'],
      answer: 1,
    },
    {
      q: '你最後給了司機多少錢？',
      options: ['45 美金', '50 美金', '55 美金'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '旅行的最後一個早上：先在飯店退房，再搭計程車去機場、報到，最後買杯咖啡。中文提示前面會標出現在是誰在說話。',
    start: 'n1',
    outro: '退房、叫車、付車資、報到、點咖啡——一個早上換了四個場景，你全部用英文搞定了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good morning! Checking out?',
        theyZh: '（飯店櫃檯）早安！要退房嗎？',
        choices: [
          { en: "Yes. I'm in a bit of a hurry. Could you call a taxi for me?", zh: '對。我有點趕時間。可以幫我叫計程車嗎？', next: 'n1-taxi' },
          { en: "Yes, I'd like to check out, please. Here's my key.", zh: '對，我要退房，謝謝。這是我的房卡。', next: 'n1-out' },
          { en: 'Yes. Could I get a receipt, please?', zh: '對。可以給我收據嗎？', next: 'n1-receipt' },
        ],
      },
      {
        id: 'n1-taxi',
        theyEn: "Of course. It'll be here in five minutes. You're all checked out.",
        theyZh: '（飯店櫃檯）當然。五分鐘後到。退房也辦好了。',
        choices: [
          { en: 'Thank you so much!', zh: '非常謝謝！', next: 'n2' },
        ],
      },
      {
        id: 'n1-out',
        theyEn: 'All done. Have a safe trip!',
        theyZh: '（飯店櫃檯）好了。一路平安！',
        choices: [
          { en: 'Thank you! Could you call a taxi for me?', zh: '謝謝！可以幫我叫計程車嗎？', next: 'n1-taxi' },
          { en: 'Thank you for everything!', zh: '謝謝你們的一切！', next: 'n2' },
        ],
      },
      {
        id: 'n1-receipt',
        theyEn: "Sure, I'll email it to you. You're all checked out.",
        theyZh: '（飯店櫃檯）好的，我寄到你的信箱。退房辦好了。',
        choices: [
          { en: 'Perfect. Could you call a taxi for me?', zh: '太好了。可以幫我叫計程車嗎？', next: 'n1-taxi' },
          { en: 'Perfect, thank you!', zh: '太好了，謝謝！', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Morning! Where to?',
        theyZh: '（計程車司機）早！去哪裡？',
        choices: [
          { en: 'Could you take me to the airport, please?', zh: '可以載我去機場嗎？', next: 'n2-airport' },
          { en: "The airport, please. I'm in a bit of a hurry.", zh: '機場，謝謝。我有點趕時間。', next: 'n2-hurry' },
          { en: 'Logan Airport, international departures, please.', zh: '洛根機場，國際線出發，謝謝。', next: 'n2-intl' },
        ],
      },
      {
        id: 'n2-airport',
        theyEn: 'Sure. Which terminal?',
        theyZh: '（計程車司機）好的。哪個航廈？',
        choices: terminalChoices,
      },
      {
        id: 'n2-hurry',
        theyEn: 'No problem. Traffic is light this morning. Which terminal?',
        theyZh: '（計程車司機）沒問題，今天早上車不多。哪個航廈？',
        choices: terminalChoices,
      },
      {
        id: 'n2-intl',
        theyEn: "Got it, Terminal E. We'll be there in twenty minutes.",
        theyZh: '（計程車司機）知道了，E 航廈。二十分鐘就到。',
        choices: [
          { en: 'Great, thank you.', zh: '太好了，謝謝。', next: 'n3' },
        ],
      },
      {
        id: 'n2-intl2',
        theyEn: "Then it's Terminal E, international. Don't worry!",
        theyZh: '（計程車司機）那就是 E 航廈，國際線。別擔心！',
        choices: [
          { en: 'Thank you!', zh: '謝謝！', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'Here we are, Terminal E!',
        theyZh: '（計程車司機）到了，E 航廈！',
        choices: [
          { en: 'How much do I owe you?', zh: '我要付你多少錢？', next: 'n3-pay' },
          { en: 'Thank you! Could you help me with my luggage?', zh: '謝謝！可以幫我拿行李嗎？', next: 'n3-bag' },
        ],
      },
      {
        id: 'n3-bag',
        theyEn: "Sure thing! ...There you go. That's forty-five dollars.",
        theyZh: '（計程車司機）沒問題！……好了。車資四十五美金。',
        choices: payChoices,
      },
      {
        id: 'n3-pay',
        theyEn: "That's forty-five dollars.",
        theyZh: '（計程車司機）四十五美金。',
        choices: payChoices,
      },
      {
        id: 'n3-card',
        theyEn: 'Sure, just tap here.',
        theyZh: '（計程車司機）可以，在這裡感應就好。',
        choices: [
          { en: 'Thank you. Have a good one!', zh: '謝謝。祝你有美好的一天！', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Hi! Passport, please. Are you checking any bags?',
        theyZh: '（機場地勤）嗨！請給我護照。有要托運行李嗎？',
        choices: [
          { en: 'Yes, just this one. Is my bag checked all the way to Taipei?', zh: '有，就這一件。我的行李會直掛到台北嗎？', next: 'n4-through' },
          { en: "Here's my passport. One bag, please.", zh: '這是我的護照。一件行李，謝謝。', next: 'n5' },
          { en: 'Yes. Is the flight on time?', zh: '有。班機有準時嗎？', next: 'n4-time' },
          { en: 'Sorry, could you speak a little more slowly?', zh: '不好意思，可以說慢一點嗎？', next: 'n4-slow' },
        ],
      },
      {
        id: 'n4-slow',
        theyEn: 'Sure. Your passport, please... Any bags?',
        theyZh: '（機場地勤）當然。請給我護照……有行李嗎？',
        choices: [
          { en: 'Here you go. One bag, please.', zh: '給你。一件行李，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n4-through',
        theyEn: 'Yes, all the way to Taipei.',
        theyZh: '（機場地勤）會，直掛到台北。',
        choices: [
          { en: 'Great, thank you.', zh: '太好了，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n4-time',
        theyEn: "It's on time. Boarding starts at 1:30.",
        theyZh: '（機場地勤）準時。一點半開始登機。',
        choices: [
          { en: 'Great, thank you.', zh: '太好了，謝謝。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: "You're all set. Gate E7. Have a great flight!",
        theyZh: '（機場地勤）都辦好了。E7 登機門。祝你飛行愉快！',
        choices: [
          ...coffeeChoices,
          { en: 'Let me make sure I understand. Gate E7?', zh: '讓我確認一下。E7 登機門？', next: 'n5-check' },
        ],
      },
      {
        id: 'n5-check',
        theyEn: "That's right, E7.",
        theyZh: '（機場地勤）沒錯，E7。',
        choices: coffeeChoices,
      },
      {
        id: 'n6',
        theyEn: 'Yes, right next to gate E5.',
        theyZh: '（機場地勤）有，就在 E5 登機門旁邊。',
        choices: [
          { en: 'Great, thank you!', zh: '太好了，謝謝！', next: 'n7' },
        ],
      },
      {
        id: 'n7',
        theyEn: 'Hi there! What can I get you?',
        theyZh: '（咖啡店店員）嗨！要點什麼？',
        choices: [
          { en: 'Could I have a large latte, please?', zh: '可以給我一杯大杯拿鐵嗎？', next: 'n7-milk' },
          { en: 'What do you recommend?', zh: '你推薦什麼？', next: 'n7-rec' },
          { en: 'Just a black coffee, please.', zh: '一杯黑咖啡就好，謝謝。', next: 'n8' },
        ],
      },
      {
        id: 'n7-milk',
        theyEn: 'Sure. Whole milk or oat milk?',
        theyZh: '（咖啡店店員）好的。要全脂牛奶還是燕麥奶？',
        choices: [
          { en: 'Oat milk, please.', zh: '燕麥奶，謝謝。', next: 'n8' },
          { en: 'Whole milk, please.', zh: '全脂牛奶，謝謝。', next: 'n8' },
          { en: "Sorry, what's the difference?", zh: '不好意思，差在哪裡？', next: 'n7-diff' },
        ],
      },
      {
        id: 'n7-diff',
        theyEn: 'Whole milk is regular milk. Oat milk is made from oats.',
        theyZh: '（咖啡店店員）全脂就是一般牛奶，燕麥奶是燕麥做的。',
        choices: [
          { en: 'Oh, regular milk, please.', zh: '喔，一般牛奶，謝謝。', next: 'n8' },
          { en: "I'll try oat milk!", zh: '我試試燕麥奶！', next: 'n8' },
        ],
      },
      {
        id: 'n7-rec',
        theyEn: 'Our pumpkin spice latte is really popular this time of year!',
        theyZh: '（咖啡店店員）南瓜香料拿鐵是這個季節最受歡迎的！',
        choices: [
          { en: "Sounds good. I'll have that.", zh: '聽起來不錯。我要那個。', next: 'n8' },
          { en: 'Hmm, just a black coffee, please.', zh: '嗯，一杯黑咖啡就好，謝謝。', next: 'n8' },
        ],
      },
      {
        id: 'n8',
        theyEn: 'Can I get a name for the order?',
        theyZh: '（咖啡店店員）可以給我一個名字嗎？做好會叫你。',
        choices: [
          { en: 'Queeni. Q-U-E-E-N-I.', zh: 'Queeni，Q-U-E-E-N-I。', next: 'n9' },
          { en: "It's Queeni.", zh: '我叫 Queeni。', next: 'n9' },
          { en: 'Just write Q.', zh: '寫 Q 就好。', next: 'n9' },
        ],
      },
      {
        id: 'n9',
        theyEn: "Perfect. It'll be ready in a few minutes. Have a safe flight!",
        theyZh: '（咖啡店店員）好的，幾分鐘就好。一路平安！',
        choices: [
          { en: 'Thank you! Have a good one!', zh: '謝謝！祝你有美好的一天！', next: null },
          { en: 'Thanks so much!', zh: '非常謝謝！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 1 分鐘說出旅行最後一天的流程：從退房、搭車去機場，到報到、買咖啡，每個場景各說一句。',
    hints: ["I'd like to check out, please.", 'Could you take me to ___?', 'How much do I owe you?'],
  },
  youtube: {
    label: '想多聽一點：旅行英語總複習',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=travel%20english',
  },
}
