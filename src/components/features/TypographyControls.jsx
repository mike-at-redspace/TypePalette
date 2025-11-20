import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react'
import { ControlSlider, Select } from '@/components/ui'
import CasingControl from './CasingControl'
import styles from './TypographyControls.module.css'

const TypographyControls = ({
  config,
  activeRole,
  activeElement,
  onUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentConfig =
    config[activeRole]?.[activeElement] || config[activeRole]?.all || {}

  return (
    <div className={styles.container}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={styles.title}>
          <Sliders size={12} />
          Advanced
        </h3>
        {isOpen ? (
          <ChevronUp size={14} className={styles.chevron} />
        ) : (
          <ChevronDown size={14} className={styles.chevron} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.accordionContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.weightControl}>
              <label className={styles.label}>Weight</label>
              <Select
                value={currentConfig.weight}
                onChange={e => onUpdate('weight', e.target.value)}
              >
                <option value='300'>Light (300)</option>
                <option value='400'>Regular (400)</option>
                <option value='500'>Medium (500)</option>
                <option value='600'>Semi-Bold (600)</option>
                <option value='700'>Bold (700)</option>
                <option value='900'>Black (900)</option>
              </Select>
            </div>

            <ControlSlider
              label='Tracking'
              value={parseFloat(currentConfig.tracking || 0)}
              min={-0.1}
              max={0.3}
              step={0.01}
              unit='em'
              onChange={val => onUpdate('tracking', val.toString())}
            />

            <ControlSlider
              label='Leading'
              value={parseFloat(currentConfig.leading || 1.5)}
              min={0.8}
              max={2.5}
              step={0.05}
              onChange={val => onUpdate('leading', val.toString())}
            />

            <CasingControl
              value={currentConfig.transform || 'none'}
              onChange={value => onUpdate('transform', value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TypographyControls
