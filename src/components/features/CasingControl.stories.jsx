import { useState } from 'react'
import CasingControl from './CasingControl'

export default {
  title: 'Features/CasingControl',
  component: CasingControl,
  tags: ['autodocs']
}

const CasingControlWrapper = () => {
  const [value, setValue] = useState('none')
  return <CasingControl value={value} onChange={setValue} />
}

export const Default = {
  render: () => <CasingControlWrapper />
}

export const None = {
  args: {
    value: 'none',
    onChange: () => {}
  }
}

export const Uppercase = {
  args: {
    value: 'uppercase',
    onChange: () => {}
  }
}

export const Lowercase = {
  args: {
    value: 'lowercase',
    onChange: () => {}
  }
}
