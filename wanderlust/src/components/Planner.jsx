import { usePlannerState } from '../hooks/usePlannerState.js'
import ExpenseTable from './ExpenseTable.jsx'
import SavingsCard from './SavingsCard.jsx'
import styles from './Planner.module.css'

const CURRENCIES = ['USD', 'COP', 'EUR', 'MXN', 'ARS']
const CURRENCY_FLAGS = { USD: '🇺🇸', COP: '🇨🇴', EUR: '🇪🇺', MXN: '🇲🇽', ARS: '🇦🇷' }

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
            placeholder="Nombre del viaje (ej: Europa 2025)"
            value={state.tripName}
            onChange={e => update({ tripName: e.target.value })}
          />
          <select
            className={styles.currencySelect}
            value={state.currency}
            onChange={e => update({ currency: e.target.value })}
          >
            {CURRENCIES.map(c => (
              <option key={c} value={c}>{CURRENCY_FLAGS[c]} {c}</option>
            ))}
          </select>
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
