import Header from './Header'
import { INITIAL_CONFIG } from '@/utils'

export default {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs']
}

export const Default = {
  args: {
    onExportClick: () => {
      console.log('Export clicked')
    },
    config: INITIAL_CONFIG
  }
}

export const WithoutConfig = {
  args: {
    onExportClick: () => {
      console.log('Export clicked')
    },
    config: null
  }
}
