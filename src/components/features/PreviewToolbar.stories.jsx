import { useState } from 'react'
import PreviewToolbar from './PreviewToolbar'

export default {
  title: 'Features/PreviewToolbar',
  component: PreviewToolbar,
  tags: ['autodocs']
}

const PreviewToolbarWrapper = () => {
  const [activeMode, setActiveMode] = useState('blog')
  return <PreviewToolbar activeMode={activeMode} onModeChange={setActiveMode} />
}

export const Default = {
  render: () => <PreviewToolbarWrapper />
}

export const BlogMode = {
  args: {
    activeMode: 'blog',
    onModeChange: () => {}
  }
}

export const DashboardMode = {
  args: {
    activeMode: 'dashboard',
    onModeChange: () => {}
  }
}

export const MarketingMode = {
  args: {
    activeMode: 'marketing',
    onModeChange: () => {}
  }
}

export const TailwindMode = {
  args: {
    activeMode: 'tailwind',
    onModeChange: () => {}
  }
}
