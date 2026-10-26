/**
 * 錄音。用途是讓她「聽見自己真的說出英語了」，不是拿來評分。
 * Android Chrome 與桌面都穩定；iOS 全螢幕 PWA 有已知問題（見 README）。
 */
import { useCallback, useEffect, useRef, useState } from 'react'

const MIME_CANDIDATES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/ogg;codecs=opus',
]

export function isRecordingSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  )
}

function pickMime(): string | undefined {
  for (const m of MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported?.(m)) return m
  }
  return undefined
}

export type RecorderState = 'idle' | 'recording' | 'ready' | 'denied' | 'unsupported'

export function useRecorder() {
  const [state, setState] = useState<RecorderState>(
    isRecordingSupported() ? 'idle' : 'unsupported',
  )
  const [url, setUrl] = useState<string | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [seconds, setSeconds] = useState(0)

  const recRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<number | null>(null)
  const urlRef = useRef<string | null>(null)

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => () => {
    cleanupStream()
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
  }, [cleanupStream])

  const reset = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
    setUrl(null)
    setBlob(null)
    setSeconds(0)
    setState(isRecordingSupported() ? 'idle' : 'unsupported')
  }, [])

  const start = useCallback(async () => {
    if (!isRecordingSupported()) {
      setState('unsupported')
      return false
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const mime = pickMime()
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      rec.onstop = () => {
        const b = new Blob(chunksRef.current, { type: mime ?? 'audio/webm' })
        if (urlRef.current) URL.revokeObjectURL(urlRef.current)
        const u = URL.createObjectURL(b)
        urlRef.current = u
        setBlob(b)
        setUrl(u)
        setState('ready')
        cleanupStream()
      }

      recRef.current = rec
      rec.start()
      setState('recording')
      setSeconds(0)
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
      return true
    } catch {
      setState('denied')
      cleanupStream()
      return false
    }
  }, [cleanupStream])

  const stop = useCallback(() => {
    const rec = recRef.current
    if (rec && rec.state !== 'inactive') rec.stop()
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return { state, url, blob, seconds, start, stop, reset }
}
