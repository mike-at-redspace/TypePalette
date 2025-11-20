export const falso = {
  randText: ({ charCount = 100 } = {}) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz '
    let result = ''
    for (let i = 0; i < charCount; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  randPhrase: () => {
    const phrases = [
      'Crafting digital experiences',
      'Elevate your design system',
      'Typography is the voice',
      'Rhythm and proportion',
      'Seamless integration flows',
      'Pixel perfect precision',
      'The future of interface',
      'Design at the speed of thought'
    ]
    return phrases[Math.floor(Math.random() * phrases.length)]
  },

  randParagraph: () => {
    const sentences = [
      'The quick brown fox jumps over the lazy dog.',
      'Design is not just what it looks like and feels like. Design is how it works.',
      'Good design is obvious. Great design is transparent.',
      'Simplicity is the ultimate sophistication.',
      'Styles come and go. Good design is a language, not a style.',
      'Visual hierarchy controls the delivery of the experience.',
      'Whitespace is like air: it is necessary for design to breathe.'
    ]
    return Array(3)
      .fill(0)
      .map(() => sentences[Math.floor(Math.random() * sentences.length)])
      .join(' ')
  },

  randFullName: () => {
    const first = [
      'Alex',
      'Jordan',
      'Casey',
      'Taylor',
      'Morgan',
      'Riley',
      'Quinn'
    ]
    const last = [
      'Design',
      'Chen',
      'Smith',
      'Patel',
      'Kim',
      'Rivera',
      'Holloway'
    ]
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`
  },

  randNumber: ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min),

  randFloat: ({ min, max, fraction }) =>
    (Math.random() * (max - min) + min).toFixed(fraction)
}
