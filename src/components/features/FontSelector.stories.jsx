import { useState } from 'react'
import FontSelector from './FontSelector'

export default {
  title: 'Features/FontSelector',
  component: FontSelector,
  tags: ['autodocs']
}

const DefaultComponent = () => {
  const [activeFamily, setActiveFamily] = useState('Inter')
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <FontSelector
      activeFamily={activeFamily}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onFontSelect={setActiveFamily}
    />
  )
}

export const Default = {
  render: () => <DefaultComponent />
}
