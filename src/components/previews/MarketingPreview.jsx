import { Play, Image } from 'lucide-react'
import { useMemo } from 'react'

const MarketingPreview = ({ style }) => {
  const content = useMemo(
    () => ({
      badge: 'KERNING MATTERS',
      heading: 'Perfect Typography',
      subheading: 'One Pixel at a Time',
      body: {
        start: 'Stop using',
        strong: 'Comic Sans',
        middle: 'in production. Master the art of',
        emphasis: 'font pairing',
        end: 'and make your designs look like they were made by someone who actually knows what they\'re doing.'
      },
      cta1: 'Fix Your Fonts',
      cta2: 'View Typefaces'
    }),
    []
  )

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
            {content.cta1} <Play size={16} fill='currentColor' className='shrink-0' />
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
