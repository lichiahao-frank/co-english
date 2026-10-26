import type { Day } from '../types'

export const day07: Day = {
  day: 7,
  title: '第一週驗收：混合情境',
  scene: '飯店＋餐廳',
  emoji: '🎒',
  goal: '把這週學的全部串起來：說明問題、確認理解、請人幫忙。',
  phrases: [
    { id: 'd7-1', en: 'Excuse me, I have a problem with my room.', zh: '不好意思，我的房間有點問題。', note: '先說「有問題」，對方就會接手問下去，你不用一次講完。' },
    { id: 'd7-2', en: 'Do you mean I should call the front desk?', zh: '你的意思是我應該打給櫃檯嗎？', note: '不確定時用這句確認，比猜錯好。' },
    { id: 'd7-3', en: 'Let me make sure I understand.', zh: '讓我確認一下我有沒有聽懂。', note: '講完這句再複述一次，對方會很有耐心。' },
    { id: 'd7-4', en: 'Could you write that down?', zh: '可以幫我寫下來嗎？', note: '地址、時間、號碼聽不清楚時，這句最有效。' },
    { id: 'd7-5', en: 'Thank you so much for your help.', zh: '非常謝謝你的幫忙。', note: '結束任何互動都適用。' },
  ],
  dialogue: {
    title: '房間冷氣壞了，你去櫃檯反映',
    lines: [
      { who: 'you', en: 'Excuse me, I have a problem with my room.', zh: '不好意思，我的房間有點問題。' },
      { who: 'them', en: "I'm sorry to hear that. What seems to be the issue?", zh: '很抱歉聽到這個。是什麼問題呢？' },
      { who: 'you', en: 'The air conditioning is not working.', zh: '冷氣沒有在運作。' },
      { who: 'them', en: 'I can send someone up, or we can move you to another room.', zh: '我可以派人上去，或是幫你換房。' },
      { who: 'you', en: 'Let me make sure I understand. You can change my room tonight?', zh: '讓我確認一下。你可以今晚幫我換房嗎？' },
      { who: 'them', en: 'Yes, we have a room available on the fifth floor.', zh: '是的，五樓有一間空房。' },
      { who: 'you', en: 'That would be great. Thank you so much for your help.', zh: '那太好了。非常謝謝你的幫忙。' },
    ],
  },
  quiz: [
    {
      q: '房間出了什麼問題？',
      options: ['冷氣壞了', '熱水不夠熱', '隔壁太吵'],
      answer: 0,
    },
    {
      q: '櫃檯提出了哪兩個解決方式？',
      options: ['退錢或換房', '派人修理或換房', '換房或換飯店'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '這是第一週的驗收。先去櫃檯反映房間問題，順便問晚餐去哪吃。盡量不看中文提示。',
    start: 'n1',
    outro: '你完成了第一週。你已經能自我介紹、點餐、入住、問路、閒聊，還能處理突發問題——七天前你還不敢開口。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Good evening! How can I help you?',
        theyZh: '晚安！有什麼需要幫忙的嗎？',
        choices: [
          { en: 'Excuse me, I have a problem with my room.', zh: '不好意思，我的房間有點問題。', next: 'n2' },
          { en: 'Hi, could you help me with something?', zh: '嗨，可以幫我一個忙嗎？', next: 'n2' },
        ],
      },
      {
        id: 'n2',
        theyEn: 'Of course. What is going on?',
        theyZh: '當然。發生什麼事了？',
        choices: [
          { en: 'The air conditioning is not working.', zh: '冷氣沒有在運作。', next: 'n3' },
          { en: 'The room is very noisy. I can hear people in the hallway.', zh: '房間很吵，我聽得到走廊有人說話。', next: 'n3' },
        ],
      },
      {
        id: 'n3',
        theyEn: 'I apologize. I can either send maintenance up now, or move you to a quieter room on the fifth floor.',
        theyZh: '很抱歉。我可以現在派維修人員上去，或是幫你換到五樓比較安靜的房間。',
        choices: [
          { en: 'Let me make sure I understand. You can move me tonight?', zh: '讓我確認一下。你今晚可以幫我換房嗎？', next: 'n4' },
          { en: 'Could you speak a little more slowly?', zh: '可以說慢一點嗎？', next: 'n3b' },
        ],
      },
      {
        id: 'n3b',
        theyEn: 'Sure. I can send someone to fix it... or give you a new room.',
        theyZh: '當然。我可以派人去修……或是給你一間新房間。',
        choices: [
          { en: 'A new room would be great, thank you.', zh: '換新房間就太好了，謝謝。', next: 'n4' },
        ],
      },
      {
        id: 'n4',
        theyEn: 'Absolutely. Room 512. Here is your new key.',
        theyZh: '沒問題。512 號房。這是你的新房卡。',
        choices: [
          { en: 'Thank you so much for your help. One more thing — what do you recommend for dinner?', zh: '非常謝謝你的幫忙。還有一件事——晚餐你推薦什麼？', next: 'n5' },
          { en: 'Thank you so much for your help.', zh: '非常謝謝你的幫忙。', next: null },
        ],
      },
      {
        id: 'n5',
        theyEn: 'There is a great Italian place two blocks north, on Pine Street.',
        theyZh: '往北兩個街區，Pine Street 上有一家很棒的義大利餐廳。',
        choices: [
          { en: 'Could you write that down?', zh: '可以幫我寫下來嗎？', next: 'n6' },
          { en: 'Do you mean two blocks that way?', zh: '你是說往那個方向兩個街區嗎？', next: 'n6' },
        ],
      },
      {
        id: 'n6',
        theyEn: 'Here you go. Enjoy your dinner!',
        theyZh: '給你。用餐愉快！',
        choices: [
          { en: 'Thank you so much. Have a good night!', zh: '非常謝謝。祝你有個美好的夜晚！', next: null },
        ],
      },
    ],
  },
  freeTalk: {
    prompt: '第一週最終挑戰：用 1 分鐘，不看提示，從自我介紹開始，說到你這週學會的任何一個情境。',
    hints: ["Hi, I'm ___. I'm from Taiwan.", "I'd like to check in, please.", 'What do you recommend?'],
  },
  youtube: {
    label: '想多聽一點：處理問題的說法',
    url: 'https://www.youtube.com/@SpeakEnglishWithVanessa/search?query=hotel%20problem',
  },
}
