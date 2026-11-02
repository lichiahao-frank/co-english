import type { Day, RoleplayChoice } from '../types'

const roomChoices: RoleplayChoice[] = [
  { en: 'Actually, I asked for a non-smoking room.', zh: '其實我要的是禁菸房。', next: 'n3-smoke' },
  { en: "That's right. Thank you.", zh: '沒錯。謝謝。', next: 'n4' },
  { en: 'Sorry, what is a king room?', zh: '不好意思，什麼是 king room？', next: 'n3-king' },
]

const okChoices: RoleplayChoice[] = [
  { en: "Okay, that's fine.", zh: '好，沒問題。', next: 'n6' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you for your help!', zh: '謝謝你的幫忙！', next: null },
  { en: 'Perfect. Thank you!', zh: '太好了。謝謝！', next: null },
]

export const day24: Day = {
  day: 24,
  title: '飯店入住：找不到訂房',
  scene: '波士頓的飯店櫃檯',
  emoji: '🗝️',
  goal: '入住不順利時，能拿出資料、問清楚房型和押金，再問好飯店設施。',
  phrases: [
    { id: 'd24-1', en: "I booked it online. Here's my confirmation number.", zh: '我是在網路上訂的。這是我的確認編號。', note: '找不到訂房時，確認編號是最快的解法。出發前先截圖存好。' },
    { id: 'd24-2', en: 'I asked for a non-smoking room.', zh: '我要的是禁菸房。', note: 'asked for 是「當初要求的」。房型不對的時候用。' },
    { id: 'd24-3', en: 'What is the deposit for?', zh: '押金是做什麼用的？', note: '美國飯店常在信用卡上先扣押金，退房後才退。' },
    { id: 'd24-4', en: 'When will I get it back?', zh: '什麼時候會退還？', note: '押金、寄放的東西、借的東西都可以這樣問。' },
    { id: 'd24-5', en: 'Is there a laundry room?', zh: '有洗衣房嗎？', note: '旅行超過一週一定會需要。也可以問 Is there a gym?' },
  ],
  dialogue: {
    title: '櫃檯找不到你的訂房',
    lines: [
      { who: 'them', en: "I'm sorry, I can't find your reservation.", zh: '很抱歉，我找不到你的訂房。' },
      { who: 'you', en: "I booked it online. Here's my confirmation number.", zh: '我是在網路上訂的。這是我的確認編號。' },
      { who: 'them', en: "Ah, here it is. There's a hundred-dollar deposit on your card.", zh: '啊，找到了。會在你的卡上扣一百美金的押金。' },
      { who: 'you', en: 'What is the deposit for?', zh: '押金是做什麼用的？' },
      { who: 'them', en: "It's in case of any damage or extra charges.", zh: '是以防房間有損壞或額外費用。' },
      { who: 'you', en: 'When will I get it back?', zh: '什麼時候會退還？' },
      { who: 'them', en: 'A few days after you check out.', zh: '退房之後幾天。' },
      { who: 'you', en: 'Okay. Is there a laundry room?', zh: '好的。有洗衣房嗎？' },
      { who: 'them', en: "Yes, it's on the basement level.", zh: '有，在地下樓層。' },
    ],
  },
  quiz: [
    {
      q: '你用什麼讓櫃檯找到訂房？',
      options: ['護照', '確認編號', '信用卡'],
      answer: 1,
    },
    {
      q: '押金什麼時候會退？',
      options: ['馬上', '退房之後幾天', '一個月後'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你到了波士頓的飯店，但入住沒有想像中順利。一步一步把問題問清楚。',
    start: 'n1',
    outro: '找不到訂房、看不懂房型、押金怎麼退，你都問清楚了。真實的入住常常不照劇本走，你應付得來。',
    nodes: [
      {
        id: 'n1',
        theyEn: "Welcome! Checking in? What's the name, please?",
        theyZh: '歡迎！要入住嗎？請問名字是？',
        choices: [
          { en: "Yes. It's under Queeni.", zh: '對。是 Queeni。', next: 'n2' },
          { en: 'I have a reservation under the name Queeni.', zh: '我用 Queeni 的名字訂了房。', next: 'n2' },
          { en: "Yes. I booked it online. Here's my confirmation number.", zh: '對。我是在網路上訂的。這是我的確認編號。', next: 'n2-found' },
        ],
      },
      {
        id: 'n2',
        theyEn: "Hmm, I'm sorry. I can't find your reservation.",
        theyZh: '嗯，很抱歉。我找不到你的訂房。',
        choices: [
          { en: "I booked it online. Here's my confirmation number.", zh: '我是在網路上訂的。這是我的確認編號。', next: 'n2-found' },
          { en: 'Could you try a different spelling? Q-U-E-E-N-I.', zh: '可以試試別的拼法嗎？Q-U-E-E-N-I。', next: 'n2-found' },
          { en: 'Let me show you the email on my phone.', zh: '我給你看我手機上的確認信。', next: 'n2-found' },
        ],
      },
      {
        id: 'n2-found',
        theyEn: 'Ah, here it is! Sorry about that. You have a king room for three nights.',
        theyZh: '啊，找到了！不好意思。你訂的是 king room，住三晚。',
        choices: roomChoices,
      },
      {
        id: 'n3-smoke',
        theyEn: "Don't worry, all our rooms are non-smoking.",
        theyZh: '別擔心，我們所有房間都禁菸。',
        choices: [
          { en: 'Oh, great. Thank you.', zh: '喔，太好了。謝謝。', next: 'n4' },
        ],
      },
      {
        id: 'n3-king',
        theyEn: "It's a room with one big bed.",
        theyZh: '就是有一張大床的房間。',
        choices: [
          { en: "Oh, okay. That's fine.", zh: '喔，好。可以。', next: 'n4' },
          { en: 'Do you have a room with two beds?', zh: '有兩張床的房間嗎？', next: 'n3-two' },
        ],
      },
      {
        id: 'n3-two',
        theyEn: 'Yes, I can change it for you. No extra charge.',
        theyZh: '有，我可以幫你換。不用加錢。',
        choices: [
          { en: 'Great, thank you!', zh: '太好了，謝謝！', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'There will be a hundred-dollar deposit on your card.',
        theyZh: '會在你的卡上扣一百美金的押金。',
        choices: [
          { en: 'What is the deposit for?', zh: '押金是做什麼用的？', next: 'n5-what' },
          { en: 'When will I get it back?', zh: '什麼時候會退還？', next: 'n5-back' },
          { en: 'Can I pay the deposit in cash?', zh: '押金可以付現金嗎？', next: 'n5-cash' },
          { en: "Okay, here's my card.", zh: '好的，這是我的卡。', next: 'n6' },
        ],
      },
      {
        id: 'n5-what',
        theyEn: "It's in case of any damage or extra charges.",
        theyZh: '是以防房間有損壞或額外費用。',
        choices: [
          { en: 'When will I get it back?', zh: '什麼時候會退還？', next: 'n5-back' },
          ...okChoices,
        ],
      },
      {
        id: 'n5-back',
        theyEn: 'A few days after you check out.',
        theyZh: '退房之後幾天。',
        choices: okChoices,
      },
      {
        id: 'n5-cash',
        theyEn: "Yes, you can. You'll get it back when you check out.",
        theyZh: '可以。退房的時候會還給你。',
        choices: [
          { en: 'Great, here you go.', zh: '太好了，給你。', next: 'n6' },
        ],
      },
      {
        id: 'n6',
        theyEn: "You're all set. Room 1204. Anything else?",
        theyZh: '都辦好了。1204 號房。還需要什麼嗎？',
        choices: [
          { en: 'Is there a laundry room?', zh: '有洗衣房嗎？', next: 'n7-laundry' },
          { en: 'What time is breakfast?', zh: '早餐是幾點？', next: 'n7-breakfast' },
          { en: 'Could you recommend somewhere to eat nearby?', zh: '可以推薦附近吃飯的地方嗎？', next: 'n7-eat' },
        ],
      },
      {
        id: 'n7-laundry',
        theyEn: 'Yes, on the basement level. The machines take quarters.',
        theyZh: '有，在地下樓層。機器要投 quarters。',
        choices: [
          { en: 'Quarters? Do you mean coins?', zh: 'Quarters？你是說硬幣嗎？', next: 'n7-coins' },
          { en: 'Great, thank you!', zh: '太好了，謝謝！', next: null },
        ],
      },
      {
        id: 'n7-coins',
        theyEn: 'Yes, twenty-five-cent coins. We can give you change here.',
        theyZh: '對，二十五分的硬幣。我們這裡可以幫你換零錢。',
        choices: endChoices,
      },
      {
        id: 'n7-breakfast',
        theyEn: 'From six thirty to ten, on the second floor.',
        theyZh: '六點半到十點，在二樓。',
        choices: endChoices,
      },
      {
        id: 'n7-eat',
        theyEn: 'Try the seafood place down the street. The clam chowder is famous here!',
        theyZh: '試試這條街上的海鮮餐廳。這裡的蛤蜊巧達湯很有名！',
        choices: [
          { en: "Clam chowder? What's that?", zh: '蛤蜊巧達湯？那是什麼？', next: 'n7-clam' },
          { en: "Great, I'll try it!", zh: '太好了，我會去試試！', next: null },
        ],
      },
      {
        id: 'n7-clam',
        theyEn: "A creamy soup with clams. It's a Boston classic.",
        theyZh: '加了蛤蜊的奶油濃湯，是波士頓的經典。',
        choices: endChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '假裝櫃檯找不到你的訂房：用 30 秒說明你怎麼訂的、拿出資料，再問一個關於房間或押金的問題。',
    hints: ['I booked it ___.', "Here's my ___.", 'What is the ___ for?'],
  },
  youtube: {
    label: '想多聽一點：飯店入住的狀況',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=hotel',
  },
}
