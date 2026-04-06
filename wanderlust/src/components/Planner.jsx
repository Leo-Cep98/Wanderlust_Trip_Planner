import { useState } from 'react'
import { usePlannerState } from '../hooks/usePlannerState.js'
import ExpenseTable from './ExpenseTable.jsx'
import SavingsCard from './SavingsCard.jsx'
import styles from './Planner.module.css'

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', name: 'Dólar estadounidense' },
  { code: 'COP', flag: '🇨🇴', name: 'Peso colombiano' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
]

function CurrencySelector({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const selected = CURRENCIES.find(c => c.code === value) || CURRENCIES[0]

  return (
      <div className={styles.currencyWrapper}>
        <button
            className={styles.currencyBtn}
            onClick={() => setOpen(o => !o)}
            type="button"
        >
          <span className={styles.currencyFlag}>{selected.flag}</span>
          <span className={styles.currencyCode}>{selected.code}</span>
          <span className={styles.currencyChevron}>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
            <div className={styles.currencyDropdown}>
              {CURRENCIES.map(c => (
                  <button
                      key={c.code}
                      className={`${styles.currencyOption} ${c.code === value ? styles.currencyOptionActive : ''}`}
                      onClick={() => { onChange(c.code); setOpen(false) }}
                      type="button"
                  >
                    <span className={styles.currencyFlag}>{c.flag}</span>
                    <span className={styles.currencyOptionText}>
                <strong>{c.code}</strong>
                <small>{c.name}</small>
              </span>
                  </button>
              ))}
            </div>
        )}
      </div>
  )
}

export default function Planner({ onBack }) {
  const {
    state, update,
    addRow, updateRow, deleteRow,
    total, saved, remaining, pct, months,
  } = usePlannerState()

  return (
      <div className={styles.planner}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.logo}>Wander<em>lust</em></div>
          <button className={styles.btnBack} onClick={onBack}>← Inicio</button>
        </header>

        {/* ── Body ── */}
        <main className={styles.body}>

          {/* Controls row */}
          <div className={styles.topControls}>
            <input
                className={styles.tripNameInput}
                type="text"
                placeholder="Nombre del viaje (ej: Europa 2030)"
                value={state.tripName}
                onChange={e => update({ tripName: e.target.value })}
            />
            <CurrencySelector
                value={state.currency}
                onChange={v => update({ currency: v })}
            />
          </div>

          <h2 className={styles.sectionTitle}>Itinerario de gastos</h2>
          <p className={styles.sectionSub}>
            Agrega cada concepto del viaje — vuelos, hospedaje, experiencias, comidas, transporte…
          </p>

          <ExpenseTable
              rows={state.rows}
              onAdd={addRow}
              onUpdate={updateRow}
              onDelete={deleteRow}
              total={total}
              currency={state.currency}
          />

          <SavingsCard
              savedAmount={state.savedAmount}
              monthlyGoal={state.monthlyGoal}
              onSavedChange={v => update({ savedAmount: v })}
              onMonthlyChange={v => update({ monthlyGoal: v })}
              total={total}
              saved={saved}
              remaining={remaining}
              pct={pct}
              months={months}
              currency={state.currency}
          />

        </main>
      </div>
  )
}