import MarketingPreview from './MarketingPreview'

export default {
  title: 'Previews/MarketingPreview',
  component: MarketingPreview,
  tags: ['autodocs']
}

export const Default = {
  args: {
    style: {
      '--font-heading': 'Playfair Display',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}

export const BoldDisplay = {
  args: {
    style: {
      '--font-heading': 'Bebas Neue',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}

export const ModernSans = {
  args: {
    style: {
      '--font-heading': 'Space Grotesk',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}
