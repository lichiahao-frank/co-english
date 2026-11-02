import type { Day, RoleplayChoice } from '../types'

const twFoodChoices: RoleplayChoice[] = [
  { en: 'You should try beef noodle soup.', zh: '你應該試試牛肉麵。', next: 'n4-beef' },
  { en: "Bubble tea! It's from Taiwan.", zh: '珍珠奶茶！它是台灣來的。', next: 'n4-tea' },
  { en: 'Night market food, like green onion pancakes.', zh: '夜市小吃，像是蔥油餅。', next: 'n4-night' },
  { en: "Braised pork rice. It's simple, but so good.", zh: '滷肉飯。很簡單，但超好吃。', next: 'n4-pork' },
]

const spicyChoices: RoleplayChoice[] = [
  { en: 'I love it! The spicier, the better.', zh: '超愛！越辣越好。', next: 'n6-love' },
  { en: "I'm not a big fan of spicy food.", zh: '我不太愛吃辣。', next: 'n6-mild' },
  { en: 'A little is okay. How about you?', zh: '一點點可以。你呢？', next: 'n6-ask' },
]

const byeChoices: RoleplayChoice[] = [
  { en: 'Ha! Enjoy your lunch!', zh: '哈！午餐吃得開心！', next: null },
  { en: 'It was nice talking to you. Enjoy!', zh: '很高興跟你聊天。好好享用！', next: null },
]

export const day19: Day = {
  day: 19,
  title: '美食與文化',
  scene: '紐約的美食街',
  emoji: '🧋',
  goal: '介紹台灣的食物，用「有點像……」讓沒吃過的人聽懂；也問問對方的口味。',
  phrases: [
    { id: 'd19-1', en: 'Have you tried Taiwanese food?', zh: '你吃過台灣菜嗎？', note: '外國人聊到食物時很愛問這個。你也可以主動問。' },
    { id: 'd19-2', en: 'You should try beef noodle soup.', zh: '你應該試試牛肉麵。', note: '推薦東西就用 You should try ___。' },
    { id: 'd19-3', en: "It's a little like ramen, but the soup is different.", zh: '有點像拉麵，但湯不一樣。', note: '對方沒吃過時，拿他熟悉的東西來比較，一下就懂了。' },
    { id: 'd19-4', en: 'Do you like spicy food?', zh: '你喜歡吃辣嗎？', note: 'spicy 是「辣」。hot 也可以是辣，但容易跟「燙」搞混。' },
    { id: 'd19-5', en: "I'm not a big fan of spicy food.", zh: '我不太愛吃辣。', note: '不喜歡某樣東西的委婉說法，比 I don\'t like 柔和。' },
  ],
  dialogue: {
    title: '美食街排隊時，聊起台灣菜',
    lines: [
      { who: 'you', en: 'Have you tried Taiwanese food?', zh: '你吃過台灣菜嗎？' },
      { who: 'them', en: 'No, never. What should I try?', zh: '沒有，從來沒有。我該吃什麼？' },
      { who: 'you', en: 'You should try beef noodle soup.', zh: '你應該試試牛肉麵。' },
      { who: 'them', en: "What's that like?", zh: '那是什麼樣的東西？' },
      { who: 'you', en: "It's a little like ramen, but the soup is different.", zh: '有點像拉麵，但湯不一樣。' },
      { who: 'them', en: 'Sounds good. Is it spicy?', zh: '聽起來不錯。會辣嗎？' },
      { who: 'you', en: 'It can be. Do you like spicy food?', zh: '可以做成辣的。你喜歡吃辣嗎？' },
      { who: 'them', en: 'I love it! The spicier, the better.', zh: '超愛！越辣越好。' },
    ],
  },
  quiz: [
    {
      q: '你推薦對方吃什麼？',
      options: ['滷肉飯', '牛肉麵', '小籠包'],
      answer: 1,
    },
    {
      q: '對方喜歡吃辣嗎？',
      options: ['不太愛', '很愛', '完全不能吃'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在紐約的美食街，跟一起排隊的人聊起食物。介紹台灣的味道，也問問對方喜歡吃什麼。',
    start: 'n1',
    outro: '你介紹了台灣的味道，還會用「有點像……」讓沒吃過的人聽懂。食物是全世界都聊得起來的話題。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Everything smells so good here. What are you getting?',
        theyZh: '這裡每樣都好香。你要吃什麼？',
        choices: [
          { en: "I'm getting dumplings. They remind me of home.", zh: '我要吃水餃，讓我想到家。', next: 'n2-home' },
          { en: "I'm not sure yet. What do you recommend?", zh: '還不確定。你推薦什麼？', next: 'n2-rec' },
          { en: 'Pizza! When in New York, right?', zh: '披薩！來紐約就要吃這個，對吧？', next: 'n2-pizza' },
        ],
      },
      {
        id: 'n2-home',
        theyEn: "Oh, where's home?",
        theyZh: '喔，你家在哪裡？',
        choices: [
          { en: 'Taiwan. Have you tried Taiwanese food?', zh: '台灣。你吃過台灣菜嗎？', next: 'n3' },
          { en: "Taiwan. We have amazing dumplings there.", zh: '台灣。我們那裡的水餃超好吃。', next: 'n3-dumpling' },
        ],
      },
      {
        id: 'n2-rec',
        theyEn: 'The pizza here is amazing. Classic New York! Where are you from?',
        theyZh: '這裡的披薩超讚，經典紐約味！你從哪裡來？',
        choices: [
          { en: "I'm from Taiwan. Have you tried Taiwanese food?", zh: '我來自台灣。你吃過台灣菜嗎？', next: 'n3' },
          { en: "Taiwan. Then I'll try the pizza!", zh: '台灣。那我來試試披薩！', next: 'n3-pizza' },
        ],
      },
      {
        id: 'n2-pizza',
        theyEn: 'Ha, exactly! Where are you from?',
        theyZh: '哈，沒錯！你從哪裡來？',
        choices: [
          { en: 'Taiwan. Have you tried Taiwanese food?', zh: '台灣。你吃過台灣菜嗎？', next: 'n3' },
          { en: "I'm from Taiwan. The food there is amazing too!", zh: '我來自台灣，那裡的食物也超棒！', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: "No, never! What should I try?",
        theyZh: '沒有，從來沒有！我該吃什麼？',
        choices: twFoodChoices,
      },
      {
        id: 'n3-dumpling',
        theyEn: "Really? I've never been to Taiwan. What else should I try there?",
        theyZh: '真的？我沒去過台灣。那裡還有什麼該吃的？',
        choices: twFoodChoices,
      },
      {
        id: 'n3-pizza',
        theyEn: "Good choice! I've never tried Taiwanese food. What should I try?",
        theyZh: '選得好！我從來沒吃過台灣菜。我該吃什麼？',
        choices: twFoodChoices,
      },
      {
        id: 'n4-beef',
        theyEn: "What's that like?",
        theyZh: '那是什麼樣的東西？',
        choices: [
          { en: "It's a little like ramen, but the soup is different.", zh: '有點像拉麵，但湯不一樣。', next: 'n5' },
          { en: "Beef, noodles, and a rich soup. It's my favorite.", zh: '牛肉、麵，還有很濃的湯。我最愛的。', next: 'n5' },
        ],
      },
      {
        id: 'n4-tea',
        theyEn: 'No way! I drink it every week!',
        theyZh: '不會吧！我每個禮拜都喝！',
        choices: [
          { en: "Now you know where it's from!", zh: '現在你知道它從哪來了！', next: 'n5' },
        ],
      },
      {
        id: 'n4-night',
        theyEn: 'Green onion pancakes? What are those?',
        theyZh: '蔥油餅？那是什麼？',
        choices: [
          { en: "They're like a thin, crispy bread with green onions.", zh: '有點像加了蔥的薄脆麵餅。', next: 'n5' },
        ],
      },
      {
        id: 'n4-pork',
        theyEn: "Braised pork? What's that?",
        theyZh: '滷肉？那是什麼？',
        choices: [
          { en: 'Pork cooked slowly in soy sauce, on rice.', zh: '用醬油慢慢燉的豬肉，放在白飯上。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'That sounds delicious. I need to find a Taiwanese place here! Do you like spicy food?',
        theyZh: '聽起來好好吃。我要在這裡找家台灣餐廳！你喜歡吃辣嗎？',
        choices: spicyChoices,
      },
      {
        id: 'n6-love',
        theyEn: 'Me too! Then you should try the Thai place over there.',
        theyZh: '我也是！那你該試試那邊的泰國菜。',
        choices: byeChoices,
      },
      {
        id: 'n6-mild',
        theyEn: "No problem. The pizza here isn't spicy at all!",
        theyZh: '沒問題。這裡的披薩一點都不辣！',
        choices: byeChoices,
      },
      {
        id: 'n6-ask',
        theyEn: 'I love it! I put hot sauce on everything.',
        theyZh: '我超愛！我什麼都加辣醬。',
        choices: byeChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒介紹一道你最愛的台灣食物：叫什麼、有點像什麼、為什麼喜歡，最後問對方一個問題。',
    hints: ['You should try ___.', "It's a little like ___, but ___.", 'Do you like ___?'],
  },
  youtube: {
    label: '想多聽一點：聊食物的說法',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=food',
  },
}
