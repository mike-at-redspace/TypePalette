import { motion } from 'framer-motion'
import { BookOpen, LayoutDashboard, Monitor } from 'lucide-react'
import styles from './PreviewToolbar.module.css'

const PreviewToolbar = ({ activeMode, onModeChange }) => {
  const modes = [
    { id: 'blog', icon: BookOpen, label: 'Read' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'App' },
    { id: 'marketing', icon: Monitor, label: 'Hero' }
  ]

  return (
    <div className={styles.container}>
      {modes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`${styles.button} ${activeMode === mode.id ? styles.active : ''}`}
        >
          <mode.icon size={14} />
          <span className={styles.label}>{mode.label}</span>
          {activeMode === mode.id && (
            <motion.div
              layoutId='activePreviewButton'
              className={styles.activeIndicator}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

export default PreviewToolbar
