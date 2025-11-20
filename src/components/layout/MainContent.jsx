import { useState, useEffect, useRef } from 'react'
import { PreviewToolbar } from '@/components/features'
import {
  BlogPostPreview,
  DashboardPreview,
  MarketingPreview
} from '@/components/previews'
import styles from './MainContent.module.css'

const MainContent = ({ previewMode, onModeChange, previewStyles }) => {
  const [displayMode, setDisplayMode] = useState(previewMode)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (previewMode !== displayMode) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // Start transition animation
      const startTransition = () => {
        setIsTransitioning(true)
        timerRef.current = setTimeout(() => {
          setDisplayMode(previewMode)
          setIsTransitioning(false)
          timerRef.current = null
        }, 150) // Match fadeOut duration
      }

      startTransition()

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
      }
    }
  }, [previewMode, displayMode])

  const renderPreview = () => {
    switch (displayMode) {
      case 'blog':
        return <BlogPostPreview />
      case 'dashboard':
        return <DashboardPreview />
      case 'marketing':
        return <MarketingPreview />
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <PreviewToolbar activeMode={previewMode} onModeChange={onModeChange} />
      <div
        className={`${styles.previewArea} preview-canvas`}
        style={previewStyles}
      >
        <div
          className={`${styles.previewContent} ${
            isTransitioning ? styles.fadeOut : styles.fadeIn
          }`}
        >
          {renderPreview()}
        </div>
      </div>
    </div>
  )
}

export default MainContent
