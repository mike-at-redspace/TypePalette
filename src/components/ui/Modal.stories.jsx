import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'

export default {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs']
}

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Example Modal'
      >
        <p>This is the modal content. You can put anything here.</p>
        <p>Click outside or close button to dismiss.</p>
      </Modal>
    </>
  )
}

export const Default = {
  render: () => <ModalWrapper />
}

const LongContentModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Long Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Modal with Long Content'
      >
        <div>
          <h3>Section 1</h3>
          <p>
            This modal contains a lot of content to demonstrate scrolling
            behavior.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h3>Section 2</h3>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <h3>Section 3</h3>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Modal>
    </>
  )
}

export const WithLongContent = {
  render: () => <LongContentModalWrapper />
}

export const Closed = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Closed Modal',
    children: 'This modal is closed'
  }
}
