import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useTTS } from '../audio/tts'
import { useProgressState, type ProgressApi } from './store'

type AppValue = ProgressApi & { tts: ReturnType<typeof useTTS> }

const Ctx = createContext<AppValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const prog = useProgressState()
  const { rate, voiceURI } = prog.progress.settings
  const tts = useTTS(rate, voiceURI)
  const value = useMemo(() => ({ ...prog, tts }), [prog, tts])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppValue {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp 必須放在 AppProvider 內')
  return v
}
