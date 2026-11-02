import type { Day, RoleplayChoice } from '../types'

const explainChoices: RoleplayChoice[] = [
  { en: 'We make products that help doctors.', zh: '我們做幫助醫生的產品。', next: 'n3' },
  { en: 'You know the machines in hospitals? Things like that.', zh: '你知道醫院裡那些機器嗎？就是那類的東西。', next: 'n3-machine' },
  { en: 'Let me think... We help hospitals take care of patients.', zh: '我想一下……我們幫助醫院照顧病人。', next: 'n3' },
]

const likeChoices: RoleplayChoice[] = [
  { en: "It's busy, but I like it.", zh: '很忙，但我喜歡。', next: 'n4' },
  { en: 'Yes! I really like my coworkers.', zh: '喜歡！我很喜歡我的同事。', next: 'n4' },
  { en: 'Sometimes! It can be stressful. How about you?', zh: '有時候！壓力有點大。你呢？', next: 'n4-ask' },
]

const freeChoices: RoleplayChoice[] = [
  { en: 'On weekends, I usually relax at home.', zh: '週末我通常在家放鬆。', next: 'n5-home' },
  { en: 'I like going to the movies with friends.', zh: '我喜歡跟朋友去看電影。', next: 'n5-movie' },
  { en: 'I go hiking. Taiwan has beautiful mountains.', zh: '我會去爬山。台灣的山很美。', next: 'n5-hike' },
]

export const day17: Day = {
  day: 17,
  title: '工作與生活',
  scene: '紐約的咖啡店併桌',
  emoji: '💼',
  goal: '用簡單的英文介紹工作；對方聽不懂時，換個更簡單的說法。',
  phrases: [
    { id: 'd17-1', en: 'What do you do for a living?', zh: '你是做什麼工作的？', note: '比 What is your job? 更自然。對方問你，你也可以這樣反問。' },
    { id: 'd17-2', en: 'We make products that help doctors.', zh: '我們做幫助醫生的產品。', note: '對方聽不懂專業名詞時，用「做什麼、幫助誰」來解釋。照你公司的實際情況換掉。' },
    { id: 'd17-3', en: "I've worked there for five years.", zh: '我在那裡工作五年了。', note: '數字換成你真正的年資。I\'ve worked ... for ___ 是「做了多久」。' },
    { id: 'd17-4', en: "It's busy, but I like it.", zh: '很忙，但我喜歡。', note: '回答「喜不喜歡工作」最萬用的一句。' },
    { id: 'd17-5', en: 'On weekends, I usually relax at home.', zh: '週末我通常在家放鬆。', note: 'usually 用來說習慣。relax at home 換成你週末真正做的事。' },
  ],
  dialogue: {
    title: '咖啡店裡，併桌的人問起你的工作',
    lines: [
      { who: 'them', en: 'So, what do you do for a living?', zh: '那你是做什麼工作的？' },
      { who: 'you', en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。' },
      { who: 'them', en: 'Oh, what does that mean exactly?', zh: '喔，那具體是做什麼？' },
      { who: 'you', en: 'We make products that help doctors.', zh: '我們做幫助醫生的產品。' },
      { who: 'them', en: 'That sounds important! Do you like it?', zh: '聽起來很重要！你喜歡嗎？' },
      { who: 'you', en: "It's busy, but I like it. I've worked there for five years.", zh: '很忙，但我喜歡。我在那裡工作五年了。' },
      { who: 'them', en: 'And what do you do on weekends?', zh: '那你週末都做什麼？' },
      { who: 'you', en: 'On weekends, I usually relax at home, or go out with friends.', zh: '週末我通常在家放鬆，或跟朋友出去。' },
    ],
  },
  quiz: [
    {
      q: '對方聽不懂時，你怎麼解釋你的工作？',
      options: ['我們做幫助醫生的產品', '我們在醫院看病', '我們在藥局賣藥'],
      answer: 0,
    },
    {
      q: '你覺得你的工作怎麼樣？',
      options: ['很輕鬆', '很忙，但我喜歡', '很無聊'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你在紐約的咖啡店跟一位當地人併桌，他問起你的工作和生活。用簡單的英文解釋就好，不用完美。',
    start: 'n1',
    outro: '工作是外國人最常問的問題之一。你用簡單的英文就解釋清楚了：不用專業術語，對方聽得懂最重要。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'So, what do you do for a living?',
        theyZh: '那你是做什麼工作的？',
        choices: [
          { en: 'I work in the medical device industry.', zh: '我在醫療器材產業工作。', next: 'n2' },
          { en: 'I work in healthcare. How about you?', zh: '我在醫療相關的領域工作。你呢？', next: 'n2-ask' },
          { en: "It's a little hard to explain in English!", zh: '用英文有點難解釋！', next: 'n2-hard' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Oh, interesting. What does that mean exactly?',
        theyZh: '喔，有意思。那具體是做什麼？',
        choices: explainChoices,
      },
      {
        id: 'n2-ask',
        theyEn: "I'm a teacher. I teach high school math. So what do you do in healthcare?",
        theyZh: '我是老師，教高中數學。那你在醫療領域做什麼？',
        choices: explainChoices,
      },
      {
        id: 'n2-hard',
        theyEn: "That's okay, take your time. Just the simple version!",
        theyZh: '沒關係，慢慢來。說簡單的版本就好！',
        choices: explainChoices,
      },
      {
        id: 'n3',
        theyEn: 'That sounds important! Do you like your job?',
        theyZh: '聽起來很重要！你喜歡你的工作嗎？',
        choices: likeChoices,
      },
      {
        id: 'n3-machine',
        theyEn: 'Oh, I see! Like X-ray machines? Cool. Do you like your job?',
        theyZh: '喔，懂了！像 X 光機那種？很酷。你喜歡你的工作嗎？',
        choices: likeChoices,
      },
      {
        id: 'n4',
        theyEn: "That's the best kind of job. What do you do when you're not working?",
        theyZh: '那是最好的那種工作。你不工作的時候都做什麼？',
        choices: freeChoices,
      },
      {
        id: 'n4-ask',
        theyEn: "Ha, I know that feeling. Teaching is tiring too! What do you do when you're not working?",
        theyZh: '哈，我懂那種感覺。教書也很累！你不工作的時候都做什麼？',
        choices: freeChoices,
      },
      {
        id: 'n5-home',
        theyEn: 'Same here. Movies and snacks on the sofa, right?',
        theyZh: '我也是。窩在沙發看電影吃零食，對吧？',
        choices: [
          { en: 'Exactly!', zh: '沒錯！', next: null },
          { en: 'Ha, yes! And sometimes I cook.', zh: '哈，對！有時候我也會下廚。', next: null },
        ],
      },
      {
        id: 'n5-movie',
        theyEn: 'Have you seen any good movies lately?',
        theyZh: '最近有看到什麼好電影嗎？',
        choices: [
          { en: 'Not lately. Do you have any recommendations?', zh: '最近沒有。你有推薦的嗎？', next: 'n6-rec' },
          { en: 'Not really. I usually watch Taiwanese dramas.', zh: '沒有耶。我通常看台劇。', next: 'n6-drama' },
        ],
      },
      {
        id: 'n6-rec',
        theyEn: "Anything by Pixar. You can't go wrong!",
        theyZh: '皮克斯的都可以，不會踩雷！',
        choices: [
          { en: "Thanks, I'll check it out!", zh: '謝謝，我會去看看！', next: null },
        ],
      },
      {
        id: 'n6-drama',
        theyEn: "Oh, I'd love to try one sometime!",
        theyZh: '喔，我很想找一部來看看！',
        choices: [
          { en: "I'll send you a good one!", zh: '我傳一部好看的給你！', next: null },
        ],
      },
      {
        id: 'n5-hike',
        theyEn: "Really? I didn't know that! I'd love to see them someday.",
        theyZh: '真的嗎？我都不知道！有一天我很想去看看。',
        choices: [
          { en: 'You should visit! It was nice talking to you.', zh: '你該來玩！很高興跟你聊天。', next: null },
          { en: 'I can show you some photos!', zh: '我可以給你看一些照片！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒介紹你的工作：做什麼、用簡單的話解釋、喜不喜歡。卡住的時候，就換一個更簡單的說法。',
    hints: ['I work in ___.', 'We ___ that help ___.', "It's busy, but I like it."],
  },
  youtube: {
    label: '想多聽一點：怎麼聊工作',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=talk%20about%20your%20job',
  },
}
