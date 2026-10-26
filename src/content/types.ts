/** 一句核心句型。id 要全域唯一，間隔複習靠它追蹤。 */
export type Phrase = {
  id: string
  en: string
  zh: string
  /** 什麼時候用得上，用白話寫 */
  note?: string
}

export type Speaker = 'them' | 'you'

export type DialogueLine = {
  who: Speaker
  en: string
  zh: string
}

/** 盲聽之後的理解題。題目與選項都用中文，確認「聽懂意思」而非「聽寫單字」。 */
export type ListeningQuiz = {
  q: string
  options: string[]
  answer: number
}

export type RoleplayChoice = {
  en: string
  zh: string
  /** 對方聽到這句之後的回應；null 代表對話到此順利結束 */
  next: string | null
}

export type RoleplayNode = {
  id: string
  theyEn: string
  theyZh: string
  choices: RoleplayChoice[]
}

export type Roleplay = {
  intro: string
  start: string
  nodes: RoleplayNode[]
  /** 走完之後的收尾台詞 */
  outro: string
}

export type Day = {
  day: number
  title: string
  scene: string
  emoji: string
  /** 今天結束時她會多會做一件什麼事，用白話寫 */
  goal: string
  phrases: Phrase[]
  dialogue: { title: string; lines: DialogueLine[] }
  quiz: ListeningQuiz[]
  roleplay: Roleplay
  freeTalk: { prompt: string; hints: string[] }
  youtube?: { label: string; url: string }
}
