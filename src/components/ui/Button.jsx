import styles from './Button.module.css'

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary
  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
