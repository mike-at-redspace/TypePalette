import { useState, useEffect, Suspense, lazy } from 'react'
import styles from './CodeBlock.module.css'

// Lazy load react-shiki to reduce initial bundle size
// Only load the languages we actually use: css, json, jsx, html
const ShikiHighlighter = lazy(() =>
  import('react-shiki').then(module => ({
    default: module.ShikiHighlighter
  }))
)

const CodeBlock = ({ code, language = 'css' }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Preload react-shiki when component mounts
    import('react-shiki').then(() => setIsLoaded(true))
  }, [])

  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <pre className={styles.fallback}>
            <code>{code}</code>
          </pre>
        }
      >
        <ShikiHighlighter
          language={language}
          theme='github-dark'
          outputFormat='html'
        >
          {code}
        </ShikiHighlighter>
      </Suspense>
    </div>
  )
}

export default CodeBlock
