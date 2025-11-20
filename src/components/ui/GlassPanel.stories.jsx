import GlassPanel from './GlassPanel'

export default {
  title: 'UI/GlassPanel',
  component: GlassPanel,
  tags: ['autodocs']
}

export const Default = {
  args: {
    children: 'Glass Panel Content'
  }
}

export const WithPadding = {
  args: {
    children: 'Glass Panel with Padding',
    className: 'p-6'
  }
}
