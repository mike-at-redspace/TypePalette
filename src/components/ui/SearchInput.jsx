import { Search, X } from 'lucide-react'
import styles from './SearchInput.module.css'

const SearchInput = ({
  placeholder = 'Search...',
  value,
  onChange,
  ...props
}) => {
  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' }
      }
      onChange(event)
    }
  }

  return (
    <div className={`${styles.container} group`}>
      <Search className={styles.icon} size={14} />
      <input
        type='text'
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />
      {value && (
        <button
          type='button'
          onClick={handleClear}
          className={styles.clearButton}
          aria-label='Clear search'
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default SearchInput
