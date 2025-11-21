import { Type, Settings, LayoutDashboard } from 'lucide-react'
import SectionTitle from './SectionTitle'

export default {
  title: 'UI/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs']
}

export const WithIcon = {
  args: {
    icon: Type,
    children: 'Typography Settings'
  }
}

export const WithSettingsIcon = {
  args: {
    icon: Settings,
    children: 'Configuration'
  }
}

export const WithDashboardIcon = {
  args: {
    icon: LayoutDashboard,
    children: 'Dashboard'
  }
}

export const WithoutIcon = {
  args: {
    children: 'Section Title'
  }
}
