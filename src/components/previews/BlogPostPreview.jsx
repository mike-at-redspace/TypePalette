import { useMemo } from 'react'

const BlogPostPreview = ({ style }) => {
  const content = useMemo(
    () => ({
      title: 'Why Your Font Choices Are Making Designers Cry',
      author: 'Helvetica Neue',
      date: 'Oct 24, 2024',
      subtitle: 'Typography Tips',
      body1: {
        start: 'Let\'s talk about the elephant in the room:',
        strong: 'Comic Sans',
        end: 'is not a font choice, it\'s a cry for help. When you use it in a professional setting, you\'re essentially telling the world that you gave up on life somewhere around 1994.'
      },
      body2: {
        start: 'Typography is more than just',
        emphasis: 'picking pretty letters',
        end: '. It\'s about creating hierarchy, establishing mood, and making sure your users don\'t have to squint to read your content. If your line-height is too tight, you\'re not being edgy—you\'re being cruel.'
      },
      body3: {
        start: 'Remember:',
        code: 'font-family',
        middle: 'is not a suggestion, it\'s a',
        link: 'commitment',
        end: 'Choose wisely, or your users will choose a different website'
      },
      quote: 'The difference between good typography and bad typography is the difference between looking professional and looking like you designed your site in Microsoft Word.'
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
          {content.body1.start}{' '}
          <strong className='body-strong'>{content.body1.strong}</strong>{' '}
          {content.body1.end}
        </p>
        <p>
          {content.body2.start}{' '}
          <em className='body-emphasis'>{content.body2.emphasis}</em>{' '}
          {content.body2.end}
        </p>
        <h2 className='font-heading text-3xl mt-12 mb-6 text-white'>
          {content.subtitle}
        </h2>
        <p>
          {content.body3.start}{' '}
          <code className='body-code bg-slate-800/50 px-2 py-1 rounded text-cyan-300'>
            {content.body3.code}
          </code>{' '}
          {content.body3.middle}{' '}
          <a
            href='#'
            className='body-link text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400'
          >
            {content.body3.link}
          </a>
          . {content.body3.end}.
        </p>
        <blockquote className='body-blockquote bg-slate-900/70 border-l-4 border-purple-400 p-8 italic text-2xl my-12 text-white rounded-r-xl backdrop-blur-sm shadow-lg'>
          "{content.quote}"
        </blockquote>
      </div>
    </article>
  )
}

export default BlogPostPreview
