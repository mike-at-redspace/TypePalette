const TEXT_SIZES = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl'
]

const TailwindPreview = ({ style }) => {
  return (
    <section
      className='relative h-full w-full overflow-hidden bg-slate-950/70 text-slate-100'
      style={style}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_40%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(192,132,252,0.35),transparent_45%)]' />

      <div className='relative z-10 mx-auto flex h-full max-w-6xl flex-col gap-10 px-6 py-16'>
        <div className='space-y-3'>
          <p className='text-[0.65rem] uppercase tracking-[0.6em] text-cyan-300'>
            Tailwind typography
          </p>
          <h1 className='font-heading text-4xl font-black tracking-tight text-white sm:text-5xl'>
            Build prose that feels intentional.
          </h1>
          <p className='text-base leading-relaxed text-slate-300 sm:text-lg'>
            Think of this as the Tailwind specimen page—every size, every
            utility, so you can see whether your font stack feels like a hero
            banner or a legacy dashboard.
          </p>
        </div>

        <article className='prose prose-invert max-w-none space-y-8 text-slate-100'>
          <div className='space-y-2'>
            <h2 className='text-5xl font-black tracking-tight text-white'>
              Typography utilities
            </h2>
            <p className='text-lg leading-relaxed text-slate-200'>
              Use these utilities to lock in scale, spacing, and emphasis
              without leaving the markup. Tailwind&apos;s design system is how
              you get consistent prose that doesn&apos;t need a whole style
              guide breathing down your neck.
            </p>
          </div>

          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.7)]'>
            <div className='flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 text-xs uppercase tracking-[0.3em] text-slate-400'>
              utility <span className='text-white'> 〉 </span> live sample
            </div>
            <div className='space-y-4 pt-4'>
              {TEXT_SIZES.map(size => (
                <div
                  key={size}
                  className='flex flex-wrap items-baseline justify-between gap-3'
                >
                  <span className={`${size} font-semibold text-white`}>
                    {size}
                  </span>
                  <span className='text-xs text-slate-400'>
                    The quick brown fox jumps over the lazy dog.
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className='text-base leading-relaxed text-slate-200'>
            Prose markup is powered by <code className='text-xs'>prose</code>{' '}
            and <code className='text-xs'>prose-invert</code>. Throw in{' '}
            <span className='font-bold tracking-tight text-white'>
              tracking-tight
            </span>{' '}
            for serious lines, or{' '}
            <span className='font-bold tracking-wide text-cyan-300'>
              tracking-wide
            </span>{' '}
            when marketing needs to scream “buy the thing.”
          </p>

          <div className='grid gap-6 rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/70 to-slate-950/70 p-6'>
            <div className='space-y-1'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-400'>
                Prose elements
              </p>
              <p className='text-lg text-slate-200'>
                <strong className='font-semibold text-white'>
                  Strong text
                </strong>{' '}
                married with{' '}
                <em className='text-cyan-300 italic tracking-wide'>
                  italic emphasis
                </em>{' '}
                keeps the paragraphs moving without being too shouty.
              </p>
            </div>
            <blockquote className='border-l-4 border-cyan-400/80 bg-white/5 p-6 text-lg text-slate-100'>
              <p>
                Blockquotes use a bold border to channel focus, while a muted
                background keeps the message grounded and supportive.
              </p>
              <footer className='mt-3 text-xs uppercase tracking-[0.3em] text-slate-500'>
                Tailwind official type specimen
              </footer>
            </blockquote>
            <ul className='list-disc space-y-2 pl-6 text-sm text-slate-200'>
              <li className=''>
                Text utilities can be combined with{' '}
                <span className='font-semibold text-white'>font-black</span> or{' '}
                <span className='text-cyan-300'>font-semibold</span> depending
                on the mood.
              </li>
              <li>
                Use <span className='text-cyan-200'>tracking-[0.4em]</span> to
                bring emphasis to blurbs, or{' '}
                <span className='tracking-tight text-white'>
                  tracking-tight
                </span>{' '}
                for serious brand statements.
              </li>
              <li className='text-slate-300'>
                The quick brown fox jumps over the lazy dog once more so you can
                verify every size.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}

export default TailwindPreview
