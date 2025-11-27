import { motion } from 'framer-motion'
import styles from './ButtonGroup.module.css'

const ButtonGroup = ({ label, value, onChange, options, layoutId, buttonStyle }) => {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <div className={styles.buttonGrid}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`${styles.button} ${value === option.value ? styles.active : ''}`}
            style={buttonStyle ? { [buttonStyle]: option.value } : undefined}
          >
            {option.label}
            {value === option.value && (
              <motion.div
                layoutId={layoutId}
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

export default ButtonGroup

