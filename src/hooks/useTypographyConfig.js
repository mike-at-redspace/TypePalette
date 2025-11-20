import { useState } from 'react'
import { INITIAL_CONFIG, TYPOGRAPHY_PRESETS } from '@/utils'

const useTypographyConfig = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG)
  const [activeRole, setActiveRole] = useState('headings')
  const [activeElement, setActiveElement] = useState('all')

  const updateConfig = (field, value) => {
    setConfig(prev => {
      // Create a deep copy of the config to avoid reference issues
      const newConfig = { ...prev }
      const roleConfig = { ...newConfig[activeRole] }

      // Support updating multiple fields at once if field is an object
      const updates =
        typeof field === 'object' && field !== null ? field : { [field]: value }

      if (activeElement === 'all') {
        // When updating 'all', cascade to all elements in that role
        const updatedRoleConfig = {}
        Object.keys(roleConfig).forEach(element => {
          // Create a new object for each element to ensure isolation
          updatedRoleConfig[element] = {
            ...roleConfig[element],
            ...updates
          }
        })
        newConfig[activeRole] = updatedRoleConfig
      } else {
        // When updating a specific element, only update that element
        // Ensure the element exists, or initialize it from 'all' if it doesn't
        const existingElementConfig =
          roleConfig[activeElement] || roleConfig.all || {}

        // Create a new object for the specific element to ensure isolation
        // Only update the specific element, leaving all other elements unchanged
        const updatedRoleConfig = {
          ...roleConfig,
          [activeElement]: {
            ...existingElementConfig,
            ...updates
          }
        }
        newConfig[activeRole] = updatedRoleConfig
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
