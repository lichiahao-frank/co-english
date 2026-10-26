import type { Day } from '../types'

export const day04: Day = {
  day: 4,
  title: '問路、問時間、問價錢',
  scene: '街上與商店',
  emoji: '🗺️',
  goal: '需要資訊時，能主動開口問，而且聽得懂方向與數字。',
  phrases: [
    { id: 'd4-1', en: 'Excuse me, could you help me?', zh: '不好意思，可以幫我一下嗎？', note: '開口問路前先說這句，對方會停下來聽你說。' },
    { id: 'd4-2', en: 'Where can I find the restroom?', zh: '請問洗手間在哪裡？', note: 'restroom 是美式說法，比 toilet 禮貌。' },
    { id: 'd4-3', en: 'What time does it open?', zh: '它幾點開門？', note: 'open 換成 close 就是問幾點關門。' },
    { id: 'd4-4', en: 'How much is this?', zh: '這個多少錢？', note: '拿著東西直接問，最簡單。' },
    { id: 'd4-5', en: 'Is this the right way to the station?', zh: '往車站是走這邊嗎？', note: '不確定方向時，用這句確認比重新問路快。' },
  ],
  dialogue: {
    title: '在街上向路人問路',
    lines: [
      { who: 'you', en: 'Excuse me, could you help me?', zh: '不好意思，可以幫我一下嗎？' },
      { who: 'them', en: 'Sure, what do you need?', zh: '當然，你需要什麼？' },
      { who: 'you', en: 'Is this the right way to the station?', zh: '往車站是走這邊嗎？' },
      { who: 'them', en: 'Almost. Go straight for two blocks, then turn left.', zh: '快到了。直走兩個街區，然後左轉。' },
      { who: 'you', en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？' },
      { who: 'them', en: 'Of course. Two blocks straight, then turn left.', zh: '當然。直走兩個街區，然後左轉。' },
      { who: 'you', en: 'Got it. Thank you so much!', zh: '懂了，非常謝謝你！' },
    ],
  },
  quiz: [
    {
      q: '路人告訴你怎麼走？',
      options: ['直走兩個街區再左轉', '右轉後直走', '搭公車比較快'],
      answer: 0,
    },
    {
      q: '沒聽清楚的時候，說話的人做了什麼？',
      options: ['放棄不問了', '請對方再說一次', '改用手機查'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在街上迷路了，想找最近的地鐵站，也想順便問旁邊那家店幾點開。',
    start: 'n1',
    outro: '你主動開口問了陌生人，還聽懂了方向。這在國外是最實用的能力。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi, you look a little lost. Can I help?',
        theyZh: '嗨，你看起來有點迷路。需要幫忙嗎？',
        choices: [
          { en: 'Yes, please. Is this the right way to the station?', zh: '好的，麻煩你。往車站是走這邊嗎？', next: 'n2' },
          { en: 'Yes. Where can I find the subway?', zh: '是的。請問地鐵站在哪裡？', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'You are close. Go straight for two blocks and turn right at the bank.',
        theyZh: '你很接近了。直走兩個街區，在銀行那裡右轉。',
        choices: [
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n2b' },
          { en: 'Two blocks, then right at the bank. Got it.', zh: '兩個街區，然後在銀行右轉。懂了。', next: 'n3' },
        ],
      },
      {
        id: 'n2b',
        theyEn: 'Sure. Two blocks... straight ahead... then turn right.',
        theyZh: '當然。兩個街區……往前直走……然後右轉。',
        choices: [
          { en: 'Thank you, that helps a lot.', zh: '謝謝，這幫助很大。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'No problem. Anything else?',
        theyZh: '不客氣。還有別的事嗎？',
        choices: [
          { en: 'One more thing — what time does that shop open?', zh: '還有一件事——那家店幾點開門？', next: 'n4' },
          { en: "That's all. Thank you so much!", zh: '這樣就好，非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n4',
        theyEn: 'I think they open at ten. Maybe ten thirty on Sundays.',
        theyZh: '我想他們十點開，禮拜天可能十點半。',
        choices: [
          { en: 'Great, thank you so much for your help!', zh: '太好了，非常感謝你的幫忙！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒問三件你在美國真的會想問的事：地點、時間、價錢各一個。',
    hints: ['Where can I find ___?', 'What time does ___ open?', 'How much is ___?'],
  },
  youtube: {
    label: '想多聽一點：問路的常用說法',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=asking%20for%20directions',
  },
}
