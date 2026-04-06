import { useState, useEffect } from 'react'

const STORAGE_KEY = 'wanderlust_v2'

const defaultState = {
  tripName: '',
  currency: 'EUR',
  rows: [],
  savedAmount: '',
  monthlyGoal: '',
}

export function usePlannerState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  function update(patch) {
    setState(prev => ({ ...prev, ...patch }))
  }

  let nextId = (state.rows.length > 0 ? Math.max(...state.rows.map(r => r.id)) + 1 : 1)

  function addRow() {
    const newRow = { id: nextId++, cat: '✈️ Vuelo', desc: '', date: '', amount: '' }
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
  }
}
