import { useState } from 'react'
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

  const renderContent = () => {
    switch (activeTab) {
      case 'tailwind':
        return (
          <div className={styles.tabContent}>
            <div>
              <div className={styles.header}>
                <label className={styles.label}>
                  Comprehensive Tailwind v4 Config
                </label>
                <button
                  onClick={() =>
                    handleCopy(comprehensiveTailwind, 'comprehensiveTailwind')
                  }
                  className={styles.copyButton}
                >
                  {copiedButton === 'comprehensiveTailwind' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={comprehensiveTailwind} language='css' />
              </div>
            </div>
            <div>
              <div className={styles.header}>
                <label className={styles.labelSecondary}>
                  Basic Tailwind v4
                </label>
                <button
                  onClick={() => handleCopy(tailwindConfig, 'tailwindConfig')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'tailwindConfig' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={tailwindConfig} language='css' />
              </div>
            </div>
            <div>
              <div className={styles.header}>
                <label className={styles.labelSecondary}>
                  Standard CSS Variables
                </label>
                <button
                  onClick={() => handleCopy(cssVars, 'cssVars')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'cssVars' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={cssVars} language='css' />
              </div>
            </div>
          </div>
        )
      case 'prose':
        return (
          <div className={styles.tabContent}>
            <div>
              <div className={styles.header}>
                <label className={styles.label}>
                  @tailwindcss/typography Configuration
                </label>
                <button
                  onClick={() => handleCopy(proseConfig, 'proseConfig')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'proseConfig' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={proseConfig} language='css' />
              </div>
            </div>
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
          <div className={styles.tabContent}>
            <div>
              <div className={styles.header}>
                <label className={styles.label}>Design Tokens (JSON)</label>
                <button
                  onClick={() => handleCopy(jsonTokens, 'jsonTokens')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'jsonTokens' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={jsonTokens} language='json' />
              </div>
            </div>
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
          <div className={styles.tabContent}>
            <div>
              <div className={styles.header}>
                <label className={styles.label}>
                  Next.js (next/font/google)
                </label>
                <button
                  onClick={() => handleCopy(nextJSInstall, 'nextJSInstall')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'nextJSInstall' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={nextJSInstall} language='jsx' />
              </div>
            </div>
            <div>
              <div className={styles.header}>
                <label className={styles.labelSecondary}>Vite</label>
                <button
                  onClick={() => handleCopy(viteInstall, 'viteInstall')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'viteInstall' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={viteInstall} language='html' />
              </div>
            </div>
            <div>
              <div className={styles.header}>
                <label className={styles.labelSecondary}>Plain HTML</label>
                <button
                  onClick={() => handleCopy(htmlInstall, 'htmlInstall')}
                  className={styles.copyButton}
                >
                  {copiedButton === 'htmlInstall' ? (
                    <>
                      <Check size={12} className={styles.checkIcon} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className={styles.codeBlock}>
                <CodeBlock code={htmlInstall} language='html' />
              </div>
            </div>
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
        <Tabs active={activeTab} options={exportTabs} onChange={setActiveTab} />
        {renderContent()}
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
