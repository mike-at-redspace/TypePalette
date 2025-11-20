import { useState } from 'react'
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
      <motion.div
        className={styles.codeBlock}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <CodeBlock code={code} language={language} />
      </motion.div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'tailwind':
        return (
          <motion.div
            key='tailwind'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            <CodeSection
              label='@tailwindcss/typography Configuration'
              labelClass={styles.label}
              code={proseConfig}
              buttonId='proseConfig'
            />
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={styles.infoText}>
                <strong>Install:</strong>{' '}
                <code>npm install @tailwindcss/typography</code>
              </p>
              <p className={styles.infoText}>
                <strong>Usage:</strong> Add <code>class="prose"</code> to any
                container with long-form content.
              </p>
            </motion.div>
          </motion.div>
        )
      case 'json':
        return (
          <motion.div
            key='json'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            <CodeSection
              label='Design Tokens (JSON)'
              labelClass={styles.label}
              code={jsonTokens}
              buttonId='jsonTokens'
              language='json'
            />
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={styles.infoText}>
                Platform-agnostic tokens that can be used with Figma plugins,
                CSS-in-JS libraries, or imported into Tailwind config files.
              </p>
            </motion.div>
          </motion.div>
        )
      case 'framework':
        return (
          <motion.div
            key='framework'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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
        <Tabs
          active={activeTab}
          options={exportTabs}
          onChange={setActiveTab}
          layoutId='exportTab'
        />
        <AnimatePresence mode='wait'>{renderContent()}</AnimatePresence>
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
