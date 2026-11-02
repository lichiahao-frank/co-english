import type { Day, RoleplayChoice } from '../types'

const passportChoices: RoleplayChoice[] = [
  { en: 'Here you go.', zh: '在這裡。', next: 'n2' },
  { en: 'Sure, one second.', zh: '好，等我一下。', next: 'n2' },
]

const packChoices: RoleplayChoice[] = [
  { en: 'Yes, I packed it myself.', zh: '對，是我自己打包的。', next: 'n5' },
  { en: 'Yes, I did.', zh: '對，是我。', next: 'n5' },
  { en: 'Sorry, could you say that again?', zh: '不好意思，可以再說一次嗎？', next: 'n4-repeat' },
]

const endChoices: RoleplayChoice[] = [
  { en: 'Thank you so much for your help!', zh: '非常謝謝你的幫忙！', next: null },
  { en: 'Great. Have a nice day!', zh: '太好了。祝你有美好的一天！', next: null },
]

export const day22: Day = {
  day: 22,
  title: '機場報到：行李出狀況',
  scene: '波士頓機場報到櫃檯',
  emoji: '🛫',
  goal: '報到時遇到行李超重、行動電源、轉機行李，都能問清楚、處理好。',
  phrases: [
    { id: 'd22-1', en: 'How much is it for the extra weight?', zh: '超重的部分要付多少錢？', note: '行李超重時先問價錢，再決定要付錢還是拿東西出來。' },
    { id: 'd22-2', en: 'Can I move some things to my carry-on?', zh: '我可以把一些東西移到隨身行李嗎？', note: '最省錢的辦法。carry-on 就是帶上飛機的隨身行李。' },
    { id: 'd22-3', en: 'Yes, I packed it myself.', zh: '對，是我自己打包的。', note: '地勤常問 Did you pack this bag yourself? 這是安全規定，照實回答就好。' },
    { id: 'd22-4', en: "There's a power bank in my bag.", zh: '我的包包裡有行動電源。', note: '行動電源不能托運，一定要放隨身行李。' },
    { id: 'd22-5', en: 'Is my bag checked all the way to Taipei?', zh: '我的行李會直掛到台北嗎？', note: '要轉機時一定要問，才知道中途要不要自己領行李。' },
  ],
  dialogue: {
    title: '報到時，行李超重了',
    lines: [
      { who: 'them', en: "Your bag is three kilos over the limit.", zh: '你的行李超重了三公斤。' },
      { who: 'you', en: 'How much is it for the extra weight?', zh: '超重的部分要付多少錢？' },
      { who: 'them', en: "It's a hundred dollars.", zh: '一百美金。' },
      { who: 'you', en: 'Can I move some things to my carry-on?', zh: '我可以把一些東西移到隨身行李嗎？' },
      { who: 'them', en: 'Sure, go ahead. Are there any power banks in this bag?', zh: '可以，請便。這件行李裡有行動電源嗎？' },
      { who: 'you', en: "Oh, yes. There's a power bank in my bag.", zh: '喔，有。我的包包裡有行動電源。' },
      { who: 'them', en: "You'll need to take it out and carry it with you.", zh: '你要把它拿出來，隨身帶著。' },
      { who: 'you', en: 'Okay. Is my bag checked all the way to Taipei?', zh: '好的。我的行李會直掛到台北嗎？' },
      { who: 'them', en: "Yes. You won't need to pick it up in San Francisco.", zh: '會。你在舊金山不用領行李。' },
    ],
  },
  quiz: [
    {
      q: '超重的部分要付多少錢？',
      options: ['50 美金', '100 美金', '150 美金'],
      answer: 1,
    },
    {
      q: '行動電源要怎麼處理？',
      options: ['留在托運行李裡', '拿出來隨身帶', '交給地勤保管'],
      answer: 1,
    },
  ],
  roleplay: {
    intro: '第四週開始，全是真實情境。你在波士頓機場報到，要經過舊金山飛回台北，但行李好像有點狀況。這次盡量不看中文。',
    start: 'n1',
    outro: '超重、行動電源、轉機行李，這些都是真的會遇到的狀況，你一個一個處理好了。',
    nodes: [
      {
        id: 'n1',
        theyEn: 'Hi! Where are you flying to today?',
        theyZh: '嗨！今天要飛去哪裡？',
        choices: [
          { en: "To Taipei, through San Francisco. Here's my passport.", zh: '台北，在舊金山轉機。這是我的護照。', next: 'n2' },
          { en: "I'm going home to Taipei. I have one bag to check.", zh: '我要回台北。我有一件行李要托運。', next: 'n1-pass' },
          { en: "Taipei. Sorry, I'm a little early. Is that okay?", zh: '台北。不好意思，我有點早到。這樣可以嗎？', next: 'n1-early' },
        ],
      },
      {
        id: 'n1-pass',
        theyEn: 'Great. Can I see your passport?',
        theyZh: '好的。可以看一下你的護照嗎？',
        choices: passportChoices,
      },
      {
        id: 'n1-early',
        theyEn: 'No problem at all. Can I see your passport?',
        theyZh: '完全沒問題。可以看一下你的護照嗎？',
        choices: passportChoices,
      },
      {
        id: 'n2',
        theyEn: "Thank you. Please put your bag on the scale... Hmm, it's three kilos over the limit.",
        theyZh: '謝謝。請把行李放上磅秤……嗯，超重三公斤。',
        choices: [
          { en: 'How much is it for the extra weight?', zh: '超重的部分要付多少錢？', next: 'n3-pay' },
          { en: 'Can I move some things to my carry-on?', zh: '我可以把一些東西移到隨身行李嗎？', next: 'n3-move' },
          { en: 'Sorry, what does that mean?', zh: '不好意思，那是什麼意思？', next: 'n3-mean' },
        ],
      },
      {
        id: 'n3-mean',
        theyEn: 'Your bag is too heavy. The limit is twenty-three kilos.',
        theyZh: '你的行李太重了。上限是二十三公斤。',
        choices: [
          { en: 'Oh, I see. Can I move some things to my carry-on?', zh: '喔，懂了。我可以把一些東西移到隨身行李嗎？', next: 'n3-move' },
          { en: 'How much is it for the extra weight?', zh: '超重的部分要付多少錢？', next: 'n3-pay' },
        ],
      },
      {
        id: 'n3-pay',
        theyEn: "It's a hundred dollars.",
        theyZh: '一百美金。',
        choices: [
          { en: "Okay, I'll pay.", zh: '好，我付。', next: 'n4' },
          { en: "That's a lot. Can I move some things to my carry-on?", zh: '好多錢。我可以把一些東西移到隨身行李嗎？', next: 'n3-move' },
        ],
      },
      {
        id: 'n3-move',
        theyEn: 'Sure, go ahead. Take your time.',
        theyZh: '可以，請便。慢慢來。',
        choices: [
          { en: 'Thank you... Okay, how about now?', zh: '謝謝……好了，現在呢？', next: 'n3-ok' },
        ],
      },
      {
        id: 'n3-ok',
        theyEn: "Twenty-two kilos. Perfect, that's fine now. Did you pack this bag yourself?",
        theyZh: '二十二公斤。很好，現在沒問題了。這件行李是你自己打包的嗎？',
        choices: packChoices,
      },
      {
        id: 'n4',
        theyEn: 'Okay, all paid. Did you pack this bag yourself?',
        theyZh: '好，付好了。這件行李是你自己打包的嗎？',
        choices: packChoices,
      },
      {
        id: 'n4-repeat',
        theyEn: 'Did you put everything in the bag yourself?',
        theyZh: '包包裡的東西都是你自己放的嗎？',
        choices: [
          { en: 'Yes, I did.', zh: '對，是我自己放的。', next: 'n5' },
        ],
      },
      {
        id: 'n5',
        theyEn: 'Are there any batteries or power banks in your checked bag?',
        theyZh: '托運行李裡有電池或行動電源嗎？',
        choices: [
          { en: "Oh, yes. There's a power bank in my bag.", zh: '喔，有。我的包包裡有行動電源。', next: 'n5-power' },
          { en: "No, they're all in my carry-on.", zh: '沒有，都在我的隨身行李裡。', next: 'n6' },
          { en: "What's a power bank?", zh: '什麼是 power bank？', next: 'n5-what' },
        ],
      },
      {
        id: 'n5-what',
        theyEn: 'A portable charger for your phone.',
        theyZh: '就是可以帶著走的手機充電器。',
        choices: [
          { en: "Oh! Yes, there's one in my bag.", zh: '喔！有，我包包裡有一個。', next: 'n5-power' },
          { en: "No, I don't have one in there.", zh: '沒有，裡面沒有。', next: 'n6' },
        ],
      },
      {
        id: 'n5-power',
        theyEn: "You'll need to take it out and carry it with you.",
        theyZh: '你要把它拿出來，隨身帶著。',
        choices: [
          { en: "Okay, I'll take it out now.", zh: '好，我現在拿出來。', next: 'n6' },
          { en: "Do you mean it can't go in my suitcase?", zh: '你是說它不能放在行李箱裡嗎？', next: 'n5-mean' },
        ],
      },
      {
        id: 'n5-mean',
        theyEn: "That's right. Power banks have to stay in your carry-on.",
        theyZh: '沒錯。行動電源一定要放在隨身行李。',
        choices: [
          { en: "Got it. I'll take it out.", zh: '懂了。我拿出來。', next: 'n6' },
        ],
      },
      {
        id: 'n6',
        theyEn: "Great. You're all set. You have two hours to connect in San Francisco.",
        theyZh: '好的，都辦好了。你在舊金山有兩個小時轉機。',
        choices: [
          { en: 'Is my bag checked all the way to Taipei?', zh: '我的行李會直掛到台北嗎？', next: 'n7-bag' },
          { en: 'Two hours. Is that enough time?', zh: '兩個小時，時間夠嗎？', next: 'n7-time' },
          { en: 'Could I get an aisle seat for the long flight?', zh: '長程那段可以給我走道的位子嗎？', next: 'n7-seat' },
        ],
      },
      {
        id: 'n7-bag',
        theyEn: "Yes. You won't need to pick it up in San Francisco.",
        theyZh: '會。你在舊金山不用領行李。',
        choices: endChoices,
      },
      {
        id: 'n7-time',
        theyEn: "Yes, that's plenty of time. Just follow the signs for International Departures.",
        theyZh: '夠，時間很充裕。跟著「國際出發」的指標走就好。',
        choices: endChoices,
      },
      {
        id: 'n7-seat',
        theyEn: 'Let me see... Yes, I have 41C on the aisle.',
        theyZh: '我看看……有，41C 靠走道。',
        choices: endChoices,
      },
    ],
  },
  freeTalk: {
    prompt: '假裝你的行李超重了：用 30 秒跟地勤溝通，問要付多少錢，或問能不能把東西移出來，最後確認行李會不會直掛。',
    hints: ['How much is it for ___?', 'Can I move some things to ___?', 'Is my bag checked all the way to ___?'],
  },
  youtube: {
    label: '想多聽一點：機場報到的各種狀況',
    url: 'https://www.youtube.com/@voalearningenglish/search?query=airport',
  },
}
