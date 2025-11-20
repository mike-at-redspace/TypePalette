import { motion } from 'framer-motion'
import styles from './CasingControl.module.css'

const CasingControl = ({ value, onChange }) => {
  const options = [
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' }
  ]

  return (
    <div>
      <label className={styles.label}>Casing</label>
      <div className={styles.casingGrid}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`${styles.casingButton} ${value === option.value ? styles.active : ''}`}
          >
            {option.label}
            {value === option.value && (
              <motion.div
                layoutId='activeCasing'
                className={styles.activeIndicator}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CasingControl
