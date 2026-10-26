import { useState } from 'react'
import Home from './screens/Home'
import Onboarding from './screens/Onboarding'
import PhraseBook from './screens/PhraseBook'
import Session from './screens/Session'
import Settings from './screens/Settings'
import { AppProvider, useApp } from './state/AppContext'

type View = 'home' | 'session' | 'phrasebook' | 'settings'

function Shell() {
  const { progress } = useApp()
  const [view, setView] = useState<View>('home')
  const [session, setSession] = useState<{ day: number; mini: boolean } | null>(null)

  if (!progress.settings.onboarded) return <Onboarding />

  if (view === 'session' && session) {
    return (
      <Session
        day={session.day}
        mini={session.mini}
        onExit={() => {
          setSession(null)
          setView('home')
          window.scrollTo({ top: 0 })
        }}
      />
    )
  }

  if (view === 'phrasebook') return <PhraseBook onBack={() => setView('home')} />
  if (view === 'settings') return <Settings onBack={() => setView('home')} />

  return (
    <Home
      onStart={(mini) => {
        setSession({ day: progress.currentDay, mini })
        setView('session')
        window.scrollTo({ top: 0 })
      }}
      onOpenPhrases={() => setView('phrasebook')}
      onOpenSettings={() => setView('settings')}
    />
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
