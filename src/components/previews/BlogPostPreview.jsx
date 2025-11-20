import { useMemo } from 'react'
import { falso } from '@/utils'

const BlogPostPreview = ({ style }) => {
  const content = useMemo(
    () => ({
      title: falso.randPhrase(),
      author: falso.randFullName(),
      date: `Oct ${falso.randNumber({ min: 1, max: 30 })}, 2024`,
      body1: falso.randParagraph(),
      body2: falso.randParagraph(),
      subtitle: falso.randPhrase(),
      body3: falso.randParagraph(),
      quote: falso.randPhrase()
    }),
    []
  )

  return (
    <article className='max-w-2xl mx-auto py-16 px-8' style={style}>
      <span className='font-ui text-xs tracking-[0.2em] text-cyan-300 mb-6 block font-bold border-b border-cyan-400/50 pb-2 w-max'>
        {content.subtitle.toUpperCase()}
      </span>
      <h1 className='font-heading text-5xl md:text-6xl mb-8 text-white leading-tight drop-shadow-lg'>
        {content.title}
      </h1>
      <div className='flex items-center gap-3 mb-12 font-ui text-xs text-slate-300 border-l-2 border-cyan-400 pl-4'>
        <span className='text-white font-bold'>{content.author}</span>
        <span className='opacity-60'>•</span>
        <span className='text-slate-300'>{content.date}</span>
      </div>
      <div className='font-body text-lg text-slate-200 space-y-8 leading-relaxed'>
        <p>
          {content.body1.split(' ').slice(0, 5).join(' ')}{' '}
          <strong className='body-strong'>
            {content.body1.split(' ').slice(5, 8).join(' ')}
          </strong>{' '}
          {content.body1.split(' ').slice(8).join(' ')}
        </p>
        <p>
          {content.body2.split(' ').slice(0, 3).join(' ')}{' '}
          <em className='body-emphasis'>
            {content.body2.split(' ').slice(3, 6).join(' ')}
          </em>{' '}
          {content.body2.split(' ').slice(6).join(' ')}
        </p>
        <h2 className='font-heading text-3xl mt-12 mb-6 text-white'>
          {content.subtitle}
        </h2>
        <p>
          {content.body3.split(' ').slice(0, 4).join(' ')}{' '}
          <code className='body-code bg-slate-800/50 px-2 py-1 rounded text-cyan-300'>
            {content.body3.split(' ').slice(4, 5).join(' ')}
          </code>{' '}
          {content.body3.split(' ').slice(5, 8).join(' ')}{' '}
          <a
            href='#'
            className='body-link text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400'
          >
            {content.body3.split(' ').slice(8, 10).join(' ')}
          </a>{' '}
          {content.body3.split(' ').slice(10).join(' ')}
        </p>
        <blockquote className='body-blockquote bg-slate-900/70 border-l-4 border-purple-400 p-8 italic text-2xl my-12 text-white rounded-r-xl backdrop-blur-sm shadow-lg'>
          "{content.quote}"
        </blockquote>
      </div>
    </article>
  )
}

export default BlogPostPreview
