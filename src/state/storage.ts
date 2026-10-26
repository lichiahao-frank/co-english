/**
 * 本機儲存。進度放 localStorage（小、同步讀取），錄音放 IndexedDB（大、非同步）。
 * 兩者都包 try/catch：無痕模式或關閉儲存時要能照常使用，只是不保留紀錄。
 */

const PROGRESS_KEY = 'bunny-english-progress-v1'
const DB_NAME = 'bunny-english'
const DB_VERSION = 1
const REC_STORE = 'recordings'

export function readJSON<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(value: unknown): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(value))
  } catch {
    /* 儲存空間滿或被停用，忽略：不影響當次練習 */
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    /* 同上 */
  }
}

/* ---------- 錄音：IndexedDB ---------- */

type RecordingRow = { id: string; blob: Blob; date: string }

let dbPromise: Promise<IDBDatabase | null> | null = null

function openDB(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(REC_STORE)) {
          db.createObjectStore(REC_STORE, { keyPath: 'id' })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
  return dbPromise
}

export async function putRecording(id: string, blob: Blob, date: string): Promise<void> {
  const db = await openDB()
  if (!db) return
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(REC_STORE, 'readwrite')
      tx.objectStore(REC_STORE).put({ id, blob, date } satisfies RecordingRow)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}

export async function getRecording(id: string): Promise<Blob | null> {
  const db = await openDB()
  if (!db) return null
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(REC_STORE, 'readonly')
      const req = tx.objectStore(REC_STORE).get(id)
      req.onsuccess = () => resolve((req.result as RecordingRow | undefined)?.blob ?? null)
      req.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

/** 只保留最近 keepDays 天的錄音，舊的自動清掉，免得佔滿手機空間。 */
export async function pruneRecordings(keepDays = 7): Promise<void> {
  const db = await openDB()
  if (!db) return
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - keepDays)
  const cutoffKey = toDateKey(cutoff)
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(REC_STORE, 'readwrite')
      const store = tx.objectStore(REC_STORE)
      const req = store.openCursor()
      req.onsuccess = () => {
        const cursor = req.result
        if (!cursor) return
        const row = cursor.value as RecordingRow
        if (row.date < cutoffKey) cursor.delete()
        cursor.continue()
      }
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}

/* ---------- 日期 ---------- */

/** 一律用「本地時間」的 YYYY-MM-DD，避免跨時區把連續天數算錯。 */
export function toDateKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function daysBetween(fromKey: string, toKey: string): number {
  const [y1, m1, d1] = fromKey.split('-').map(Number)
  const [y2, m2, d2] = toKey.split('-').map(Number)
  const a = Date.UTC(y1, m1 - 1, d1)
  const b = Date.UTC(y2, m2 - 1, d2)
  return Math.round((b - a) / 86_400_000)
}
