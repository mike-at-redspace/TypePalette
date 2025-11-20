// JSZip is lazy loaded to reduce initial bundle size

const getFontFamily = (family, category) => {
  const fallback = category.toLowerCase().includes('serif')
    ? 'serif'
    : 'sans-serif'
  return `"${family}", ${fallback}`
}

export const generateCSSExport = config => {
  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  let css = `
:root {
  /* Typography System - Base */
  --font-heading: ${getFontFamily(headingConfig.family, headingConfig.category)};
  --font-body: ${getFontFamily(bodyConfig.family, bodyConfig.category)};
  --font-ui: ${getFontFamily(uiConfig.family, uiConfig.category)};

  /* Base Config */
  --heading-weight: ${headingConfig.weight};
  --heading-tracking: ${headingConfig.tracking}em;
  --heading-leading: ${headingConfig.leading};
  --heading-transform: ${headingConfig.transform};

  --body-weight: ${bodyConfig.weight};
  --body-tracking: ${bodyConfig.tracking}em;
  --body-leading: ${bodyConfig.leading};
  --body-transform: ${bodyConfig.transform};

  --ui-weight: ${uiConfig.weight};
  --ui-tracking: ${uiConfig.tracking}em;
  --ui-leading: ${uiConfig.leading};
  --ui-transform: ${uiConfig.transform};`

  // Add element-specific CSS variables for headings
  Object.keys(config.headings || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.headings[element]
      css += `
  --font-heading-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --heading-${element}-weight: ${elemConfig.weight};
  --heading-${element}-tracking: ${elemConfig.tracking}em;
  --heading-${element}-leading: ${elemConfig.leading};
  --heading-${element}-transform: ${elemConfig.transform};`
    }
  })

  // Add element-specific CSS variables for body
  Object.keys(config.body || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.body[element]
      css += `
  --font-body-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --body-${element}-weight: ${elemConfig.weight};
  --body-${element}-tracking: ${elemConfig.tracking}em;
  --body-${element}-leading: ${elemConfig.leading};
  --body-${element}-transform: ${elemConfig.transform};`
    }
  })

  // Add element-specific CSS variables for ui
  Object.keys(config.ui || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.ui[element]
      css += `
  --font-ui-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --ui-${element}-weight: ${elemConfig.weight};
  --ui-${element}-tracking: ${elemConfig.tracking}em;
  --ui-${element}-leading: ${elemConfig.leading};
  --ui-${element}-transform: ${elemConfig.transform};`
    }
  })

  css += `
}`

  return css.trim()
}

export const generateTailwindExport = config => {
  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  return `
/* Tailwind v4 Theme Config */
@theme {
  --font-display: ${getFontFamily(headingConfig.family, headingConfig.category)};
  --font-sans: ${getFontFamily(bodyConfig.family, bodyConfig.category)};
  --font-ui: ${getFontFamily(uiConfig.family, uiConfig.category)};
}
`.trim()
}

export const generateComprehensiveTailwindConfig = config => {
  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  const headingFamily = getFontFamily(
    headingConfig.family,
    headingConfig.category
  )
  const bodyFamily = getFontFamily(bodyConfig.family, bodyConfig.category)
  const uiFamily = getFontFamily(uiConfig.family, uiConfig.category)

  let tailwindConfig = `
/* Tailwind v4 Comprehensive Config */
@theme {
  /* Font Families - Base */
  --font-heading: ${headingFamily};
  --font-body: ${bodyFamily};
  --font-ui: ${uiFamily};
  
  /* Extended Font Family Definitions */
  --font-family-heading: ${headingFamily};
  --font-family-body: ${bodyFamily};
  --font-family-ui: ${uiFamily};
  
  /* Typography Weights - Base */
  --font-weight-heading: ${headingConfig.weight};
  --font-weight-body: ${bodyConfig.weight};
  --font-weight-ui: ${uiConfig.weight};
  
  /* Letter Spacing - Base */
  --letter-spacing-heading: ${headingConfig.tracking}em;
  --letter-spacing-body: ${bodyConfig.tracking}em;
  --letter-spacing-ui: ${uiConfig.tracking}em;
  
  /* Line Height - Base */
  --line-height-heading: ${headingConfig.leading};
  --line-height-body: ${bodyConfig.leading};
  --line-height-ui: ${uiConfig.leading};`

  // Add element-specific theme variables for headings
  Object.keys(config.headings || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.headings[element]
      tailwindConfig += `
  --font-heading-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --font-weight-heading-${element}: ${elemConfig.weight};
  --letter-spacing-heading-${element}: ${elemConfig.tracking}em;
  --line-height-heading-${element}: ${elemConfig.leading};`
    }
  })

  // Add element-specific theme variables for body
  Object.keys(config.body || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.body[element]
      tailwindConfig += `
  --font-body-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --font-weight-body-${element}: ${elemConfig.weight};
  --letter-spacing-body-${element}: ${elemConfig.tracking}em;
  --line-height-body-${element}: ${elemConfig.leading};`
    }
  })

  // Add element-specific theme variables for ui
  Object.keys(config.ui || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.ui[element]
      tailwindConfig += `
  --font-ui-${element}: ${getFontFamily(elemConfig.family, elemConfig.category)};
  --font-weight-ui-${element}: ${elemConfig.weight};
  --letter-spacing-ui-${element}: ${elemConfig.tracking}em;
  --line-height-ui-${element}: ${elemConfig.leading};`
    }
  })

  tailwindConfig += `
}

/* Custom Utility Classes - Base */
/* Usage: class="text-heading-xl" */
.text-heading-xl {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-heading);
  line-height: var(--line-height-heading);
  text-transform: ${headingConfig.transform};
}

.text-heading-lg {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-heading);
  line-height: var(--line-height-heading);
  text-transform: ${headingConfig.transform};
}

.text-heading-base {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  letter-spacing: var(--letter-spacing-heading);
  line-height: var(--line-height-heading);
  text-transform: ${headingConfig.transform};
}

.text-body-lg {
  font-family: var(--font-body);
  font-weight: var(--font-weight-body);
  letter-spacing: var(--letter-spacing-body);
  line-height: var(--line-height-body);
  text-transform: ${bodyConfig.transform};
}

.text-body-base {
  font-family: var(--font-body);
  font-weight: var(--font-weight-body);
  letter-spacing: var(--letter-spacing-body);
  line-height: var(--line-height-body);
  text-transform: ${bodyConfig.transform};
}

.text-body-sm {
  font-family: var(--font-body);
  font-weight: var(--font-weight-body);
  letter-spacing: var(--letter-spacing-body);
  line-height: var(--line-height-body);
  text-transform: ${bodyConfig.transform};
}

.text-ui {
  font-family: var(--font-ui);
  font-weight: var(--font-weight-ui);
  letter-spacing: var(--letter-spacing-ui);
  line-height: var(--line-height-ui);
  text-transform: ${uiConfig.transform};
}

/* Element-Specific Utility Classes */
/* Body Prose Elements */
.text-body-paragraph {
  font-family: var(--font-body-paragraph, var(--font-body));
  font-weight: var(--font-weight-body-paragraph, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-paragraph, var(--letter-spacing-body));
  line-height: var(--line-height-body-paragraph, var(--line-height-body));
}

.text-body-strong {
  font-family: var(--font-body-strong, var(--font-body));
  font-weight: var(--font-weight-body-strong, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-strong, var(--letter-spacing-body));
  line-height: var(--line-height-body-strong, var(--line-height-body));
}

.text-body-emphasis {
  font-family: var(--font-body-emphasis, var(--font-body));
  font-weight: var(--font-weight-body-emphasis, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-emphasis, var(--letter-spacing-body));
  line-height: var(--line-height-body-emphasis, var(--line-height-body));
  font-style: italic;
}

.text-body-code {
  font-family: var(--font-body-code, var(--font-body));
  font-weight: var(--font-weight-body-code, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-code, var(--letter-spacing-body));
  line-height: var(--line-height-body-code, var(--line-height-body));
}

.text-body-link {
  font-family: var(--font-body-link, var(--font-body));
  font-weight: var(--font-weight-body-link, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-link, var(--letter-spacing-body));
  line-height: var(--line-height-body-link, var(--line-height-body));
}

.text-body-blockquote {
  font-family: var(--font-body-blockquote, var(--font-body));
  font-weight: var(--font-weight-body-blockquote, var(--font-weight-body));
  letter-spacing: var(--letter-spacing-body-blockquote, var(--letter-spacing-body));
  line-height: var(--line-height-body-blockquote, var(--line-height-body));
}`

  return tailwindConfig.trim()
}

export const generateProseConfig = config => {
  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')

  const headingFamily = getFontFamily(
    headingConfig.family,
    headingConfig.category
  )
  const bodyFamily = getFontFamily(bodyConfig.family, bodyConfig.category)

  // Get element-specific body configs
  const paragraphConfig = config.body?.paragraph || bodyConfig
  const strongConfig = config.body?.strong || bodyConfig
  const emphasisConfig = config.body?.emphasis || bodyConfig
  const blockquoteConfig = config.body?.blockquote || bodyConfig
  const codeConfig = config.body?.code || bodyConfig
  const linkConfig = config.body?.link || bodyConfig

  let proseConfig = `
/* @tailwindcss/typography Prose Configuration */
/* Install: npm install @tailwindcss/typography */

@theme {
  /* Prose Font Families */
  --prose-body: ${bodyFamily};
  --prose-headings: ${headingFamily};
  
  /* Prose Typography Settings - Base */
  --prose-body-weight: ${bodyConfig.weight};
  --prose-headings-weight: ${headingConfig.weight};
  --prose-body-leading: ${bodyConfig.leading};
  --prose-headings-leading: ${headingConfig.leading};
  --prose-body-tracking: ${bodyConfig.tracking}em;
  --prose-headings-tracking: ${headingConfig.tracking}em;
  
  /* Prose Element-Specific Settings */
  --prose-paragraph-weight: ${paragraphConfig.weight};
  --prose-paragraph-family: ${getFontFamily(paragraphConfig.family, paragraphConfig.category)};
  --prose-strong-weight: ${strongConfig.weight};
  --prose-strong-family: ${getFontFamily(strongConfig.family, strongConfig.category)};
  --prose-emphasis-weight: ${emphasisConfig.weight};
  --prose-emphasis-family: ${getFontFamily(emphasisConfig.family, emphasisConfig.category)};
  --prose-blockquote-weight: ${blockquoteConfig.weight};
  --prose-blockquote-family: ${getFontFamily(blockquoteConfig.family, blockquoteConfig.category)};
  --prose-code-weight: ${codeConfig.weight};
  --prose-code-family: ${getFontFamily(codeConfig.family, codeConfig.category)};
  --prose-link-weight: ${linkConfig.weight};
  --prose-link-family: ${getFontFamily(linkConfig.family, linkConfig.category)};
}

/* Customize Prose Classes */
.prose {
  --tw-prose-body: var(--prose-body);
  --tw-prose-headings: var(--prose-headings);
  --tw-prose-body-weight: var(--prose-body-weight);
  --tw-prose-headings-weight: var(--prose-headings-weight);
  --tw-prose-body-leading: var(--prose-body-leading);
  --tw-prose-headings-leading: var(--prose-headings-leading);
  --tw-prose-body-tracking: var(--prose-body-tracking);
  --tw-prose-headings-tracking: var(--prose-headings-tracking);
}

/* Element-Specific Prose Styles */
.prose p {
  font-weight: var(--prose-paragraph-weight);
  font-family: var(--prose-paragraph-family);
}

.prose strong {
  font-weight: var(--prose-strong-weight);
  font-family: var(--prose-strong-family);
}

.prose em {
  font-weight: var(--prose-emphasis-weight);
  font-family: var(--prose-emphasis-family);
}

.prose blockquote {
  font-weight: var(--prose-blockquote-weight);
  font-family: var(--prose-blockquote-family);
}

.prose code {
  font-weight: var(--prose-code-weight);
  font-family: var(--prose-code-family);
}

.prose a {
  font-weight: var(--prose-link-weight);
  font-family: var(--prose-link-family);
}

/* Usage in HTML: <article class="prose">...</article> */
`

  return proseConfig.trim()
}

export const generateJSONTokens = config => {
  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  const tokens = {
    typography: {
      headings: {
        all: {
          fontFamily: headingConfig.family,
          fontCategory: headingConfig.category,
          fontWeight: headingConfig.weight,
          letterSpacing: `${headingConfig.tracking}em`,
          lineHeight: headingConfig.leading,
          textTransform: headingConfig.transform
        }
      },
      body: {
        all: {
          fontFamily: bodyConfig.family,
          fontCategory: bodyConfig.category,
          fontWeight: bodyConfig.weight,
          letterSpacing: `${bodyConfig.tracking}em`,
          lineHeight: bodyConfig.leading,
          textTransform: bodyConfig.transform
        }
      },
      ui: {
        all: {
          fontFamily: uiConfig.family,
          fontCategory: uiConfig.category,
          fontWeight: uiConfig.weight,
          letterSpacing: `${uiConfig.tracking}em`,
          lineHeight: uiConfig.leading,
          textTransform: uiConfig.transform
        }
      }
    }
  }

  // Add element-specific configurations for headings
  Object.keys(config.headings || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.headings[element]
      tokens.typography.headings[element] = {
        fontFamily: elemConfig.family,
        fontCategory: elemConfig.category,
        fontWeight: elemConfig.weight,
        letterSpacing: `${elemConfig.tracking}em`,
        lineHeight: elemConfig.leading,
        textTransform: elemConfig.transform
      }
    }
  })

  // Add element-specific configurations for body
  Object.keys(config.body || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.body[element]
      tokens.typography.body[element] = {
        fontFamily: elemConfig.family,
        fontCategory: elemConfig.category,
        fontWeight: elemConfig.weight,
        letterSpacing: `${elemConfig.tracking}em`,
        lineHeight: elemConfig.leading,
        textTransform: elemConfig.transform
      }
    }
  })

  // Add element-specific configurations for ui
  Object.keys(config.ui || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.ui[element]
      tokens.typography.ui[element] = {
        fontFamily: elemConfig.family,
        fontCategory: elemConfig.category,
        fontWeight: elemConfig.weight,
        letterSpacing: `${elemConfig.tracking}em`,
        lineHeight: elemConfig.leading,
        textTransform: elemConfig.transform
      }
    }
  })

  return JSON.stringify(tokens, null, 2)
}

export const generateNextJSInstall = config => {
  // Convert font names to Next.js format (e.g., "Playfair Display" -> "Playfair_Display")
  const toNextJSFontName = name => name.replace(/\s+/g, '_')

  const getRoleConfig = role => config[role]?.all || {}

  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  // Collect all unique fonts from all roles and elements
  const fontMap = new Map()

  // Add base fonts
  fontMap.set(headingConfig.family, {
    name: headingConfig.family,
    weights: new Set([headingConfig.weight]),
    variables: ['--font-heading']
  })
  fontMap.set(bodyConfig.family, {
    name: bodyConfig.family,
    weights: new Set([bodyConfig.weight]),
    variables: ['--font-body']
  })
  fontMap.set(uiConfig.family, {
    name: uiConfig.family,
    weights: new Set([uiConfig.weight]),
    variables: ['--font-ui']
  })

  // Add element-specific fonts
  Object.keys(config.headings || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.headings[element]
      if (!fontMap.has(elemConfig.family)) {
        fontMap.set(elemConfig.family, {
          name: elemConfig.family,
          weights: new Set(),
          variables: []
        })
      }
      fontMap.get(elemConfig.family).weights.add(elemConfig.weight)
      fontMap.get(elemConfig.family).variables.push(`--font-heading-${element}`)
    }
  })

  Object.keys(config.body || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.body[element]
      if (!fontMap.has(elemConfig.family)) {
        fontMap.set(elemConfig.family, {
          name: elemConfig.family,
          weights: new Set(),
          variables: []
        })
      }
      fontMap.get(elemConfig.family).weights.add(elemConfig.weight)
      fontMap.get(elemConfig.family).variables.push(`--font-body-${element}`)
    }
  })

  Object.keys(config.ui || {}).forEach(element => {
    if (element !== 'all') {
      const elemConfig = config.ui[element]
      if (!fontMap.has(elemConfig.family)) {
        fontMap.set(elemConfig.family, {
          name: elemConfig.family,
          weights: new Set(),
          variables: []
        })
      }
      fontMap.get(elemConfig.family).weights.add(elemConfig.weight)
      fontMap.get(elemConfig.family).variables.push(`--font-ui-${element}`)
    }
  })

  const fonts = Array.from(fontMap.values()).map(font => ({
    name: font.name,
    weights: Array.from(font.weights),
    variables: font.variables
  }))

  const imports = fonts.map(font => toNextJSFontName(font.name)).join(', ')
  const fontConfigs = fonts
    .map(font => {
      const nextJSName = toNextJSFontName(font.name)
      const varName =
        font.variables[0].replace('--font-', '').replace(/-[^-]+$/, '') ||
        'font'
      return `const ${varName} = ${nextJSName}({ 
  subsets: ['latin'],
  variable: '${font.variables[0]}',
  weight: [${font.weights.map(w => `'${w}'`).join(', ')}],
  display: 'swap'
})`
    })
    .join('\n\n')

  const classNameVars = fonts
    .map(font => {
      const varName =
        font.variables[0].replace('--font-', '').replace(/-[^-]+$/, '') ||
        'font'
      return `\${${varName}.variable}`
    })
    .join(' ')

  return `
// app/layout.jsx or pages/_app.jsx
import { ${imports} } from 'next/font/google'

${fontConfigs}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`${classNameVars}\`}>
      <body>{children}</body>
    </html>
  )
}

// Then use in your CSS:
// :root {
//   --font-heading: var(--font-heading);
//   --font-body: var(--font-body);
//   --font-ui: var(--font-ui);
// }
`.trim()
}

export const generateViteInstall = config => {
  // Collect all unique font families
  const fontNames = new Set()

  // Add base fonts
  fontNames.add(config.headings?.all?.family)
  fontNames.add(config.body?.all?.family)
  fontNames.add(config.ui?.all?.family)

  // Add element-specific fonts
  Object.values(config.headings || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.body || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.ui || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })

  const googleFontsUrl = Array.from(fontNames)
    .filter(Boolean)
    .map(name => name.replace(/\s+/g, '+'))
    .join('&family=')

  return `
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap" rel="stylesheet">

<!-- main.jsx or main.tsx -->
import './index.css'

<!-- index.css -->
${generateCSSExport(config)}
`.trim()
}

export const generateHTMLInstall = config => {
  // Collect all unique font families
  const fontNames = new Set()

  // Add base fonts
  fontNames.add(config.headings?.all?.family)
  fontNames.add(config.body?.all?.family)
  fontNames.add(config.ui?.all?.family)

  // Add element-specific fonts
  Object.values(config.headings || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.body || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.ui || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })

  const googleFontsUrl = Array.from(fontNames)
    .filter(Boolean)
    .map(name => name.replace(/\s+/g, '+'))
    .join('&family=')

  return `# Typography Configuration

This package contains your typography configuration files.

## Installation

### 1. Add Google Fonts

Add the following to your HTML \`<head>\`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap" rel="stylesheet">
\`\`\`

### 2. Include CSS Variables

Link to \`css-variables.css\` in your HTML:

\`\`\`html
<link rel="stylesheet" href="css-variables.css">
\`\`\`

Or copy the contents of \`css-variables.css\` into your stylesheet.

## Usage

### CSS Variables

Use the CSS variables in your styles:

\`\`\`css
.heading {
  font-family: var(--font-heading);
  font-weight: var(--heading-weight);
  letter-spacing: var(--heading-tracking);
  line-height: var(--heading-leading);
  text-transform: var(--heading-transform);
}

.body {
  font-family: var(--font-body);
  font-weight: var(--body-weight);
  letter-spacing: var(--body-tracking);
  line-height: var(--body-leading);
  text-transform: var(--body-transform);
}

.ui {
  font-family: var(--font-ui);
  font-weight: var(--ui-weight);
  letter-spacing: var(--ui-tracking);
  line-height: var(--ui-leading);
  text-transform: var(--ui-transform);
}
\`\`\`

### HTML Example

\`\`\`html
<h1 style="font-family: var(--font-heading); font-weight: var(--heading-weight);">
  Heading Text
</h1>
<p style="font-family: var(--font-body); font-weight: var(--body-weight);">
  Body text content
</p>
\`\`\`

## Files Included

- \`css-variables.css\` - CSS variables for typography system
- \`tailwind-comprehensive.css\` - Comprehensive Tailwind v4 configuration
- \`tailwind-basic.css\` - Basic Tailwind v4 configuration
- \`prose-config.css\` - @tailwindcss/typography configuration
- \`design-tokens.json\` - Design tokens in JSON format
- \`kitchen-sink.html\` - Example HTML file demonstrating all typography elements
- \`nextjs-install.jsx\` - Next.js installation example
- \`vite-install.html\` - Vite installation example

## See Also

Check out \`kitchen-sink.html\` for a complete example of all typography elements in action.
`.trim()
}

export const generateKitchenSinkHTML = config => {
  // Collect all unique font families
  const fontNames = new Set()

  // Add base fonts
  fontNames.add(config.headings?.all?.family)
  fontNames.add(config.body?.all?.family)
  fontNames.add(config.ui?.all?.family)

  // Add element-specific fonts
  Object.values(config.headings || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.body || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })
  Object.values(config.ui || {}).forEach(elemConfig => {
    if (elemConfig?.family) fontNames.add(elemConfig.family)
  })

  const googleFontsUrl = Array.from(fontNames)
    .filter(Boolean)
    .map(name => name.replace(/\s+/g, '+'))
    .join('&family=')

  const getRoleConfig = role => config[role]?.all || {}
  const headingConfig = getRoleConfig('headings')
  const bodyConfig = getRoleConfig('body')
  const uiConfig = getRoleConfig('ui')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typography Kitchen Sink</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap" rel="stylesheet">
  
  <!-- CSS Variables -->
  <link rel="stylesheet" href="css-variables.css">
  
  <style>
    body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #1a1a1a;
      color: #e0e0e0;
      line-height: 1.6;
    }
    
    section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: #2a2a2a;
      border-radius: 8px;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: var(--heading-weight);
      letter-spacing: var(--heading-tracking);
      line-height: var(--heading-leading);
      text-transform: var(--heading-transform);
      color: #ffffff;
      margin-top: 0;
    }
    
    p, li, td, th {
      font-family: var(--font-body);
      font-weight: var(--body-weight);
      letter-spacing: var(--body-tracking);
      line-height: var(--body-leading);
      text-transform: var(--body-transform);
    }
    
    strong {
      font-family: var(--font-body-strong, var(--font-body));
      font-weight: var(--body-strong-weight, var(--body-weight));
    }
    
    em {
      font-family: var(--font-body-emphasis, var(--font-body));
      font-weight: var(--body-emphasis-weight, var(--body-weight));
      font-style: italic;
    }
    
    code {
      font-family: var(--font-body-code, var(--font-body));
      font-weight: var(--body-code-weight, var(--body-weight));
      background: #3a3a3a;
      padding: 0.2em 0.4em;
      border-radius: 4px;
    }
    
    a {
      font-family: var(--font-body-link, var(--font-body));
      font-weight: var(--body-link-weight, var(--body-weight));
      color: #60a5fa;
      text-decoration: underline;
    }
    
    blockquote {
      font-family: var(--font-body-blockquote, var(--font-body));
      font-weight: var(--body-blockquote-weight, var(--body-weight));
      border-left: 4px solid #60a5fa;
      padding-left: 1rem;
      margin-left: 0;
      font-style: italic;
    }
    
    button {
      font-family: var(--font-ui);
      font-weight: var(--ui-weight);
      letter-spacing: var(--ui-tracking);
      line-height: var(--ui-leading);
      text-transform: var(--ui-transform);
      padding: 0.5rem 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background: #2563eb;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #3a3a3a;
    }
    
    th {
      font-family: var(--font-ui);
      font-weight: var(--ui-weight);
      background: #2a2a2a;
    }
    
    input, textarea, select {
      font-family: var(--font-body);
      padding: 0.5rem;
      border: 1px solid #3a3a3a;
      border-radius: 4px;
      background: #2a2a2a;
      color: #e0e0e0;
    }
  </style>
</head>
<body>
  <h1>Typography Kitchen Sink</h1>
  <p>This page demonstrates all typography elements using your configured typography system.</p>
  
  <section>
    <h2>Headings</h2>
    <h1>Heading 1 (H1)</h1>
    <h2>Heading 2 (H2)</h2>
    <h3>Heading 3 (H3)</h3>
    <h4>Heading 4 (H4)</h4>
    <h5>Heading 5 (H5)</h5>
    <h6>Heading 6 (H6)</h6>
  </section>
  
  <section>
    <h2>Body Text</h2>
    <p>This is a paragraph of body text. It demonstrates the default body typography settings including font family, weight, letter spacing, line height, and text transform.</p>
    <p>Here's another paragraph to show spacing between paragraphs. Notice how the typography system creates a comfortable reading experience with appropriate line height and letter spacing.</p>
  </section>
  
  <section>
    <h2>Text Formatting</h2>
    <p>This paragraph contains <strong>strong/bold text</strong> and <em>emphasized/italic text</em> to demonstrate how these elements are styled.</p>
    <p>You can also use <code>inline code</code> within paragraphs, and here's a <a href="#">link to demonstrate link styling</a>.</p>
  </section>
  
  <section>
    <h2>Blockquote</h2>
    <blockquote>
      "This is a blockquote. It's used for highlighting important quotes or callouts. Notice how it has distinct styling from regular paragraphs."
    </blockquote>
  </section>
  
  <section>
    <h2>Lists</h2>
    <h3>Unordered List</h3>
    <ul>
      <li>First list item</li>
      <li>Second list item with <strong>bold text</strong></li>
      <li>Third list item with <em>italic text</em></li>
      <li>Fourth list item with <code>code</code></li>
    </ul>
    
    <h3>Ordered List</h3>
    <ol>
      <li>First numbered item</li>
      <li>Second numbered item</li>
      <li>Third numbered item</li>
    </ol>
  </section>
  
  <section>
    <h2>Buttons</h2>
    <button>Primary Button</button>
    <button style="background: #10b981; margin-left: 0.5rem;">Success Button</button>
    <button style="background: #ef4444; margin-left: 0.5rem;">Danger Button</button>
  </section>
  
  <section>
    <h2>Table</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Heading Font</td>
          <td>Typography</td>
          <td>${headingConfig.family} - ${headingConfig.weight}</td>
        </tr>
        <tr>
          <td>Body Font</td>
          <td>Typography</td>
          <td>${bodyConfig.family} - ${bodyConfig.weight}</td>
        </tr>
        <tr>
          <td>UI Font</td>
          <td>Typography</td>
          <td>${uiConfig.family} - ${uiConfig.weight}</td>
        </tr>
      </tbody>
    </table>
  </section>
  
  <section>
    <h2>Forms</h2>
    <form>
      <p>
        <label for="text-input">Text Input:</label><br>
        <input type="text" id="text-input" placeholder="Enter text here">
      </p>
      <p>
        <label for="textarea">Textarea:</label><br>
        <textarea id="textarea" rows="4" placeholder="Enter multiple lines of text"></textarea>
      </p>
      <p>
        <label for="select">Select:</label><br>
        <select id="select">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </p>
      <p>
        <button type="submit">Submit Form</button>
      </p>
    </form>
  </section>
  
  <section>
    <h2>Code Block</h2>
    <pre><code>// Example code block
function example() {
  const heading = document.querySelector('h1');
  heading.style.fontFamily = 'var(--font-heading)';
  heading.style.fontWeight = 'var(--heading-weight)';
}</code></pre>
  </section>
</body>
</html>`
}

export const generateExportZip = async config => {
  // Lazy load JSZip only when export is triggered
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  // Add all export files
  zip.file('css-variables.css', generateCSSExport(config))
  zip.file(
    'tailwind-comprehensive.css',
    generateComprehensiveTailwindConfig(config)
  )
  zip.file('tailwind-basic.css', generateTailwindExport(config))
  zip.file('prose-config.css', generateProseConfig(config))
  zip.file('design-tokens.json', generateJSONTokens(config))
  zip.file('nextjs-install.jsx', generateNextJSInstall(config))
  zip.file('vite-install.html', generateViteInstall(config))
  zip.file('README.md', generateHTMLInstall(config))
  zip.file('kitchen-sink.html', generateKitchenSinkHTML(config))

  // Generate zip file and trigger download
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'typography-export.zip'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
