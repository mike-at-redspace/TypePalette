import { useState } from 'react'
import Tabs from './Tabs'

export default {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs']
}

const DefaultComponent = () => {
  const [active, setActive] = useState('tab1')
  return (
    <Tabs
      active={active}
      onChange={setActive}
      options={[
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' }
      ]}
    />
  )
}

export const Default = {
  render: () => <DefaultComponent />
}
