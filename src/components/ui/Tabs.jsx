import { motion } from 'framer-motion'
import styles from './Tabs.module.css'

const Tabs = ({ active, options, onChange, layoutId = 'activeTab' }) => (
  <div className={styles.container}>
    {options.map(opt => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        className={`${styles.tab} ${active === opt.id ? styles.active : ''}`}
      >
        {opt.icon && <opt.icon size={14} />}
        {opt.label}
        {active === opt.id && (
          <motion.div
            layoutId={layoutId}
            className={styles.activeIndicator}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    ))}
  </div>
)

export default Tabs
