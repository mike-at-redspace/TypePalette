import { Layers } from 'lucide-react'
import { TYPOGRAPHY_PRESETS } from '@/utils'
import styles from './PresetSelector.module.css'

const PresetSelector = ({ onApplyPreset }) => {
  return (
    <div className={styles.container}>
      <p className={styles.instruction}>
        Start by selecting a preset, then switch to{' '}
        <strong className='text-white/80'>CUSTOM</strong> to fine-tune fonts for
        each HTML element.
      </p>
      <h3 className={styles.title}>
        <span>
          <Layers size={14} />
          Presets
        </span>
      </h3>
      <div className={styles.presetList}>
        {TYPOGRAPHY_PRESETS.map(preset => {
          const headingConfig = preset.config.headings?.all || {}
          const bodyConfig = preset.config.body?.all || {}

          const headingStyle = {
            fontFamily: `"${headingConfig.family}", ${headingConfig.category === 'Serif' ? 'serif' : 'sans-serif'}`,
            fontWeight: headingConfig.weight || '700',
            letterSpacing: `${headingConfig.tracking || 0}em`,
            lineHeight: headingConfig.leading || '1.1'
          }

          const bodyStyle = {
            fontFamily: `"${bodyConfig.family}", ${bodyConfig.category === 'Serif' ? 'serif' : bodyConfig.category === 'Monospace' ? 'monospace' : 'sans-serif'}`,
            fontWeight: bodyConfig.weight || '400',
            letterSpacing: `${bodyConfig.tracking || 0}em`,
            lineHeight: bodyConfig.leading || '1.6'
          }

          return (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              className={styles.presetItem}
            >
              <div className={styles.presetHeader}>
                <span className={styles.presetName} style={headingStyle}>
                  {preset.name}
                </span>
              </div>
              <p className={styles.presetDescription} style={bodyStyle}>
                {preset.description}
              </p>
              <p className={styles.presetVibe} style={bodyStyle}>
                {preset.vibe}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PresetSelector
