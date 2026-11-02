import type { Day, RoleplayChoice } from '../types'

const endingChoices: RoleplayChoice[] = [
  { en: 'I feel the same way. I almost cried.', zh: '我也有同感。我差點哭出來。', next: 'n4' },
  { en: "I'm not sure I agree. I think it was hopeful.", zh: '我不太確定我同意。我覺得結局是充滿希望的。', next: 'n4-disagree' },
  { en: 'Really? What do you mean?', zh: '真的嗎？你的意思是？', next: 'n3-mean' },
]

const firstShowChoices: RoleplayChoice[] = [
  { en: "Yes, it was. I'll never forget it.", zh: '對，是第一次。我永遠不會忘記。', next: 'n5' },
  { en: "Yes! In my opinion, it's a must-see in New York.", zh: '對！我覺得這是來紐約必看的。', next: 'n5' },
  { en: 'No, I saw a musical in Taipei once, but this was much bigger!', zh: '不是，我在台北看過一次音樂劇，但這次規模大多了！', next: 'n5' },
]

export const day20: Day = {
  day: 20,
  title: '表達意見',
  scene: '百老匯劇院散場',
  emoji: '🎭',
  goal: '用 I think、In my opinion 說出看法；同意或溫和地不同意都說得出口。',
  phrases: [
    { id: 'd20-1', en: 'I think it was amazing.', zh: '我覺得很棒。', note: '說看法最簡單的開頭就是 I think。' },
    { id: 'd20-2', en: 'In my opinion, the music was the best part.', zh: '我覺得音樂是最棒的部分。', note: 'In my opinion 比 I think 正式一點點，意思一樣。' },
    { id: 'd20-3', en: 'I feel the same way.', zh: '我也有同感。', note: '同意對方時用，比只說 Me too 更完整。' },
    { id: 'd20-4', en: "I'm not sure I agree.", zh: '我不太確定我同意。', note: '不同意的溫和說法，不會讓氣氛變僵。' },
    { id: 'd20-5', en: 'What did you think?', zh: '你覺得怎麼樣？', note: '說完自己的看法，用這句把話題丟回去。' },
  ],
  dialogue: {
    title: '百老匯散場，隔壁的人問你感想',
    lines: [
      { who: 'them', en: 'Wow, that was something! What did you think?', zh: '哇，太精采了！你覺得怎麼樣？' },
      { who: 'you', en: 'I think it was amazing. In my opinion, the music was the best part.', zh: '我覺得很棒。我覺得音樂是最棒的部分。' },
      { who: 'them', en: "I feel the same way. But the story was a little long, don't you think?", zh: '我也有同感。不過故事有點長，你不覺得嗎？' },
      { who: 'you', en: "I'm not sure I agree. I liked every part.", zh: '我不太確定我同意。我每一段都很喜歡。' },
      { who: 'them', en: 'Fair enough! Was it your first Broadway show?', zh: '也是啦！這是你第一次看百老匯嗎？' },
      { who: 'you', en: "Yes, it was. I'll never forget it.", zh: '對，是第一次。我永遠不會忘記。' },
    ],
  },
  quiz: [
    {
      q: '你覺得哪個部分最棒？',
      options: ['服裝', '音樂', '演員'],
      answer: 1,
    },
    {
      q: '對方覺得哪裡不太好？',
      options: ['故事有點長', '座位太擠', '票太貴'],
      answer: 0,
    },
  ],
  roleplay: {
    intro: '你剛看完百老匯音樂劇，隔壁座位的人轉過來問你的感想。說說你的看法——同意或不同意都可以。',
    start: 'n1',
    outro: '你說出了自己的看法，還能溫和地表達不同意見。表達意見不需要很難的英文，I think 就夠了。',
    nodes: [
      {
        id: 'n1',
        theyEn: "That was incredible, wasn't it? What did you think?",
        theyZh: '太精采了，對吧？你覺得怎麼樣？',
        choices: [
          { en: 'I think it was amazing. The music was the best part.', zh: '我覺得很棒。音樂是最棒的部分。', next: 'n2-music' },
          { en: 'It was good, but a little long for me.', zh: '很好看，但對我來說有點長。', next: 'n2-long' },
          { en: 'I loved the costumes. They were so colorful.', zh: '我很愛那些服裝，顏色好繽紛。', next: 'n2-costume' },
          { en: "Honestly, I didn't understand everything. It was so fast!", zh: '老實說，我沒有全部聽懂。講好快！', next: 'n2-fast' },
        ],
      },
      {
        id: 'n2-music',
        theyEn: 'I feel the same way! I thought the ending was a little sad, though.',
        theyZh: '我也有同感！不過我覺得結局有點悲傷。',
        choices: endingChoices,
      },
      {
        id: 'n2-long',
        theyEn: 'Ha, I agree. My legs were tired! I thought the ending was a little sad, though.',
        theyZh: '哈，我同意，我腿都坐痠了！不過我覺得結局有點悲傷。',
        choices: endingChoices,
      },
      {
        id: 'n2-costume',
        theyEn: 'Me too! I want that red dress. I thought the ending was a little sad, though.',
        theyZh: '我也是！我想要那件紅洋裝。不過我覺得結局有點悲傷。',
        choices: endingChoices,
      },
      {
        id: 'n2-fast',
        theyEn: "That's okay, even I missed some lines! I thought the ending was a little sad, though.",
        theyZh: '沒關係，連我都漏聽了幾句！不過我覺得結局有點悲傷。',
        choices: endingChoices,
      },
      {
        id: 'n3-mean',
        theyEn: 'The main character lost everything, you know?',
        theyZh: '主角失去了一切，你懂嗎？',
        choices: [
          { en: "Oh, I see. That's true.", zh: '喔，懂了。真的是這樣。', next: 'n4' },
          { en: 'Maybe, but I think she was happy in the end.', zh: '也許吧，但我覺得她最後是快樂的。', next: 'n4-disagree' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Was this your first Broadway show?',
        theyZh: '這是你第一次看百老匯嗎？',
        choices: firstShowChoices,
      },
      {
        id: 'n4-disagree',
        theyEn: "Hmm, that's a good point. I didn't think of it that way. Was this your first Broadway show?",
        theyZh: '嗯，有道理。我沒那樣想過。這是你第一次看百老匯嗎？',
        choices: firstShowChoices,
      },
      {
        id: 'n5',
        theyEn: "That's so special! Which show are you seeing next?",
        theyZh: '那很特別耶！你下一場要看什麼？',
        choices: [
          { en: "I'm not sure. What do you recommend?", zh: '還不確定。你推薦什麼？', next: 'n6-rec' },
          { en: 'Maybe none. Tickets are so expensive!', zh: '可能不看了，票好貴！', next: 'n6-money' },
          { en: 'I want to see The Lion King. Have you seen it?', zh: '我想看《獅子王》。你看過嗎？', next: 'n6-lion' },
        ],
      },
      {
        id: 'n6-rec',
        theyEn: 'The Lion King. Everyone loves it.',
        theyZh: '《獅子王》，大家都很愛。',
        choices: [
          { en: "Great, I'll check it out. Thanks!", zh: '太好了，我會去看看。謝謝！', next: null },
        ],
      },
      {
        id: 'n6-money',
        theyEn: 'I know! Try the TKTS booth in Times Square. Tickets are cheaper there.',
        theyZh: '對啊！去時代廣場的 TKTS 售票亭看看，那裡的票比較便宜。',
        choices: [
          { en: "Really? That's good to know. Thanks!", zh: '真的嗎？好實用。謝謝！', next: null },
          { en: 'TKTS? Could you write that down?', zh: 'TKTS？可以幫我寫下來嗎？', next: 'n6-write' },
        ],
      },
      {
        id: 'n6-write',
        theyEn: 'Sure — T-K-T-S. Enjoy the rest of your trip!',
        theyZh: '好啊——T-K-T-S。祝你接下來玩得開心！',
        choices: [
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n6-lion',
        theyEn: "Yes! You'll love it.",
        theyZh: '看過！你會很喜歡的。',
        choices: [
          { en: 'Great! It was nice talking to you.', zh: '太好了！很高興跟你聊天。', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '用 30 秒說說你最近看過的一部電影或劇：你覺得怎樣、最喜歡哪個部分，最後問對方的看法。',
    hints: ['I think ___.', 'In my opinion, the best part was ___.', 'What did you think?'],
  },
  youtube: {
    label: '想多聽一點：表達意見的說法',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=opinion',
  },
}
