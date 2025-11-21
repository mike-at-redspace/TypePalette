import CodeBlock from './CodeBlock'

export default {
  title: 'UI/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs']
}

export const CSS = {
  args: {
    code: `:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --heading-weight: 700;
  --body-weight: 400;
}`,
    language: 'css'
  }
}

export const JavaScript = {
  args: {
    code: `const config = {
  headings: {
    family: 'Playfair Display',
    weight: 700,
    tracking: -0.02
  },
  body: {
    family: 'Inter',
    weight: 400,
    leading: 1.6
  }
}`,
    language: 'javascript'
  }
}

export const JSX = {
  args: {
    code: `import { Button } from '@/components/ui'

const App = () => {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
    </div>
  )
}`,
    language: 'jsx'
  }
}

export const JSON = {
  args: {
    code: `{
  "headings": {
    "family": "Playfair Display",
    "weight": 700
  },
  "body": {
    "family": "Inter",
    "weight": 400
  }
}`,
    language: 'json'
  }
}
