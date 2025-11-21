import DashboardPreview from './DashboardPreview'

export default {
  title: 'Previews/DashboardPreview',
  component: DashboardPreview,
  tags: ['autodocs']
}

export const Default = {
  args: {
    style: {
      '--font-heading': 'Inter',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}

export const WithSerifHeadings = {
  args: {
    style: {
      '--font-heading': 'Playfair Display',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}

export const Monospace = {
  args: {
    style: {
      '--font-heading': 'Space Mono',
      '--font-body': 'Space Mono',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}
