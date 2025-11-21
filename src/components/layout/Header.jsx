import { Type, Code, Download } from 'lucide-react'
import { Button } from '@/components/ui'
import { generateExportZip } from '@/utils'
import styles from './Header.module.css'

const Header = ({ onExportClick, config }) => {
  const handleDownload = async () => {
    if (config) {
      await generateExportZip(config)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Type size={20} className={styles.typeIcon} />
        </div>
        <span className={styles.logoText}>TypePalette</span>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleDownload}>
          <Download size={16} />
          <span>DOWNLOAD</span>
        </Button>
        <Button onClick={onExportClick}>
          <Code size={16} />
          <span>CODE</span>
        </Button>
      </div>
    </header>
  )
}

export default Header
