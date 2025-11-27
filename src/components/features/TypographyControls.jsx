import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react'
import { ControlSlider } from '@/components/ui'
import CasingControl from './CasingControl'
import ButtonGroup from './ButtonGroup'
import styles from './TypographyControls.module.css'

const FontStyleControl = ({ value, onChange }) => {
  const options = [
    { value: 'normal', label: 'Normal' },
    { value: 'italic', label: 'Italic' },
    { value: 'oblique', label: 'Oblique' }
  ]

  return (
    <ButtonGroup
      label='Style'
      value={value}
      onChange={onChange}
      options={options}
      layoutId='activeFontStyle'
      buttonStyle='fontStyle'
    />
  )
}

const TextDecorationControl = ({ value, onChange }) => {
  const options = [
    { value: 'none', label: 'None' },
    { value: 'underline', label: 'Underline' },
    { value: 'line-through', label: 'Line-through' }
  ]

  return (
    <ButtonGroup
      label='Decoration'
      value={value}
      onChange={onChange}
      options={options}
      layoutId='activeTextDecoration'
      buttonStyle='textDecoration'
    />
  )
}

const WEIGHT_OPTIONS = [
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi-Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '900', label: 'Black (900)' }
]

const WeightSelect = ({ value, onChange, fontFamily, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const selectedOption = options.find(opt => opt.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Scroll selected option into view when dropdown opens
      if (dropdownRef.current) {
        const selectedElement = dropdownRef.current.querySelector(
          `[data-value="${value}"]`
        )
        if (selectedElement) {
          selectedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          })
        }
      }
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, value])

  return (
    <div className={styles.weightSelectContainer} ref={containerRef}>
      <button
        type='button'
        className={styles.weightSelectTrigger}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontFamily: `"${fontFamily}", sans-serif`,
          fontWeight: value || '400'
        }}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown
          size={14}
          className={`${styles.weightSelectChevron} ${isOpen ? styles.open : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className={styles.weightSelectDropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(option => (
              <button
                key={option.value}
                type='button'
                data-value={option.value}
                className={`${styles.weightSelectOption} ${
                  value === option.value ? styles.selected : ''
                }`}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                style={{
                  fontFamily: `"${fontFamily}", sans-serif`,
                  fontWeight: option.value
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TypographyControls = ({
  config,
  activeRole,
  activeElement,
  onUpdate,
  baseSize
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentConfig =
    config[activeRole]?.[activeElement] || config[activeRole]?.all || {}

  const fontFamily = currentConfig.family || 'Inter'
  const baseSizeValue = parseFloat(baseSize || '1')

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
            initial={{ maxHeight: 0, opacity: 0, y: -10 }}
            animate={{ maxHeight: 1000, opacity: 1, y: 0 }}
            exit={{ maxHeight: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.weightControl}>
              <label className={styles.label}>Weight</label>
              <WeightSelect
                value={currentConfig.weight}
                onChange={weight => onUpdate('weight', weight)}
                fontFamily={fontFamily}
                options={WEIGHT_OPTIONS}
              />
            </div>

            <div className={styles.baseSizeSection}>
              <ControlSlider
                label='Base Size'
                value={baseSizeValue}
                min={0.75}
                max={1.5}
                step={0.05}
                unit='rem'
                onChange={val => onUpdate('baseSize', val.toString())}
              />
              <p className={styles.baseSizeDisclaimer}>
                Sets the document <code>rem</code> size for previews and exports.
              </p>
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

            <ControlSlider
              label='Word Spacing'
              value={parseFloat(currentConfig.wordSpacing || 0)}
              min={-0.1}
              max={0.3}
              step={0.01}
              unit='em'
              onChange={val => onUpdate('wordSpacing', val.toString())}
            />

            <CasingControl
              value={currentConfig.transform || 'none'}
              onChange={value => onUpdate('transform', value)}
            />

            <FontStyleControl
              value={currentConfig.fontStyle || 'normal'}
              onChange={value => onUpdate('fontStyle', value)}
            />

            <TextDecorationControl
              value={currentConfig.textDecoration || 'none'}
              onChange={value => onUpdate('textDecoration', value)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TypographyControls
