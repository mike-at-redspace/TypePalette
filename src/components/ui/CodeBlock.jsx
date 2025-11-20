import { ShikiHighlighter } from 'react-shiki'
import styles from './CodeBlock.module.css'

const CodeBlock = ({ code, language = 'css' }) => {
  return (
    <div className={styles.container}>
      <ShikiHighlighter
        language={language}
        theme='github-dark'
        outputFormat='html'
      >
        {code}
      </ShikiHighlighter>
    </div>
  )
}

export default CodeBlock
