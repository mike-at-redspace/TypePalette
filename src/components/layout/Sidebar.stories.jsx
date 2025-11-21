import { useState } from 'react'
import Sidebar from './Sidebar'
import { INITIAL_CONFIG } from '@/utils'

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs']
}

const SidebarWrapper = () => {
  const [mode, setMode] = useState('preset')
  const [activeRole, setActiveRole] = useState('headings')
  const [activeElement, setActiveElement] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [config, setConfig] = useState(INITIAL_CONFIG)

  const handleUpdate = (field, value) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const roleConfig = { ...newConfig[activeRole] }
      const elementConfig = roleConfig[activeElement] || roleConfig.all || {}

      if (typeof field === 'object') {
        // Handle object updates (e.g., { family, category })
        if (activeElement === 'all') {
          Object.keys(roleConfig).forEach(element => {
            roleConfig[element] = {
              ...roleConfig[element],
              ...field
            }
          })
        } else {
          roleConfig[activeElement] = {
            ...elementConfig,
            ...field
          }
        }
      } else {
        // Handle single field updates
        if (activeElement === 'all') {
          Object.keys(roleConfig).forEach(element => {
            roleConfig[element] = {
              ...roleConfig[element],
              [field]: value
            }
          })
        } else {
          roleConfig[activeElement] = {
            ...elementConfig,
            [field]: value
          }
        }
      }

      newConfig[activeRole] = roleConfig
      return newConfig
    })
  }

  const handleApplyPreset = presetId => {
    console.log('Applied preset:', presetId)
  }

  return (
    <div style={{ width: '400px', height: '600px' }}>
      <Sidebar
        mode={mode}
        onModeChange={setMode}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        activeElement={activeElement}
        onElementChange={setActiveElement}
        config={config}
        searchQuery={searchQuery}
        onSearchChange={e => setSearchQuery(e.target.value)}
        onUpdate={handleUpdate}
        onApplyPreset={handleApplyPreset}
      />
    </div>
  )
}

export const Default = {
  render: () => <SidebarWrapper />
}

export const PresetMode = {
  args: {
    mode: 'preset',
    onModeChange: () => {},
    activeRole: 'headings',
    onRoleChange: () => {},
    activeElement: 'all',
    onElementChange: () => {},
    config: INITIAL_CONFIG,
    searchQuery: '',
    onSearchChange: () => {},
    onUpdate: () => {},
    onApplyPreset: () => {}
  }
}

export const CustomMode = {
  args: {
    mode: 'custom',
    onModeChange: () => {},
    activeRole: 'headings',
    onRoleChange: () => {},
    activeElement: 'all',
    onElementChange: () => {},
    config: INITIAL_CONFIG,
    searchQuery: '',
    onSearchChange: () => {},
    onUpdate: () => {},
    onApplyPreset: () => {}
  }
}
