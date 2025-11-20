import { useEffect, useState, forwardRef } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

const Modal = forwardRef(({ isOpen, onClose, title, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Avoid synchronous setState in effect
      setTimeout(() => setShouldRender(true), 0)
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      // Avoid synchronous setState in effect
      requestAnimationFrame(() => {
        setIsVisible(false)
      })
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.content} ${isVisible ? styles.visible : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.body} ref={ref}>
          {children}
        </div>
      </div>
    </div>
  )
})

Modal.displayName = 'Modal'

export default Modal
