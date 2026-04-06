import { fmt } from '../utils/fmt.js'
import styles from './ExpenseTable.module.css'

const CATEGORIES = [
  '✈️ Vuelo',
  '🏨 Hospedaje',
  '🍽️ Comida',
  '🎡 Experiencia',
  '🚌 Transporte',
  '💊 Salud',
  '🛍️ Compras',
  '📝 Otro',
]

export default function ExpenseTable({ rows, onAdd, onUpdate, onDelete, total, currency }) {
  return (
    <div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>
                  <select
                    value={row.cat}
                    onChange={e => onUpdate(row.id, 'cat', e.target.value)}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={row.desc}
                    onChange={e => onUpdate(row.id, 'desc', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.date}
                    onChange={e => onUpdate(row.id, 'date', e.target.value)}
                  />
                </td>
                <td className={styles.amountCell}>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={row.amount}
                    onChange={e => onUpdate(row.id, 'amount', e.target.value)}
                  />
                </td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => onDelete(row.id)} title="Eliminar">
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyMsg}>
                  No hay ítems aún — agrega el primero 👇
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <button className={styles.btnAddRow} onClick={onAdd}>
            + Agregar ítem
          </button>
          <div>
            <span className={styles.totalLabel}>Total estimado</span>
            <span className={styles.totalAmount}>{fmt(total)}</span>
            <span className={styles.currencyTag}>{currency}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
