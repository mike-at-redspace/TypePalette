import { useState } from 'react'
import { INITIAL_CONFIG, TYPOGRAPHY_PRESETS } from '@/utils'

const useTypographyConfig = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG)
  const [activeRole, setActiveRole] = useState('headings')
  const [activeElement, setActiveElement] = useState('all')

  const updateConfig = (field, value) => {
    const resolvedUpdates =
      typeof field === 'object' && field !== null ? field : { [field]: value }

    const updates = { ...resolvedUpdates }
    const baseSizeUpdate = updates.baseSize
    delete updates.baseSize

    setConfig(prev => {
      const newConfig = { ...prev }

      if (baseSizeUpdate !== undefined) {
        newConfig.baseSize = String(baseSizeUpdate)
      }

      if (Object.keys(updates).length === 0) {
        return newConfig
      }

      const roleConfig = { ...newConfig[activeRole] }

      if (activeElement === 'all') {
        const updatedRoleConfig = {}
        Object.keys(roleConfig).forEach(element => {
          updatedRoleConfig[element] = {
            ...roleConfig[element],
            ...updates
          }
        })
        newConfig[activeRole] = updatedRoleConfig
      } else {
        const existingElementConfig =
          roleConfig[activeElement] || roleConfig.all || {}

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
