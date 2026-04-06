import { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import Planner from './components/Planner.jsx'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const [page, setPage] = useState('home')

  return (
      // 1. Wrap everything with AnimatePresence
      <AnimatePresence mode="wait">
        {page === 'home' ? (
            <Homepage
                key="home" // 2. SUPER IMPORTANT! Key tells the Framer which component is quitting
                onEnter={() => setPage('planner')}
            />
        ) : (
            <Planner
                key="planner" // 3. Key for the planner as well
                onBack={() => setPage('home')}
            />
        )}
      </AnimatePresence>
  )
}