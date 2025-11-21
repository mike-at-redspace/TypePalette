import { useState } from 'react'
import TypographyControls from './TypographyControls'
import { INITIAL_CONFIG } from '@/utils'

export default {
  title: 'Features/TypographyControls',
  component: TypographyControls,
  tags: ['autodocs']
}

const TypographyControlsWrapper = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG)
  const [activeRole] = useState('headings')
  const [activeElement] = useState('all')

  const handleUpdate = (field, value) => {
    setConfig(prev => {
      const newConfig = { ...prev }
      const roleConfig = { ...newConfig[activeRole] }
      const elementConfig = roleConfig[activeElement] || roleConfig.all || {}

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

      newConfig[activeRole] = roleConfig
      return newConfig
    })
  }

  return (
    <TypographyControls
      config={config}
      activeRole={activeRole}
      activeElement={activeElement}
      onUpdate={handleUpdate}
    />
  )
}

export const Default = {
  render: () => <TypographyControlsWrapper />
}

export const Headings = {
  args: {
    config: INITIAL_CONFIG,
    activeRole: 'headings',
    activeElement: 'all',
    onUpdate: () => {}
  }
}

export const Body = {
  args: {
    config: INITIAL_CONFIG,
    activeRole: 'body',
    activeElement: 'paragraph',
    onUpdate: () => {}
  }
}

export const UI = {
  args: {
    config: INITIAL_CONFIG,
    activeRole: 'ui',
    activeElement: 'button',
    onUpdate: () => {}
  }
}
