import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)
  const timerRef = useRef(null)
  const prevIsOpenRef = useRef(isOpen)

  useEffect(() => {
    // Only update state when isOpen actually changes
    if (isOpen !== prevIsOpenRef.current) {
      prevIsOpenRef.current = isOpen

      if (isOpen) {
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        // Use setTimeout to defer state update
        timerRef.current = setTimeout(() => {
          setShouldRender(true)
          setIsClosing(false)
          timerRef.current = null
        }, 0)
      } else if (shouldRender) {
        // Use setTimeout to defer state update
        timerRef.current = setTimeout(() => {
          setIsClosing(true)
          timerRef.current = setTimeout(() => {
            setShouldRender(false)
            setIsClosing(false)
            timerRef.current = null
          }, 200) // Match animation duration
        }, 0)
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isOpen, shouldRender])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.content} ${isClosing ? styles.zoomOut : styles.zoomIn}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
