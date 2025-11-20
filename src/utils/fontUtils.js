export const loadGoogleFonts = families => {
  const uniqueFamilies = new Set(families)
  const familyStrings = Array.from(uniqueFamilies).map(
    name =>
      `family=${name.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400`
  )

  if (familyStrings.length > 0) {
    const linkId = 'playground-fonts'
    let link = document.getElementById(linkId)
    if (!link) {
      link = document.createElement('link')
      link.id = linkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?${familyStrings.join('&')}&display=swap`
  }
}
