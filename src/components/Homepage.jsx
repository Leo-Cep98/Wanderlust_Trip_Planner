import styles from './Homepage.module.css'

import pic1 from './img/pic1.jpg'
import pic2 from './img/pic2.jpg'
import pic3 from './img/pic3.jpg'
import pic4 from './img/pic4.jpg'
import { motion } from 'framer-motion';

const PHOTOS = [
    { src: pic1, alt: 'bcn' },
    { src: pic4, alt: 'luzDelNorte' },
    { src: pic2, alt: 'horse' },
    { src: pic3, alt: 'flightWindow' },
]

export default function Homepage({ onEnter }) {
    return (
        <motion.section
            className={styles.homepage}
            initial={{ opacity: 0 }}         // Empieza invisible
            animate={{ opacity: 1 }}         // Aparece al cargar
            exit={{ opacity: 0, x: -100 }}   // Se desliza a la izquierda y desaparece al dar click
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className={styles.bgGrid} />

            <div className={styles.heroPhotos}>
                {PHOTOS.map((p, i) => (
                    <div key={i} className={`${styles.photoCard} ${styles[`card${i + 1}`]}`}>
                        <img src={p.src} alt={p.alt} />
                    </div>
                ))}
            </div>

            <div className={styles.heroContent}>
                <p className={styles.eyebrow}>Tu próxima aventura te espera</p>
                <h1 className={styles.brand}>
                    Panda's<span>Trip</span>
                </h1>
                <p className={styles.tagline}>Planifica, presupuesta y viaja sin sorpresas.</p>

                <motion.button
                    className={styles.btnAccess}
                    onClick={onEnter}
                    whileHover={{ scale: 1.05 }}  // Se agranda un poquito al pasar el mouse
                    whileTap={{ scale: 0.95 }}   // Se encoge al clickear
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Acceder al planificador
                </motion.button>
            </div>
        </motion.section>
    )
}