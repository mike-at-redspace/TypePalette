import { Type, Code } from 'lucide-react'
import { Button } from '@/components/ui'
import styles from './Header.module.css'

const Header = ({ onExportClick }) => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <Type size={20} className={styles.typeIcon} />
      </div>
      <span className={styles.logoText}>TypeScale</span>
    </div>
    <div className={styles.actions}>
      <Button onClick={onExportClick}>
        <Code size={16} />
        <span>EXPORT CONFIG</span>
      </Button>
    </div>
  </header>
)

export default Header
