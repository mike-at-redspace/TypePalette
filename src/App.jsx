import { useState, useMemo, useEffect, lazy, Suspense } from 'react'
import { Header, Sidebar, MainContent } from '@/components'
import { useFontLoader, useTypographyConfig } from '@/hooks'
import '@/styles/globals.css'
import '@/styles/preview.css'
import styles from './App.module.css'

// Lazy load ExportModal to reduce initial bundle size
const ExportModal = lazy(() => import('@/components/features/ExportModal'))

function App() {
  const {
    config,
    activeRole,
    setActiveRole,
    activeElement,
    setActiveElement,
    updateConfig,
    applyPreset
  } = useTypographyConfig()
  const [previewMode, setPreviewMode] = useState('blog')
  const [showExport, setShowExport] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mode, setMode] = useState('custom')

  // Reset activeElement to 'all' when role changes
  useEffect(() => {
    setActiveElement('all')
  }, [activeRole, setActiveElement])

  // Wrapper to reset all user settings when applying a preset
  const handleApplyPreset = presetId => {
    applyPreset(presetId)
    setActiveRole('headings')
    setActiveElement('all')
    setSearchQuery('')
    setMode('preset')
  }

  useFontLoader(config)

  const previewStyles = useMemo(() => {
    // Base CSS variables always use the 'all' config for each role
    // Element-specific variables are set separately below and handle individual element styling
    const getRoleConfig = role => {
      return config[role]?.all || {}
    }

    const headingConfig = getRoleConfig('headings')
    const bodyConfig = getRoleConfig('body')
    const uiConfig = getRoleConfig('ui')

    const baseFontSize = config.baseSize || '1'
    const styles = {
      '--font-heading': `"${headingConfig.family}", ${headingConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`,
      '--font-body': `"${bodyConfig.family}", ${bodyConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`,
      '--font-ui': `"${uiConfig.family}", ${uiConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`,
      '--heading-weight': headingConfig.weight,
      '--heading-tracking': `${headingConfig.tracking}em`,
      '--heading-leading': headingConfig.leading,
      '--heading-transform': headingConfig.transform,
      '--body-weight': bodyConfig.weight,
      '--body-tracking': `${bodyConfig.tracking}em`,
      '--body-leading': bodyConfig.leading,
      '--body-transform': bodyConfig.transform,
      '--ui-weight': uiConfig.weight,
      '--ui-tracking': `${uiConfig.tracking}em`,
      '--ui-leading': uiConfig.leading,
      '--ui-transform': uiConfig.transform,
      fontSize: `${baseFontSize}rem`
    }
    styles['--base-font-size'] = `${baseFontSize}rem`

    // Add element-specific CSS variables
    Object.keys(config.headings || {}).forEach(element => {
      if (element !== 'all') {
        const elemConfig = config.headings[element]
        styles[`--font-heading-${element}`] =
          `"${elemConfig.family}", ${elemConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`
        styles[`--heading-${element}-weight`] = elemConfig.weight
        styles[`--heading-${element}-tracking`] = `${elemConfig.tracking}em`
        styles[`--heading-${element}-leading`] = elemConfig.leading
        styles[`--heading-${element}-transform`] = elemConfig.transform
      }
    })

    Object.keys(config.body || {}).forEach(element => {
      if (element !== 'all') {
        const elemConfig = config.body[element]
        styles[`--font-body-${element}`] =
          `"${elemConfig.family}", ${elemConfig.category === 'Serif' ? 'serif' : elemConfig.category === 'Monospace' ? 'monospace' : 'sans-serif'}`
        styles[`--body-${element}-weight`] = elemConfig.weight
        styles[`--body-${element}-tracking`] = `${elemConfig.tracking}em`
        styles[`--body-${element}-leading`] = elemConfig.leading
        styles[`--body-${element}-transform`] = elemConfig.transform
      }
    })

    Object.keys(config.ui || {}).forEach(element => {
      if (element !== 'all') {
        const elemConfig = config.ui[element]
        styles[`--font-ui-${element}`] =
          `"${elemConfig.family}", ${elemConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`
        styles[`--ui-${element}-weight`] = elemConfig.weight
        styles[`--ui-${element}-tracking`] = `${elemConfig.tracking}em`
        styles[`--ui-${element}-leading`] = elemConfig.leading
        styles[`--ui-${element}-transform`] = elemConfig.transform
      }
    })

    return styles
  }, [config])

  return (
    <div className={styles.app}>
      <Header onExportClick={() => setShowExport(true)} config={config} />
      <main className={styles.main}>
        <Sidebar
          mode={mode}
          onModeChange={setMode}
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          activeElement={activeElement}
          onElementChange={setActiveElement}
          config={config}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onUpdate={updateConfig}
          onApplyPreset={handleApplyPreset}
          baseSize={config.baseSize}
        />
        <MainContent
          previewMode={previewMode}
          onModeChange={setPreviewMode}
          previewStyles={previewStyles}
        />
      </main>
      {showExport && (
        <Suspense fallback={null}>
          <ExportModal
            isOpen={showExport}
            onClose={() => setShowExport(false)}
            config={config}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App
