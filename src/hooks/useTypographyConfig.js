import { useState } from 'react'
import { INITIAL_CONFIG, TYPOGRAPHY_PRESETS } from '@/utils'

const useTypographyConfig = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG)
  const [activeRole, setActiveRole] = useState('headings')
  const [activeElement, setActiveElement] = useState('all')

  const updateConfig = (field, value) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const roleConfig = { ...newConfig[activeRole] }

      // Support updating multiple fields at once if field is an object
      const updates =
        typeof field === 'object' && field !== null ? field : { [field]: value }

      if (activeElement === 'all') {
        // When updating 'all', cascade to all elements in that role
        const updatedRoleConfig = {}
        Object.keys(roleConfig).forEach(element => {
          updatedRoleConfig[element] = {
            ...roleConfig[element],
            ...updates
          }
        })
        newConfig[activeRole] = updatedRoleConfig
      } else {
        // Update specific element
        roleConfig[activeElement] = {
          ...roleConfig[activeElement],
          ...updates
        }
        newConfig[activeRole] = roleConfig
      }

      return newConfig
    })
  }

  const applyPreset = presetId => {
    const preset = TYPOGRAPHY_PRESETS.find(p => p.id === presetId)
    if (preset) {
      // Deep clone the preset config to avoid reference issues
      const presetConfig = JSON.parse(JSON.stringify(preset.config))
      setConfig(presetConfig)
    }
  }

  return {
    config,
    setConfig,
    activeRole,
    setActiveRole,
    activeElement,
    setActiveElement,
    updateConfig,
    applyPreset
  }
}

export default useTypographyConfig
