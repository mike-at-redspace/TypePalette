import ButtonGroup from './ButtonGroup'

const CasingControl = ({ value, onChange }) => {
  const options = [
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' }
  ]

  return (
    <ButtonGroup
      label='Casing'
      value={value}
      onChange={onChange}
      options={options}
      layoutId='activeCasing'
    />
  )
}

export default CasingControl
