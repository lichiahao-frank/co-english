import type { Day, RoleplayChoice } from '../types'

/*
 * 全英文挑戰日：情境實戰的中文提示刻意留白（zh 是空字串）。
 * 句型、聽力對話和理解題仍保留中文，讓間隔複習和聽力檢查照常運作。
 */

const directionChoices: RoleplayChoice[] = [
  { en: "I'm not from here, but let me check my map.", zh: '', next: 'n3-map' },
  { en: "It's just around the corner. Go straight and turn left.", zh: '', next: 'n4' },
  { en: 'Sorry, could you say that again?', zh: '', next: 'n2-repeat' },
]

const fromHereChoices: RoleplayChoice[] = [
  { en: "No, I'm from Taiwan. I'm just visiting!", zh: '', next: 'n6-taiwan' },
  { en: "No, I'm a tourist too!", zh: '', next: 'n6-tourist' },
  { en: "No, but I've been here a few days.", zh: '', next: 'n6-days' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'You too. Enjoy your stay!', zh: '', next: null },
  { en: 'Have a good one!', zh: '', next: null },
]

export const day29: Day = {
  day: 29,
  title: '全英文挑戰：換你幫別人',
  scene: '波士頓街頭',
  emoji: '🌟',
  goal: '不靠中文提示完成一段對話——而且這次是你幫迷路的遊客指路。',
  phrases: [
    { id: 'd29-1', en: 'Can I help you?', zh: '需要幫忙嗎？', note: '看到有人在看地圖、看起來迷路時，主動問這句。' },
    { id: 'd29-2', en: "It's just around the corner.", zh: '就在轉角那邊。', note: 'just 強調「很近」。' },
    { id: 'd29-3', en: "I'm not from here, but let me check my map.", zh: '我不是本地人，但我查一下地圖。', note: '不知道也可以幫忙，這句很實用。' },
    { id: 'd29-4', en: "You can't miss it.", zh: '你一定看得到。', note: '指完路最常加的一句，意思是「很明顯，不會錯過」。' },
    { id: 'd29-5', en: 'Enjoy your stay!', zh: '祝你玩得愉快！', note: '跟遊客道別的好用句，飯店人員也常對你說。' },
  ],
  dialogue: {
    title: '迷路的遊客問你路',
    lines: [
      { who: 'them', en: 'Excuse me, do you know where the subway station is?', zh: '不好意思，你知道地鐵站在哪裡嗎？' },
      { who: 'you', en: "I'm not from here, but let me check my map.", zh: '我不是本地人，但我查一下地圖。' },
      { who: 'you', en: "Okay, it's just around the corner. Go straight and turn left.", zh: '好，就在轉角那邊。直走再左轉。' },
      { who: 'them', en: 'Thank you! Is it far?', zh: '謝謝！很遠嗎？' },
      { who: 'you', en: "No, about two minutes. You can't miss it.", zh: '不遠，大概兩分鐘。你一定看得到。' },
      { who: 'them', en: "You're so kind. Thank you!", zh: '你人真好。謝謝！' },
      { who: 'you', en: 'No problem. Enjoy your stay!', zh: '不客氣。祝你玩得愉快！' },
    ],
  },
  quiz: [
    {
      q: '對方在找什麼？',
      options: ['地鐵站', '公車站', '博物館'],
      answer: 0,
    },
    {
      q: '走過去要多久？',
      options: ['兩分鐘', '十分鐘', '二十分鐘'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '全英文挑戰日！今天的情境實戰沒有中文提示。這次換一位迷路的遊客來問你。卡住也沒關係，就選 Could you say that again?。',
    start: 'n1',
    outro: '全英文、沒有中文提示，而且這次是你在幫別人。一個月前還不敢開口的你，現在可以幫外國人指路了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Excuse me, sorry to bother you. Do you speak English?',
        theyZh: '',
        choices: [
          { en: 'Yes, a little. Can I help you?', zh: '', next: 'n2' },
          { en: 'Yes! How can I help?', zh: '', next: 'n2' },
          { en: 'A little bit. Please speak slowly.', zh: '', next: 'n1-slow' },
        ],
      },
      {
        id: 'n1-slow',
        theyEn: "Okay! I'm looking... for the subway station.",
        theyZh: '',
        choices: directionChoices,
      },
      {
        id: 'n2',
        theyEn: "Thank you! I'm looking for the subway station.",
        theyZh: '',
        choices: directionChoices,
      },
      {
        id: 'n2-repeat',
        theyEn: 'The subway. The train that runs under the ground.',
        theyZh: '',
        choices: [
          { en: "Oh, the subway! It's just around the corner.", zh: '', next: 'n4' },
          { en: 'Let me check my map.', zh: '', next: 'n3-map' },
        ],
      },
      {
        id: 'n3-map',
        theyEn: 'Thank you so much. Take your time.',
        theyZh: '',
        choices: [
          { en: "Okay, I found it! It's just around the corner.", zh: '', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Around the corner? Great. Is it far?',
        theyZh: '',
        choices: [
          { en: "No, about two minutes. You can't miss it.", zh: '', next: 'n5' },
          { en: 'Not at all. I can walk with you, if you want.', zh: '', next: 'n4-walk' },
          { en: "Just two minutes. There's a big sign.", zh: '', next: 'n5' },
        ],
      },
      {
        id: 'n4-walk',
        theyEn: "Really? That's so kind of you!",
        theyZh: '',
        choices: [
          { en: "No problem. Let's go!", zh: '', next: 'n5-walk' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Thank you so much! Are you from around here?',
        theyZh: '',
        choices: fromHereChoices,
      },
      {
        id: 'n5-walk',
        theyEn: 'Here we are! Thank you so much. Are you from around here?',
        theyZh: '',
        choices: fromHereChoices,
      },
      {
        id: 'n6-taiwan',
        theyEn: 'Really? Your English is great!',
        theyZh: '',
        choices: [
          { en: "Thank you! I've been practicing every day.", zh: '', next: 'n7' },
          { en: 'Thanks! A month ago, I was too scared to speak!', zh: '', next: 'n7' },
        ],
      },
      {
        id: 'n6-tourist',
        theyEn: 'Ha! Tourists helping tourists. Where are you from?',
        theyZh: '',
        choices: [
          { en: 'Taiwan. How about you?', zh: '', next: 'n6-spain' },
          { en: 'Taiwan! Enjoy Boston!', zh: '', next: null },
        ],
      },
      {
        id: 'n6-spain',
        theyEn: "I'm from Spain. Thanks again for your help!",
        theyZh: '',
        choices: endChoices,
      },
      {
        id: 'n6-days',
        theyEn: 'Well, you know more than me! Thank you!',
        theyZh: '',
        choices: endChoices,
      },
      {
        id: 'n7',
        theyEn: "Well, it's working! Thanks again, and enjoy your trip!",
        theyZh: '',
        choices: endChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '全英文挑戰：用 1 分鐘，只用英文想、只用英文說——說說這一個月練英文的感覺。不要先在腦中翻譯。',
    hints: ['A month ago, I ___.', 'Now I can ___.', "I'm proud of ___."],
  },
  youtube: {
    label: '想多聽一點：自然語速的英語',
    url: 'https://www.youtube.com/@rachelsenglish/search?query=conversation',
  },
}
