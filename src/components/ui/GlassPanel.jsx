import styles from './GlassPanel.module.css'

const GlassPanel = ({ children, className = '' }) => (
  <div className={`${styles.panel} ${className}`}>{children}</div>
)

export default GlassPanel
