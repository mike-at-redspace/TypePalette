import { useState, useEffect, useRef } from 'react'
import {
  Code,
  Copy,
  Check,
  FileCode,
  Package,
  Database,
  Rocket
} from 'lucide-react'
import { Modal, Tabs, CodeBlock } from '@/components/ui'
import {
  generateCSSExport,
  generateTailwindExport,
  generateComprehensiveTailwindConfig,
  generateProseConfig,
  generateJSONTokens,
  generateNextJSInstall,
  generateViteInstall,
  generateHTMLInstall
} from '@/utils'
import styles from './ExportModal.module.css'

const ExportModal = ({ isOpen, onClose, config }) => {
  const [activeTab, setActiveTab] = useState('tailwind')
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
  const jsonTokens = generateJSONTokens(config)
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

  const exportTabs = [
    { id: 'tailwind', label: 'Tailwind', icon: FileCode },
    { id: 'prose', label: 'Prose', icon: Package },
    { id: 'json', label: 'Tokens', icon: Database },
    { id: 'framework', label: 'Framework', icon: Rocket }
  ]

  const CodeSection = ({
    label,
    labelClass,
    code,
    buttonId,
    language = 'css'
  }) => (
    <div>
      <div className={styles.header}>
        <label className={labelClass}>{label}</label>
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
      </div>
      <div className={styles.codeBlock}>
        <CodeBlock code={code} language={language} />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'tailwind':
        return (
          <div key='tailwind' className={styles.tabContent}>
            <CodeSection
              label='Comprehensive Tailwind v4 Config'
              labelClass={styles.label}
              code={comprehensiveTailwind}
              buttonId='comprehensiveTailwind'
            />
            <CodeSection
              label='Basic Tailwind v4'
              labelClass={styles.labelSecondary}
              code={tailwindConfig}
              buttonId='tailwindConfig'
            />
            <CodeSection
              label='Standard CSS Variables'
              labelClass={styles.labelSecondary}
              code={cssVars}
              buttonId='cssVars'
            />
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
      case 'json':
        return (
          <div key='json' className={styles.tabContent}>
            <CodeSection
              label='Design Tokens (JSON)'
              labelClass={styles.label}
              code={jsonTokens}
              buttonId='jsonTokens'
              language='json'
            />
            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                Platform-agnostic tokens that can be used with Figma plugins,
                CSS-in-JS libraries, or imported into Tailwind config files.
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
            />
            <CodeSection
              label='Vite'
              labelClass={styles.labelSecondary}
              code={viteInstall}
              buttonId='viteInstall'
              language='html'
            />
            <CodeSection
              label='Plain HTML'
              labelClass={styles.labelSecondary}
              code={htmlInstall}
              buttonId='htmlInstall'
              language='html'
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
