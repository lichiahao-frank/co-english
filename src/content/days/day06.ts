import type { Day } from '../types'

export const day06: Day = {
  day: 6,
  title: '天氣與分享經驗',
  scene: '咖啡店排隊',
  emoji: '☕',
  goal: '能用天氣開啟話題，並且分享自己的經驗、反問對方。',
  phrases: [
    { id: 'd6-1', en: "It's beautiful today, isn't it?", zh: '今天天氣真好，對吧？', note: '美國人最常用的開場白，排隊、等電梯都能說。' },
    { id: 'd6-2', en: "I've been here for three days.", zh: '我來這裡三天了。', note: "I've been 很好用，換數字就行。" },
    { id: 'd6-3', en: 'Have you ever been to Taiwan?', zh: '你去過台灣嗎？', note: '反問對方，對話才會變雙向。' },
    { id: 'd6-4', en: 'I think this city is amazing.', zh: '我覺得這城市很棒。', note: 'I think 開頭，說想法就不怕說錯。' },
    { id: 'd6-5', en: 'That sounds great!', zh: '聽起來很棒！', note: '不知道怎麼回時，這句永遠不出錯。' },
  ],
  dialogue: {
    title: '在咖啡店排隊時跟後面的人聊起來',
    lines: [
      { who: 'them', en: "It's beautiful today, isn't it?", zh: '今天天氣真好，對吧？' },
      { who: 'you', en: 'It really is. I think this city is amazing.', zh: '真的很好。我覺得這城市很棒。' },
      { who: 'them', en: 'Are you visiting?', zh: '你是來旅遊的嗎？' },
      { who: 'you', en: "Yes, I've been here for three days.", zh: '對，我來這裡三天了。' },
      { who: 'them', en: 'Nice! Where are you visiting from?', zh: '真好！你從哪裡來？' },
      { who: 'you', en: "I'm from Taiwan. Have you ever been to Taiwan?", zh: '我來自台灣。你去過台灣嗎？' },
      { who: 'them', en: 'I have not, but I would love to. I hear the night markets are incredible.', zh: '還沒，但我很想去。我聽說夜市很棒。' },
      { who: 'you', en: 'They are! You should go someday.', zh: '真的很棒！你有機會該去看看。' },
    ],
  },
  quiz: [
    {
      q: '說話的人來這座城市多久了？',
      options: ['三天', '一週', '一個月'],
      answer: 0,
    },
    {
      q: '對方對台灣的印象是什麼？',
      options: ['天氣很熱', '夜市很棒', '交通方便'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在咖啡店排隊，前面的人回頭跟你聊天。試著不只回答，還要反問。',
    start: 'n1',
    outro: '你做到了最難的事：不只回答，還主動把問題丟回去。這就是 small talk 的全部祕訣。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Gorgeous weather today, right?',
        theyZh: '今天天氣超棒，對吧？',
        choices: [
          { en: "It really is. I think this city is amazing.", zh: '真的很好。我覺得這城市很棒。', next: 'n2' },
          { en: 'Yes! Much warmer than I expected.', zh: '對啊！比我想的暖多了。', next: 'n2' },
          { en: 'Yes, but it is a little cold for me!', zh: '是啊，不過對我來說有點冷！', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Are you here on vacation?',
        theyZh: '你是來度假的嗎？',
        choices: [
          { en: "Yes, I've been here for three days.", zh: '對，我來這裡三天了。', next: 'n3' },
          { en: 'Yes, it is my first time here.', zh: '對，這是我第一次來。', next: 'n3' },
          { en: "Yes! I'm visiting from Taiwan.", zh: '對！我從台灣來玩的。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'That is great. What brought you here?',
        theyZh: '太好了。什麼讓你決定來這裡？',
        choices: [
          { en: 'I wanted to see the city. Have you ever been to Taiwan?', zh: '我想看看這座城市。你去過台灣嗎？', next: 'n4' },
          { en: 'Do you mean why I chose this city?', zh: '你是說我為什麼選這座城市嗎？', next: 'n3b' },
          { en: 'I really wanted to try the food here. Have you ever been to Taiwan?', zh: '我很想來吃這裡的食物。你去過台灣嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n3b',
        theyEn: 'Yes, exactly — why this city?',
        theyZh: '對，沒錯——為什麼選這座城市？',
        choices: [
          { en: 'A friend recommended it. Have you ever been to Taiwan?', zh: '朋友推薦的。你去過台灣嗎？', next: 'n4' },
          { en: 'I saw it in a movie. Have you ever been to Taiwan?', zh: '我在電影裡看過。你去過台灣嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'I have not, but it is on my list. What should I see there?',
        theyZh: '還沒，但在我的清單上。我該去看什麼？',
        choices: [
          { en: 'The night markets! The food is amazing.', zh: '夜市！食物超棒。', next: 'n5' },
          { en: 'You should try the night markets. I think you would love them.', zh: '你該去夜市，我想你會很喜歡。', next: 'n5' },
          { en: 'The people! Taiwanese people are really kind and friendly.', zh: '人！台灣人真的很友善、很親切。', next: 'n5-people' },
          { en: 'Taipei 101 — and the mountains are beautiful, too.', zh: '台北 101——還有山也很美。', next: 'n5-sights' },
          { en: 'You have to try bubble tea. It comes from Taiwan!', zh: '你一定要喝珍珠奶茶，它是台灣發明的！', next: 'n5-tea' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Night markets — I will write that down. Thanks!',
        theyZh: '夜市——我記下來。謝啦！',
        choices: [
          { en: 'That sounds great. Enjoy your coffee!', zh: '聽起來很棒。好好享受你的咖啡！', next: null },
          { en: 'I hope you visit soon. Have a nice day!', zh: '希望你很快就能去。祝你有美好的一天！', next: null },
        ],
      },
      {
        id: 'n5-people',
        theyEn: 'That is so nice to hear. Now I really want to go!',
        theyZh: '聽了真開心。現在我真的很想去了！',
        choices: [
          { en: 'You should! Enjoy your coffee!', zh: '你該去的！好好享受你的咖啡！', next: null },
          { en: 'I hope you visit soon. Have a nice day!', zh: '希望你很快就能去。祝你有美好的一天！', next: null },
        ],
      },
      {
        id: 'n5-sights',
        theyEn: 'Taipei 101 and the mountains — I will write that down. Thanks!',
        theyZh: '台北 101 和山——我記下來。謝啦！',
        choices: [
          { en: 'That sounds great. Enjoy your coffee!', zh: '聽起來很棒。好好享受你的咖啡！', next: null },
          { en: 'I hope you visit soon. Have a nice day!', zh: '希望你很快就能去。祝你有美好的一天！', next: null },
        ],
      },
      {
        id: 'n5-tea',
        theyEn: 'Bubble tea is from Taiwan? I had no idea!',
        theyZh: '珍奶是台灣來的？我完全不知道！',
        choices: [
          { en: 'Yes! The real one is even better. Enjoy your coffee!', zh: '對啊！在台灣喝更好喝。好好享受你的咖啡！', next: null },
          { en: 'I hope you visit soon. Have a nice day!', zh: '希望你很快就能去。祝你有美好的一天！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒介紹台灣的一樣東西（食物、地方、節日都可以），最後反問一個問題。',
    hints: ['In Taiwan, we have ___.', 'I think you would love it.', 'Have you ever been to ___?'],
  },
  youtube: {
    label: '想多聽一點：分享經驗的說法',
    url: 'https://www.youtube.com/@rachelsenglish/search?query=natural%20conversation',
  },
}
