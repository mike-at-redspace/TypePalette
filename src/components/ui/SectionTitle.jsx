import styles from './SectionTitle.module.css'

const SectionTitle = ({ children, icon: Icon, className = '' }) => {
  return (
    <div className={`${styles.sectionTitle} ${className}`}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </div>
  )
}

export default SectionTitle
