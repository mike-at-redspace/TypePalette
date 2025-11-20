import styles from './Tabs.module.css'

const Tabs = ({ active, options, onChange }) => (
  <div className={styles.container}>
    {options.map(opt => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        className={`${styles.tab} ${active === opt.id ? styles.active : ''}`}
      >
        {opt.icon && <opt.icon size={14} />}
        {opt.label}
      </button>
    ))}
  </div>
)

export default Tabs
