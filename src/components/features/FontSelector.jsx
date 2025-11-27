import { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Trash2, List, ChevronDown, ChevronUp, Type } from 'lucide-react'
import { SearchInput } from '@/components/ui'
import { GOOGLE_FONTS, loadGoogleFonts, FONT_CATEGORIES } from '@/utils'
import { useScrollFontPreloader } from '@/hooks'
import styles from './FontSelector.module.css'

const RECENT_FONTS_KEY = 'typepalette_recent_fonts'
const MAX_RECENT_FONTS = 3
const FONT_ITEM_SELECTOR = 'button[data-font-name]'

const getRecentFonts = () => {
  try {
    const stored = localStorage.getItem(RECENT_FONTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveRecentFont = fontName => {
  try {
    const recent = getRecentFonts()
    const updated = [fontName, ...recent.filter(f => f !== fontName)].slice(
      0,
      MAX_RECENT_FONTS
    )
    localStorage.setItem(RECENT_FONTS_KEY, JSON.stringify(updated))
    return updated
  } catch {
    // Ignore localStorage errors
    return null
  }
}

const removeRecentFont = fontName => {
  try {
    const recent = getRecentFonts()
    const updated = recent.filter(f => f !== fontName)
    localStorage.setItem(RECENT_FONTS_KEY, JSON.stringify(updated))
    return updated
  } catch {
    // Ignore localStorage errors
    return null
  }
}

const FontSelector = ({
  activeFamily,
  searchQuery,
  onSearchChange,
  onFontSelect
}) => {
  const [recentFonts, setRecentFonts] = useState(getRecentFonts())
  const [isRecentOpen, setIsRecentOpen] = useState(true)
  const prevActiveFamilyRef = useRef(activeFamily)

  useEffect(() => {
    if (activeFamily && activeFamily !== prevActiveFamilyRef.current) {
      prevActiveFamilyRef.current = activeFamily
      const updated = saveRecentFont(activeFamily)
      if (updated) {
        // Use setTimeout to defer state update and avoid synchronous setState in effect
        setTimeout(() => {
          setRecentFonts(updated)
        }, 0)
      }
    }
  }, [activeFamily])

  const filteredFonts = useMemo(() => {
    return GOOGLE_FONTS.filter(
      font =>
        font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const recentFontsToShow = useMemo(() => {
    if (searchQuery) {
      // Only show recent fonts if they match the search
      return recentFonts.filter(fontName =>
        fontName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return recentFonts
  }, [recentFonts, searchQuery])

  const handleFontSelect = family => {
    onFontSelect(family)
    const updated = saveRecentFont(family)
    if (updated) {
      setRecentFonts(updated)
    }
  }

  const getFontByName = name => GOOGLE_FONTS.find(f => f.name === name)

  const handleRemoveRecentFont = (fontName, e) => {
    e.stopPropagation()
    const updated = removeRecentFont(fontName)
    if (updated) {
      setRecentFonts(updated)
    }
  }

  // Always load recent fonts immediately
  useEffect(() => {
    if (recentFonts.length > 0) {
      loadGoogleFonts(recentFonts)
    }
  }, [recentFonts])

  // Scroll-based font preloading
  const visibleFonts = useMemo(() => {
    return filteredFonts.filter(
      font => !recentFontsToShow.includes(font.name) || searchQuery
    )
  }, [filteredFonts, recentFontsToShow, searchQuery])

  // Group fonts by category
  const fontsByCategory = useMemo(() => {
    const grouped = {}
    FONT_CATEGORIES.forEach(category => {
      grouped[category] = visibleFonts.filter(
        font => font.category === category
      )
    })
    return grouped
  }, [visibleFonts])

  const fontListRef = useScrollFontPreloader(visibleFonts, true)
  const focusAdjacentFontItem = useCallback(
    direction => {
      if (typeof document === 'undefined') return
      const container = fontListRef.current
      if (!container) return
      const fontItems = Array.from(container.querySelectorAll(FONT_ITEM_SELECTOR))
      if (fontItems.length === 0) return
      const activeIndex = fontItems.findIndex(
        item => item === document.activeElement
      )
      let nextIndex
      if (activeIndex === -1) {
        nextIndex = direction === 1 ? 0 : fontItems.length - 1
      } else {
        nextIndex = activeIndex + direction
        if (nextIndex < 0) {
          nextIndex = fontItems.length - 1
        } else if (nextIndex >= fontItems.length) {
          nextIndex = 0
        }
      }
      const target = fontItems[nextIndex]
      if (!target) return
      target.focus()
      target.scrollIntoView({ block: 'nearest' })
    },
    [fontListRef]
  )
  const handleFontNavigationKey = useCallback(
    event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      focusAdjacentFontItem(direction)
    },
    [focusAdjacentFontItem]
  )

  // Check if search matches category for highlighting
  const isCategoryMatch = useCallback(
    category => {
      if (!searchQuery) return false
      return category.toLowerCase().includes(searchQuery.toLowerCase())
    },
    [searchQuery]
  )

  return (
    <div>
      <div className={styles.typefaceHeader}>
        <div className={styles.typefaceHeaderContent}>
          <Type size={12} />
          <span className={styles.typefaceLabel}>Typeface</span>
        </div>
        {activeFamily && <span className={styles.badge}>{activeFamily}</span>}
      </div>

      {activeFamily && (
        <div className={styles.preview}>
          <span
            style={{ fontFamily: activeFamily }}
            className={styles.previewText}
          >
            {activeFamily}
          </span>
        </div>
      )}

      <SearchInput
        placeholder='Search Google Fonts...'
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        onKeyDown={handleFontNavigationKey}
      />

      {recentFontsToShow.length > 0 && !searchQuery && (
        <div className={styles.recentSection}>
          <button
            className={styles.recentHeader}
            onClick={() => setIsRecentOpen(!isRecentOpen)}
          >
            <div className={styles.recentHeaderContent}>
              <Clock size={12} />
              <span className={styles.recentLabel}>Recently Used</span>
            </div>
            {isRecentOpen ? (
              <ChevronUp size={14} className={styles.chevron} />
            ) : (
              <ChevronDown size={14} className={styles.chevron} />
            )}
          </button>
          <AnimatePresence>
            {isRecentOpen && (
              <motion.div
                className={styles.recentList}
                initial={{ maxHeight: 0, opacity: 0, y: -10 }}
                animate={{ maxHeight: 1000, opacity: 1, y: 0 }}
                exit={{ maxHeight: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                {recentFontsToShow.map(fontName => {
                  const font = getFontByName(fontName)
                  if (!font) return null
                  return (
                    <button
                      key={fontName}
                      onClick={() => handleFontSelect(fontName)}
                      className={`${styles.fontItem} ${activeFamily === fontName ? styles.active : ''}`}
                    >
                      <span
                        style={{ fontFamily: fontName }}
                        className={styles.fontName}
                      >
                        {fontName}
                      </span>
                      <div className={styles.fontItemActions}>
                        <button
                          onClick={e => handleRemoveRecentFont(fontName, e)}
                          className={styles.trashButton}
                          aria-label={`Remove ${fontName} from recent fonts`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className={styles.allFontsSection}>
        <div className={styles.allFontsHeader}>
          <List size={12} />
          <span className={styles.allFontsLabel}>All Fonts</span>
        </div>
        <div
          ref={fontListRef}
          className={styles.fontList}
          onKeyDown={handleFontNavigationKey}
        >
          {FONT_CATEGORIES.map(category => {
            const categoryFonts = fontsByCategory[category]
            if (categoryFonts.length === 0) return null

            return (
              <div key={category} className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTitle}>{category}</span>
                  <span className={styles.categoryCount}>
                    {categoryFonts.length}
                  </span>
                </div>
                {categoryFonts.map(font => (
                  <button
                    key={font.name}
                    data-font-name={font.name}
                    onClick={() => handleFontSelect(font.name)}
                    className={`${styles.fontItem} ${activeFamily === font.name ? styles.active : ''}`}
                  >
                    <span
                      style={{ fontFamily: font.name }}
                      className={styles.fontName}
                    >
                      {font.name}
                    </span>
                    <span
                      className={`${styles.categoryBadge} ${
                        isCategoryMatch(font.category)
                          ? styles['categoryBadge--highlight']
                          : ''
                      }`}
                    >
                      {font.category}
                    </span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FontSelector
