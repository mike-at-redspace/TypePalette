import { useState } from 'react'
import Select from './Select'

export default {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs']
}

const SelectWrapper = () => {
  const [value, setValue] = useState('option1')
  return (
    <Select value={value} onChange={e => setValue(e.target.value)}>
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
    </Select>
  )
}

export const Default = {
  render: () => <SelectWrapper />
}

const WithManyOptionsWrapper = () => {
  const [value, setValue] = useState('h1')
  return (
    <Select value={value} onChange={e => setValue(e.target.value)}>
      <option value='all'>All Headings</option>
      <option value='h1'>H1</option>
      <option value='h2'>H2</option>
      <option value='h3'>H3</option>
      <option value='h4'>H4</option>
      <option value='h5'>H5</option>
      <option value='h6'>H6</option>
    </Select>
  )
}

const FontFamilyWrapper = () => {
  const [value, setValue] = useState('Inter')
  return (
    <Select value={value} onChange={e => setValue(e.target.value)}>
      <option value='Inter'>Inter</option>
      <option value='Roboto'>Roboto</option>
      <option value='Open Sans'>Open Sans</option>
      <option value='Lato'>Lato</option>
      <option value='Montserrat'>Montserrat</option>
    </Select>
  )
}

export const WithManyOptions = {
  render: () => <WithManyOptionsWrapper />
}

export const FontFamily = {
  render: () => <FontFamilyWrapper />
}
