// Track all loaded fonts to ensure they persist
const loadedFonts = new Set()

// Parse font families from existing Google Fonts URL
const parseFontsFromUrl = url => {
  if (!url) return new Set()
  const families = new Set()
  const matches = url.match(/family=([^&:]+)/g)
  if (matches) {
    matches.forEach(match => {
      const familyName = match
        .replace('family=', '')
        .replace(/\+/g, ' ')
        .split(':')[0]
      families.add(familyName)
    })
  }
  return families
}

export const loadGoogleFonts = families => {
  // Add new families to the loaded set
  families.forEach(family => loadedFonts.add(family))

  // Get existing fonts from the link if it exists
  const linkId = 'playground-fonts'
  let link = document.getElementById(linkId)
  if (link && link.href) {
    const existingFonts = parseFontsFromUrl(link.href)
    existingFonts.forEach(font => loadedFonts.add(font))
  }

  // Create family strings for all loaded fonts
  const familyStrings = Array.from(loadedFonts).map(
    name =>
      `family=${name.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400`
  )

  if (familyStrings.length > 0) {
    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?${familyStrings.join('&')}&display=swap`
  }
}
