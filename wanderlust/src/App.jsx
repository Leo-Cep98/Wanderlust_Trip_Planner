import { useState } from 'react'
import Homepage from './components/Homepage.jsx'
import Planner from './components/Planner.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  return page === 'home'
    ? <Homepage onEnter={() => setPage('planner')} />
    : <Planner onBack={() => setPage('home')} />
}
