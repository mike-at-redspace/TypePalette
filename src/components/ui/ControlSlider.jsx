import styles from './ControlSlider.module.css'

const ControlSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = ''
}) => (
  <div className={`${styles.container} group`}>
    <div className={styles.header}>
      <label className={styles.label}>{label}</label>
      <span className={styles.value}>
        {value}
        {unit}
      </span>
    </div>
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className={styles.input}
      />
    </div>
  </div>
)

export default ControlSlider
