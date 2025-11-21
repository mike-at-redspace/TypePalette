import { useState } from 'react'
import SearchInput from './SearchInput'

export default {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs']
}

const SearchInputWrapper = () => {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      placeholder='Search fonts...'
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

export const Default = {
  render: () => <SearchInputWrapper />
}

export const WithValue = {
  args: {
    placeholder: 'Search fonts...',
    value: 'Inter',
    onChange: () => {}
  }
}

export const Empty = {
  args: {
    placeholder: 'Search fonts...',
    value: '',
    onChange: () => {}
  }
}

export const CustomPlaceholder = {
  args: {
    placeholder: 'Type to search...',
    value: '',
    onChange: () => {}
  }
}
