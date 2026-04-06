import { fmt } from '../utils/fmt.js'
import styles from './SavingsCard.module.css'

export default function SavingsCard({
  savedAmount, monthlyGoal, onSavedChange, onMonthlyChange,
  total, saved, remaining, pct, months, currency
}) {
  const monthsLabel = months !== null
    ? `${months} ${months === 1 ? 'mes' : 'meses'}`
    : remaining === 0 && total > 0
      ? '¡Listo! 🎉'
      : '—'

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>🐷</div>
        <h2 className={styles.title}>Mis ahorros</h2>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>Ya tengo ahorrado</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={savedAmount}
            onChange={e => onSavedChange(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Meta de ahorro mensual</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={monthlyGoal}
            onChange={e => onMonthlyChange(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressLabels}>
          <span>Progreso hacia el total del viaje</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
        <div className={styles.barBg}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total del viaje</span>
          <span className={styles.statValue}>{fmt(total)} <small>{currency}</small></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Ya ahorrado</span>
          <span className={`${styles.statValue} ${styles.green}`}>{fmt(saved)} <small>{currency}</small></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Falta</span>
          <span className={`${styles.statValue} ${styles.red}`}>{fmt(remaining)} <small>{currency}</small></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Meses para completar</span>
          <span className={styles.statValue}>{monthsLabel}</span>
        </div>
      </div>
    </div>
  )
}
