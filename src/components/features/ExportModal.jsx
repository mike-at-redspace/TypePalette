import { useState, useEffect, useRef } from 'react'
import {
  Code,
  Copy,
  Check,
  FileCode,
  Package,
  Rocket,
  Download
} from 'lucide-react'
import { Modal, Tabs, CodeBlock } from '@/components/ui'
import {
  generateCSSExport,
  generateTailwindExport,
  generateComprehensiveTailwindConfig,
  generateProseConfig,
  generateNextJSInstall,
  generateViteInstall,
  generateHTMLInstall
} from '@/utils'
import styles from './ExportModal.module.css'

const ExportModal = ({ isOpen, onClose, config }) => {
  const [activeTab, setActiveTab] = useState('css')
  const [copiedButton, setCopiedButton] = useState(null)
  const contentRef = useRef(null)

  // Reset scroll position when tab changes
  useEffect(() => {
    if (contentRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = 0
        }
      })
    }
  }, [activeTab])

  const cssVars = generateCSSExport(config)
  const tailwindConfig = generateTailwindExport(config)
  const comprehensiveTailwind = generateComprehensiveTailwindConfig(config)
  const proseConfig = generateProseConfig(config)
  const nextJSInstall = generateNextJSInstall(config)
  const viteInstall = generateViteInstall(config)
  const htmlInstall = generateHTMLInstall(config)

  const handleCopy = (text, buttonId) => {
    navigator.clipboard.writeText(text)
    setCopiedButton(buttonId)
    setTimeout(() => {
      setCopiedButton(null)
    }, 2000)
  }

  const handleDownload = (content, filename, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportTabs = [
    { id: 'css', label: 'CSS', icon: FileCode },
    { id: 'tailwind', label: 'Tailwind', icon: FileCode },
    { id: 'prose', label: 'Prose', icon: Package },
    { id: 'framework', label: 'Framework', icon: Rocket }
  ]

  const CodeSection = ({
    label,
    labelClass,
    code,
    buttonId,
    language = 'css',
    filename,
    mimeType
  }) => (
    <div>
      <div className={styles.header}>
        <label className={labelClass}>{label}</label>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => handleCopy(code, buttonId)}
            className={styles.copyButton}
          >
            <div className={styles.copyButtonContent}>
              {copiedButton === buttonId ? (
                <>
                  <Check size={12} className={styles.checkIcon} /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </div>
          </button>
          {filename && (
            <button
              onClick={() => handleDownload(code, filename, mimeType)}
              className={styles.downloadButton}
              title={`Download ${filename}`}
            >
              <Download size={12} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.codeBlock}>
        <CodeBlock code={code} language={language} />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'css':
        return (
          <div key='css' className={styles.tabContent}>
            <CodeSection
              label='CSS Variables'
              labelClass={styles.label}
              code={cssVars}
              buttonId='cssVars'
              filename='css-variables.css'
              mimeType='text/css'
            />
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                <strong>Usage:</strong> Link this CSS file in your HTML or
                import it in your stylesheet. Use the CSS custom properties
                (variables) throughout your project.
              </p>
            </div>
          </div>
        )
      case 'tailwind':
        return (
          <div key='tailwind' className={styles.tabContent}>
            <CodeSection
              label='Comprehensive Tailwind v4 Config'
              labelClass={styles.label}
              code={comprehensiveTailwind}
              buttonId='comprehensiveTailwind'
              filename='tailwind-comprehensive.css'
              mimeType='text/css'
            />
            <CodeSection
              label='Basic Tailwind v4 Config'
              labelClass={styles.labelSecondary}
              code={tailwindConfig}
              buttonId='tailwindConfig'
              filename='tailwind-basic.css'
              mimeType='text/css'
            />
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                <strong>Usage:</strong> Add this to your CSS file or import it
                in your Tailwind config. The comprehensive version includes
                utility classes and element-specific variables.
              </p>
            </div>
          </div>
        )
      case 'prose':
        return (
          <div key='prose' className={styles.tabContent}>
            <CodeSection
              label='@tailwindcss/typography Configuration'
              labelClass={styles.label}
              code={proseConfig}
              buttonId='proseConfig'
              filename='prose-config.css'
              mimeType='text/css'
            />
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                <strong>Install:</strong>{' '}
                <code>npm install @tailwindcss/typography</code>
              </p>
              <p className={styles.infoText}>
                <strong>Usage:</strong> Add <code>class="prose"</code> to any
                container with long-form content.
              </p>
            </div>
          </div>
        )
      case 'framework':
        return (
          <div key='framework' className={styles.tabContent}>
            <CodeSection
              label='Next.js (next/font/google)'
              labelClass={styles.label}
              code={nextJSInstall}
              buttonId='nextJSInstall'
              language='jsx'
              filename='nextjs-install.jsx'
              mimeType='text/jsx'
            />
            <CodeSection
              label='Vite'
              labelClass={styles.labelSecondary}
              code={viteInstall}
              buttonId='viteInstall'
              language='html'
              filename='vite-install.html'
              mimeType='text/html'
            />
            <CodeSection
              label='Plain HTML'
              labelClass={styles.labelSecondary}
              code={htmlInstall}
              buttonId='htmlInstall'
              language='html'
              filename='html-install.md'
              mimeType='text/markdown'
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <Code size={20} className={styles.codeIcon} /> Export Configuration
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.tabsContainer}>
          <Tabs
            active={activeTab}
            options={exportTabs}
            onChange={setActiveTab}
          />
        </div>
        <div className={styles.tabContentWrapper} ref={contentRef}>
          {renderContent()}
        </div>
      </div>
    </Modal>
  )
}

export default ExportModal
