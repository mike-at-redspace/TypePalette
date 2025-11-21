import PresetSelector from './PresetSelector'

export default {
  title: 'Features/PresetSelector',
  component: PresetSelector,
  tags: ['autodocs']
}

export const Default = {
  args: {
    onApplyPreset: presetId => {
      console.log('Applied preset:', presetId)
    }
  }
}
