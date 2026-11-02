import type { Day, RoleplayChoice } from '../types'

const doneChoices: RoleplayChoice[] = [
  { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
  { en: 'Perfect. When should I come back to board?', zh: '太好了。我什麼時候回來登機？', next: 'n6' },
]

export const day09: Day = {
  day: 9,
  title: '安檢與登機',
  scene: '安檢＋登機門',
  emoji: '🎫',
  goal: '聽懂安檢的指令；在登機門確認班機、聽懂延誤、換到想要的位子。',
  phrases: [
    { id: 'd9-1', en: 'Do I need to take my laptop out?', zh: '我需要把筆電拿出來嗎？', note: '安檢規定每個機場不一樣，不確定就問，不用猜。' },
    { id: 'd9-2', en: 'Do I need to take off my shoes?', zh: '我需要脫鞋嗎？', note: '美國國內線常常要脫鞋。Do I need to ___? 可以問任何規定。' },
    { id: 'd9-3', en: 'Is this the gate for the flight to Los Angeles?', zh: '這是飛往洛杉磯的登機門嗎？', note: '登機門偶爾會臨時更換，到了先確認一次。' },
    { id: 'd9-4', en: 'Has boarding started yet?', zh: '開始登機了嗎？', note: '廣播聽不清楚的時候，問地勤人員這句。' },
    { id: 'd9-5', en: 'Is the flight on time?', zh: '班機有準時嗎？', note: '螢幕上寫 Delayed 是延誤，On time 是準時。' },
  ],
  dialogue: {
    title: '過安檢',
    lines: [
      { who: 'them', en: 'Next, please. Put your bag and jacket in the bin.', zh: '下一位。把包包和外套放進籃子裡。' },
      { who: 'you', en: 'Do I need to take my laptop out?', zh: '我需要把筆電拿出來嗎？' },
      { who: 'them', en: 'Yes. Laptops and liquids go in a separate bin.', zh: '要。筆電和液體放另外一個籃子。' },
      { who: 'you', en: 'Okay. Do I need to take off my shoes?', zh: '好的。我需要脫鞋嗎？' },
      { who: 'them', en: 'No, you can keep them on. Step through, please. Arms up.', zh: '不用，可以穿著。請走過來。手舉高。' },
      { who: 'you', en: 'Like this?', zh: '像這樣嗎？' },
      { who: 'them', en: "Perfect. You're all set. Have a good flight.", zh: '很好。可以了。祝你飛行愉快。' },
    ],
  },
  quiz: [
    {
      q: '筆電要怎麼處理？',
      options: ['放在包包裡就好', '拿出來放另一個籃子', '交給安檢人員保管'],
      answer: 1,
    },
    {
      q: '鞋子要脫嗎？',
      options: ['要脫', '不用脫', '只有靴子要脫'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '你過完安檢，走到登機門。確認是不是這個登機門、班機有沒有延誤，看看能不能換位子。',
    start: 'n1',
    outro: '你確認了登機門，聽懂了延誤，還換到想要的位子。機場已經難不倒你了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi there. Can I help you?',
        theyZh: '嗨。需要幫忙嗎？',
        choices: [
          { en: 'Is this the gate for the flight to Los Angeles?', zh: '這是飛往洛杉磯的登機門嗎？', next: 'n2' },
          { en: 'Hi. Has boarding started yet?', zh: '嗨。開始登機了嗎？', next: 'n1-board' },
          { en: 'Is the flight to Los Angeles on time?', zh: '飛洛杉磯的班機有準時嗎？', next: 'n3' },
        ],
      },
      {
        id: 'n1-board',
        theyEn: "Not yet. Where are you flying to?",
        theyZh: '還沒。你要飛去哪裡？',
        choices: [
          { en: 'Los Angeles. Is the flight on time?', zh: '洛杉磯。班機有準時嗎？', next: 'n3' },
          { en: 'Los Angeles. Could I change my seat?', zh: '洛杉磯。我可以換位子嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Yes, it is. Flight 18 to Los Angeles.',
        theyZh: '對，是這裡。第 18 班，飛往洛杉磯。',
        choices: [
          { en: 'Great. Is the flight on time?', zh: '太好了。班機有準時嗎？', next: 'n3' },
          { en: 'Thank you. Could I change my seat?', zh: '謝謝。我可以換位子嗎？', next: 'n4' },
          { en: 'Sorry, did you say eighteen or eighty?', zh: '不好意思，你是說十八還是八十？', next: 'n2-number' },
        ],
      },
      {
        id: 'n2-number',
        theyEn: 'Eighteen — one, eight.',
        theyZh: '十八——一、八。',
        choices: [
          { en: 'Eighteen. Got it. Is the flight on time?', zh: '十八，懂了。班機有準時嗎？', next: 'n3' },
          { en: 'Eighteen. Got it. Could I change my seat?', zh: '十八，懂了。我可以換位子嗎？', next: 'n4' },
        ],
      },
      {
        id: 'n3',
        theyEn: "There's a short delay. Boarding will start at 11:10 instead of 10:40.",
        theyZh: '有一點延誤。登機時間從十點四十分改成十一點十分。',
        choices: [
          { en: 'Let me make sure I understand. Boarding is at 11:10?', zh: '讓我確認一下。改成十一點十分登機？', next: 'n3-check' },
          { en: 'Could you write that down?', zh: '可以幫我寫下來嗎？', next: 'n3-write' },
          { en: 'Okay. Could I change my seat while I wait?', zh: '好的。等的時候我可以換位子嗎？', next: 'n4' },
          { en: 'Okay, thank you.', zh: '好的，謝謝。', next: null },
        ],
      },
      {
        id: 'n3-check',
        theyEn: "That's right, 11:10.",
        theyZh: '沒錯，十一點十分。',
        choices: [
          { en: 'Thank you. Could I change my seat?', zh: '謝謝。我可以換位子嗎？', next: 'n4' },
          { en: 'Okay, thank you!', zh: '好的，謝謝！', next: null },
        ],
      },
      {
        id: 'n3-write',
        theyEn: 'Sure. Here you go — 11:10, gate B7.',
        theyZh: '好的。給你——十一點十分，B7 登機門。',
        choices: [
          { en: 'Thank you. Could I change my seat?', zh: '謝謝。我可以換位子嗎？', next: 'n4' },
          { en: 'Thank you so much!', zh: '非常謝謝你！', next: null },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Let me check. What kind of seat would you like?',
        theyZh: '我查一下。你想要什麼樣的位子？',
        choices: [
          { en: 'A window seat, if possible.', zh: '可以的話，靠窗的位子。', next: 'n5' },
          { en: 'An aisle seat, please. I get up a lot.', zh: '走道的位子，謝謝。我很常起來走動。', next: 'n5-aisle' },
          { en: 'Could I sit closer to the front?', zh: '可以坐前面一點嗎？', next: 'n5-front' },
        ],
      },
      {
        id: 'n5',
        theyEn: "I have 27A, a window seat. Here's your new boarding pass.",
        theyZh: '有 27A，靠窗。這是你的新登機證。',
        choices: doneChoices,
      },
      {
        id: 'n5-aisle',
        theyEn: "I have 32C on the aisle. Here's your new boarding pass.",
        theyZh: '有 32C，靠走道。這是你的新登機證。',
        choices: doneChoices,
      },
      {
        id: 'n5-front',
        theyEn: "I have 12A near the front. Here's your new boarding pass.",
        theyZh: '前面有 12A。這是你的新登機證。',
        choices: doneChoices,
      },
      {
        id: 'n6',
        theyEn: "We'll call your group number. You're in group 4.",
        theyZh: '我們會廣播組別。你是第 4 組。',
        choices: [
          { en: 'Group 4. Got it, thanks!', zh: '第 4 組，懂了，謝謝！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '你在登機門，用 30 秒問完三件事：這是不是你的登機門、班機有沒有準時、能不能換位子。',
    hints: ['Is this the gate for ___?', 'Is the flight on time?', 'Could I change my seat?'],
  },
  youtube: {
    label: '想多聽一點：安檢與登機的說法',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=airport%20security',
  },
}
