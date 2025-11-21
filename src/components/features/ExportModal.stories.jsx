import { useState } from 'react'
import ExportModal from './ExportModal'
import Button from '@/components/ui/Button'
import { INITIAL_CONFIG } from '@/utils'

export default {
  title: 'Features/ExportModal',
  component: ExportModal,
  tags: ['autodocs']
}

const ExportModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Export Modal</Button>
      <ExportModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        config={INITIAL_CONFIG}
      />
    </>
  )
}

export const Default = {
  render: () => <ExportModalWrapper />
}

export const Open = {
  args: {
    isOpen: true,
    onClose: () => {},
    config: INITIAL_CONFIG
  }
}

export const Closed = {
  args: {
    isOpen: false,
    onClose: () => {},
    config: INITIAL_CONFIG
  }
}
