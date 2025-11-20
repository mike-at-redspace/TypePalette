import { useEffect } from 'react'
import { loadGoogleFonts, TYPOGRAPHY_PRESETS } from '@/utils'

const useFontLoader = config => {
  useEffect(() => {
    const families = new Set()

    // Collect all unique font families from all roles and elements
    Object.values(config).forEach(roleConfig => {
      Object.values(roleConfig).forEach(elementConfig => {
        if (elementConfig?.family) {
          families.add(elementConfig.family)
        }
      })
    })

    // Collect all unique font families from all presets
    TYPOGRAPHY_PRESETS.forEach(preset => {
      Object.values(preset.config).forEach(roleConfig => {
        Object.values(roleConfig).forEach(elementConfig => {
          if (elementConfig?.family) {
            families.add(elementConfig.family)
          }
        })
      })
    })

    loadGoogleFonts(Array.from(families))
  }, [config])
}

export default useFontLoader
