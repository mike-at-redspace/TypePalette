import { useRef, useEffect } from 'react'
import styles from './Tabs.module.css'

const Tabs = ({ active, options, onChange }) => {
  const containerRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !indicatorRef.current) return

    const activeButton = containerRef.current.querySelector(
      `.${styles.tab}.${styles.active}`
    )
    if (!activeButton) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    const left = buttonRect.left - containerRect.left
    const width = buttonRect.width

    indicatorRef.current.style.transform = `translateX(${left}px)`
    indicatorRef.current.style.width = `${width}px`
  }, [active, options])

  return (
    <div className={styles.container} ref={containerRef}>
      <div ref={indicatorRef} className={styles.activeIndicator} />
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
}

export default Tabs
