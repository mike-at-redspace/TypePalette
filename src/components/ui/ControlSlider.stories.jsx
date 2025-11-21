import { useState } from 'react'
import ControlSlider from './ControlSlider'

export default {
  title: 'UI/ControlSlider',
  component: ControlSlider,
  tags: ['autodocs']
}

const SliderWrapper = ({ min = 0, max = 100, step = 1, unit = '' }) => {
  const [value, setValue] = useState((min + max) / 2)
  return (
    <ControlSlider
      label='Example Slider'
      value={value}
      min={min}
      max={max}
      step={step}
      unit={unit}
      onChange={setValue}
    />
  )
}

export const Default = {
  render: () => <SliderWrapper />
}

const TrackingWrapper = () => {
  const [value, setValue] = useState(0)
  return (
    <ControlSlider
      label='Tracking'
      value={value}
      min={-0.1}
      max={0.3}
      step={0.01}
      unit='em'
      onChange={setValue}
    />
  )
}

const LeadingWrapper = () => {
  const [value, setValue] = useState(1.5)
  return (
    <ControlSlider
      label='Leading'
      value={value}
      min={0.8}
      max={2.5}
      step={0.05}
      onChange={setValue}
    />
  )
}

const WeightWrapper = () => {
  const [value, setValue] = useState(400)
  return (
    <ControlSlider
      label='Weight'
      value={value}
      min={100}
      max={900}
      step={100}
      onChange={setValue}
    />
  )
}

const PercentageWrapper = () => {
  const [value, setValue] = useState(50)
  return (
    <ControlSlider
      label='Opacity'
      value={value}
      min={0}
      max={100}
      step={1}
      unit='%'
      onChange={setValue}
    />
  )
}

export const Tracking = {
  render: () => <TrackingWrapper />
}

export const Leading = {
  render: () => <LeadingWrapper />
}

export const Weight = {
  render: () => <WeightWrapper />
}

export const Percentage = {
  render: () => <PercentageWrapper />
}
