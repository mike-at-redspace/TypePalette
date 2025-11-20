import { ChevronDown } from 'lucide-react'
import styles from './Select.module.css'

const Select = ({ value, onChange, children, className, ...props }) => (
  <div className={styles.container}>
    <select
      value={value}
      onChange={onChange}
      className={`${styles.select} ${className || ''}`}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className={styles.icon} size={14} />
  </div>
)

export default Select
