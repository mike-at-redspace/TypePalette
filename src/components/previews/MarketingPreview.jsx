import { Play, Image } from 'lucide-react'
import { useState } from 'react'

const MarketingPreview = ({ style }) => {
  const mockData = [
    {
      badge: 'KERNING MATTERS',
      heading: 'Perfect Typography',
      subheading: 'One Pixel at a Time',
      body: {
        start: 'Stop using',
        strong: 'Comic Sans',
        middle: 'in production. Master the art of',
        emphasis: 'font pairing',
        end: 'and make your designs look like they were made by someone who actually knows what they’re doing.'
      },
      cta1: 'Fix Your Fonts',
      cta2: 'View Typefaces'
    },
    {
      badge: 'COLOR THEORY',
      heading: 'Vibrant Gradients',
      subheading: 'Without the Migraine',
      body: {
        start: 'A gradient from',
        strong: 'neon pink to lime',
        middle: 'is not always a good idea. Try',
        emphasis: 'subtle transitions',
        end: 'and keep your users’ retinas intact.'
      },
      cta1: 'See Gradient Tips',
      cta2: 'Explore Palettes'
    },
    {
      badge: 'LAYOUT WISDOM',
      heading: 'Whitespace Wins',
      subheading: 'Let It Breathe',
      body: {
        start: 'Cramming every pixel with content',
        strong: 'is not thorough',
        middle: '. It’s hoarding. Embrace',
        emphasis: 'negative space',
        end: 'and let your design exhale.'
      },
      cta1: 'Learn Spacing',
      cta2: 'View Layouts'
    },
    {
      badge: 'FONT FLAIR',
      heading: 'Pair Like a Pro',
      subheading: 'Harmony in Type',
      body: {
        start: 'Mixing fonts is an art. Avoid',
        strong: 'clashing styles',
        middle: 'and focus on',
        emphasis: 'visual hierarchy',
        end: 'for a polished look.'
      },
      cta1: 'Font Pairing Guide',
      cta2: 'Browse Examples'
    },
    {
      badge: 'CTA SCIENCE',
      heading: 'Compelling Actions',
      subheading: 'Drive Engagement',
      body: {
        start: '“Learn More” is not enough. Make your',
        strong: 'call-to-action',
        middle: 'specific and persuasive. Use',
        emphasis: 'active language',
        end: 'to boost clicks.'
      },
      cta1: 'Upgrade Your CTA',
      cta2: 'See Examples'
    }
  ]

  const [content] = useState(() => {
    const randomIndex = Math.floor(Math.random() * mockData.length)
    return mockData[randomIndex]
  })

  return (
    <div
      className='flex flex-col items-center justify-center h-full py-20 px-6 text-center'
      style={style}
    >
      <div className='relative z-10 max-w-4xl mx-auto'>
        <span className='font-ui inline-block py-1.5 px-4 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.4)]'>
          {content.badge}
        </span>

        <h1 className='font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight drop-shadow-2xl'>
          <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-purple-300 to-fuchsia-300'>
            {content.heading}
          </span>
          <br />
          <span className='text-transparent bg-clip-text bg-linear-to-r from-fuchsia-300 via-purple-300 to-cyan-300'>
            {content.subheading}
          </span>
        </h1>

        <p className='body-paragraph font-body text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light'>
          {content.body.start}{' '}
          <strong className='body-strong'>{content.body.strong}</strong>{' '}
          {content.body.middle}{' '}
          <em className='body-emphasis'>{content.body.emphasis}</em>{' '}
          {content.body.end}
        </p>

        <div className='flex flex-col sm:flex-row justify-center gap-6 mb-20'>
          <button className='font-ui text-sm bg-cyan-500 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-cyan-500/50 hover:bg-cyan-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2'>
            {content.cta1}{' '}
            <Play size={16} fill='currentColor' className='shrink-0' />
          </button>
          <button className='font-ui text-sm bg-white/5 text-white border border-white/10 px-10 py-4 rounded-full font-bold hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2'>
            <Image size={16} className='shrink-0' />
            {content.cta2}
          </button>
        </div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen animate-pulse' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[80px] -z-10 pointer-events-none mix-blend-screen' />
      </div>
    </div>
  )
}

export default MarketingPreview
