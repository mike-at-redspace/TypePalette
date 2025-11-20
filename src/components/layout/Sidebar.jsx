import { LayoutDashboard } from 'lucide-react'
import { Tabs, Select } from '@/components/ui'
import {
  FontSelector,
  TypographyControls,
  PresetSelector
} from '@/components/features'
import { GOOGLE_FONTS } from '@/utils'
import styles from './Sidebar.module.css'

const getElementOptions = role => {
  switch (role) {
    case 'headings':
      return [
        { value: 'all', label: 'All Headings' },
        { value: 'h1', label: 'H1' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h4', label: 'H4' },
        { value: 'h5', label: 'H5' },
        { value: 'h6', label: 'H6' }
      ]
    case 'body':
      return [
        { value: 'all', label: 'All Body' },
        { value: 'paragraph', label: 'Paragraph' },
        { value: 'strong', label: 'Strong' },
        { value: 'emphasis', label: 'Emphasis' },
        { value: 'blockquote', label: 'Blockquote' },
        { value: 'code', label: 'Code' },
        { value: 'link', label: 'Link' }
      ]
    case 'ui':
      return [
        { value: 'all', label: 'All Interface' },
        { value: 'button', label: 'Button' },
        { value: 'label', label: 'Label' },
        { value: 'input', label: 'Input' }
      ]
    default:
      return []
  }
}

const Sidebar = ({
  mode,
  onModeChange,
  activeRole,
  onRoleChange,
  activeElement,
  onElementChange,
  config,
  searchQuery,
  onSearchChange,
  onUpdate,
  onApplyPreset
}) => {
  const elementOptions = getElementOptions(activeRole)
  const currentConfig =
    config[activeRole]?.[activeElement] || config[activeRole]?.all

  return (
    <aside className={styles.sidebar}>
      <div className={styles.modeSection}>
        <Tabs
          active={mode}
          onChange={onModeChange}
          options={[
            { id: 'preset', label: 'Preset' },
            { id: 'custom', label: 'Custom' }
          ]}
        />
      </div>
      {mode === 'preset' ? (
        <div className={styles.presetSection}>
          <PresetSelector onApplyPreset={onApplyPreset} />
        </div>
      ) : (
        <>
          <div className={styles.roleSection}>
            <h2 className={styles.sectionTitle}>
              <LayoutDashboard size={14} /> Context
            </h2>
            <Tabs
              active={activeRole}
              onChange={onRoleChange}
              options={[
                { id: 'headings', label: 'Headings' },
                { id: 'body', label: 'Body' },
                { id: 'ui', label: 'Interface' }
              ]}
            />
            <div className={styles.elementSelector}>
              <Select
                value={activeElement}
                onChange={e => onElementChange(e.target.value)}
                className={styles.elementSelect}
              >
                {elementOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.typefaceSection}>
              <FontSelector
                activeFamily={currentConfig?.family}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onFontSelect={family => {
                  const font = GOOGLE_FONTS.find(f => f.name === family)
                  if (font) {
                    // Update both family and category in a single atomic update
                    onUpdate({ family, category: font.category })
                  }
                }}
              />
              <TypographyControls
                config={config}
                activeRole={activeRole}
                activeElement={activeElement}
                onUpdate={onUpdate}
              />
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

export default Sidebar
