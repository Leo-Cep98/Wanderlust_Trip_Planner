import styles from './Homepage.module.css'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80', alt: 'playa' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80', alt: 'montaña' },
  { src: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=400&q=80', alt: 'ciudad' },
  { src: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80', alt: 'viaje' },
]

export default function Homepage({ onEnter }) {
  return (
    <section className={styles.homepage}>
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
          Wander<span>lust</span>
        </h1>
        <p className={styles.tagline}>Planifica, presupuesta y viaja sin sorpresas.</p>
        <button className={styles.btnAccess} onClick={onEnter}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Acceder al planificador
        </button>
      </div>
    </section>
  )
}
