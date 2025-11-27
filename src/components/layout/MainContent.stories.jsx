import { useState } from 'react'
import MainContent from './MainContent'

export default {
  title: 'Layout/MainContent',
  component: MainContent,
  tags: ['autodocs']
}

const MainContentWrapper = () => {
  const [previewMode, setPreviewMode] = useState('blog')
  const previewStyles = {
    '--font-heading': 'Playfair Display',
    '--font-body': 'Inter',
    '--heading-weight': '700',
    '--body-weight': '400'
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <MainContent
        previewMode={previewMode}
        onModeChange={setPreviewMode}
        previewStyles={previewStyles}
      />
    </div>
  )
}

export const Default = {
  render: () => <MainContentWrapper />
}

export const BlogMode = {
  args: {
    previewMode: 'blog',
    onModeChange: () => {},
    previewStyles: {
      '--font-heading': 'Playfair Display',
      '--font-body': 'Inter'
    }
  }
}

export const DashboardMode = {
  args: {
    previewMode: 'dashboard',
    onModeChange: () => {},
    previewStyles: {
      '--font-heading': 'Inter',
      '--font-body': 'Inter'
    }
  }
}

export const MarketingMode = {
  args: {
    previewMode: 'marketing',
    onModeChange: () => {},
    previewStyles: {
      '--font-heading': 'Playfair Display',
      '--font-body': 'Inter'
    }
  }
}

export const TailwindMode = {
  args: {
    previewMode: 'tailwind',
    onModeChange: () => {},
    previewStyles: {
      '--font-heading': 'Inter',
      '--font-body': 'Inter'
    }
  }
}
