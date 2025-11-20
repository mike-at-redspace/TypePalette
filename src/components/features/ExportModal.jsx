import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isContentReady, setIsContentReady] = useState(false)
  const contentRef = useRef(null)

  // Reset scroll position when tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeTab])

  // Ensure content is ready before showing
  useEffect(() => {
    if (isOpen) {
      setIsContentReady(false)
      // Small delay to ensure code blocks are ready
      const timer = setTimeout(() => {
        setIsContentReady(true)
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setIsContentReady(false)
    }
  }, [isOpen, activeTab])

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
        <motion.button
          onClick={() => handleCopy(code, buttonId)}
          className={styles.copyButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode='wait'>
            {copiedButton === buttonId ? (
              <motion.div
                key='check'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={styles.copyButtonContent}
              >
                <Check size={12} className={styles.checkIcon} /> Copied
              </motion.div>
            ) : (
              <motion.div
                key='copy'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={styles.copyButtonContent}
              >
                <Copy size={12} /> Copy
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
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
          <motion.div
            key='tailwind'
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            className={styles.tabContent}
          >
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
          </motion.div>
        )
      case 'prose':
        return (
          <motion.div
            key='prose'
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            className={styles.tabContent}
          >
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
          </motion.div>
        )
      case 'json':
        return (
          <motion.div
            key='json'
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            className={styles.tabContent}
          >
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
          </motion.div>
        )
      case 'framework':
        return (
          <motion.div
            key='framework'
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            className={styles.tabContent}
          >
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
          </motion.div>
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
            layoutId='exportTab'
          />
        </div>
        <div className={styles.tabContentWrapper} ref={contentRef}>
          {isContentReady && (
            <AnimatePresence mode='wait' initial={false}>
              {renderContent()}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Generated by TypePalette • Remember to import Google Fonts separately.
        </p>
      </div>
    </Modal>
  )
}

export default ExportModal
