import { fmt } from '../utils/fmt.js'
import styles from './ExpenseTable.module.css'
import { motion, AnimatePresence } from 'framer-motion';

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
      // 1. Animation for the whole planner's container
      <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
      >
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
            {/* 2. AnimatePresence allows animations on rows when those are deleted */}
            <AnimatePresence>
              {rows.map((row) => (
                  <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                  >
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
                      <button
                          className={styles.deleteBtn}
                          onClick={() => onDelete(row.id)}
                          title="Eliminar"
                      >
                        ×
                      </button>
                    </td>
                  </motion.tr>
              ))}
            </AnimatePresence>

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
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.btnAddRow}
                onClick={onAdd}
            >
              + Agregar ítem
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
              <span className={styles.totalLabel}>Total estimado</span>
              <span className={styles.totalAmount}>{fmt(total)}</span>
              <span className={styles.currencyTag}>{currency}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
  )
}