import { useState, useEffect } from 'react'
import { db } from '../firebase.js'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

// ID fixed -- evreyone will see the same
const TRIP_DOC = doc(db, 'trips', 'shared')

const defaultState = {
  tripName: '',
  currency: 'EUR',
  rows: [],
  savedAmount: '',
  monthlyGoal: '700',
}

export function usePlannerState() {
  const [state, setState] = useState(defaultState)
  const [loading, setLoading] = useState(true)

  // Listen to changes in real time from Firestore
  useEffect(() => {
    const unsub = onSnapshot(TRIP_DOC, (snap) => {
      if (snap.exists()) {
        setState({ ...defaultState, ...snap.data() })
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // Saves on Firestore every time the states changes
  async function update(patch) {
    const next = { ...state, ...patch }
    setState(next)
    try {
      await setDoc(TRIP_DOC, next)
    } catch (e) {
      console.error('Error saving on Firestore:', e)
    }
  }

  const nextId = state.rows.length > 0
      ? Math.max(...state.rows.map(r => r.id)) + 1
      : 1

  function addRow() {
    const newRow = { id: nextId, cat: '✈️ Vuelo', desc: '', date: '', amount: '' }
    update({ rows: [...state.rows, newRow] })
  }

  function updateRow(id, field, value) {
    update({
      rows: state.rows.map(r => r.id === id ? { ...r, [field]: value } : r)
    })
  }

  function deleteRow(id) {
    update({ rows: state.rows.filter(r => r.id !== id) })
  }

  const total = state.rows.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0)
  const saved = parseFloat(state.savedAmount) || 0
  const monthly = parseFloat(state.monthlyGoal) || 0
  const remaining = Math.max(0, total - saved)
  const pct = total > 0 ? Math.min(100, Math.round((saved / total) * 100)) : 0
  const months = monthly > 0 && remaining > 0 ? Math.ceil(remaining / monthly) : null

  return {
    state,
    update,
    addRow,
    updateRow,
    deleteRow,
    total,
    saved,
    remaining,
    pct,
    months,
    loading,
  }
}