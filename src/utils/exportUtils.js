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

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap" rel="stylesheet">
  
  <style>
    ${generateCSSExport(config)}
  </style>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
`.trim()
}
