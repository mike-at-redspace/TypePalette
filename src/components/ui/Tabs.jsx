import { motion } from 'framer-motion'
import styles from './Tabs.module.css'

const Tabs = ({ active, options, onChange, layoutId = 'activeTab' }) => (
  <div className={styles.container}>
    {options.map(opt => (
      <motion.button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        className={`${styles.tab} ${active === opt.id ? styles.active : ''}`}
        layout
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
      </motion.button>
    ))}
  </div>
)

export default Tabs
