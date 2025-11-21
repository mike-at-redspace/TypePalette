import BlogPostPreview from './BlogPostPreview'

export default {
  title: 'Previews/BlogPostPreview',
  component: BlogPostPreview,
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

export const WithCustomFonts = {
  args: {
    style: {
      '--font-heading': 'Fraunces',
      '--font-body': 'Newsreader',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}

export const SansSerif = {
  args: {
    style: {
      '--font-heading': 'Inter',
      '--font-body': 'Inter',
      '--heading-weight': '700',
      '--body-weight': '400'
    }
  }
}
