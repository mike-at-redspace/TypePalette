import { useEffect, useRef, useCallback } from 'react'
import { loadGoogleFonts } from '@/utils'

const BATCH_SIZE = 15
const LOOKAHEAD_MARGIN = '200% 0px' // Load fonts 2 viewport heights ahead

/**
 * Hook to preload fonts as user scrolls through the font list
 * Uses Intersection Observer to detect visible/near-visible fonts and batch loads them
 */
const useScrollFontPreloader = (fonts, enabled = true) => {
  const containerRef = useRef(null)
  const loadedFontsRef = useRef(new Set())
  const observerRef = useRef(null)
  const pendingBatchRef = useRef(new Set())
  const fontsRef = useRef(fonts)

  // Keep fonts ref in sync
  useEffect(() => {
    fontsRef.current = fonts
  }, [fonts])

  // Batch load fonts
  const flushPendingBatch = useCallback(() => {
    if (pendingBatchRef.current.size === 0) return

    const fontsToLoad = Array.from(pendingBatchRef.current).filter(
      fontName => !loadedFontsRef.current.has(fontName)
    )

    if (fontsToLoad.length > 0) {
      fontsToLoad.forEach(fontName => loadedFontsRef.current.add(fontName))
      loadGoogleFonts(fontsToLoad)
      pendingBatchRef.current.clear()
    }
  }, [])

  // Schedule batch load with debouncing
  const scheduleBatchLoad = useCallback(() => {
    if (pendingBatchRef.current.size >= BATCH_SIZE) {
      flushPendingBatch()
    } else {
      // Use requestIdleCallback if available, otherwise setTimeout
      if (window.requestIdleCallback) {
        window.requestIdleCallback(flushPendingBatch, { timeout: 100 })
      } else {
        setTimeout(flushPendingBatch, 100)
      }
    }
  }, [flushPendingBatch])

  // Setup observer and observe items
  const setupObserver = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Check if Intersection Observer is supported
    if (!window.IntersectionObserver) {
      // Fallback: load first batch immediately
      const fontNames = fontsRef.current.slice(0, BATCH_SIZE).map(f => f.name)
      fontNames.forEach(name => {
        if (!loadedFontsRef.current.has(name)) {
          pendingBatchRef.current.add(name)
        }
      })
      flushPendingBatch()
      return
    }

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fontName = entry.target.dataset.fontName
            if (fontName && !loadedFontsRef.current.has(fontName)) {
              pendingBatchRef.current.add(fontName)
              scheduleBatchLoad()
            }
          }
        })
      },
      {
        root: container,
        rootMargin: LOOKAHEAD_MARGIN,
        threshold: 0
      }
    )

    // Observe all font items (use setTimeout to ensure DOM is updated)
    setTimeout(() => {
      if (!containerRef.current) return
      const fontItems =
        containerRef.current.querySelectorAll('[data-font-name]')
      fontItems.forEach(item => {
        if (observerRef.current) {
          observerRef.current.observe(item)
        }
      })

      // Initial load: preload first batch of visible fonts
      const visibleItems = Array.from(fontItems).slice(0, BATCH_SIZE)
      visibleItems.forEach(item => {
        const fontName = item.dataset.fontName
        if (fontName && !loadedFontsRef.current.has(fontName)) {
          pendingBatchRef.current.add(fontName)
        }
      })
      flushPendingBatch()
    }, 0)
  }, [scheduleBatchLoad, flushPendingBatch])

  useEffect(() => {
    if (!enabled || !containerRef.current || fonts.length === 0) {
      return
    }

    setupObserver()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [enabled, fonts.length, setupObserver])

  return containerRef
}

export default useScrollFontPreloader
