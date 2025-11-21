import { useState } from 'react'

const BlogPostPreview = ({ style }) => {
  const mockData = [
    {
      title: 'Your Font Choices Are a Cry for Help',
      author: 'Helvetica Neue',
      date: 'Oct 24, 2024',
      subtitle: 'Typography Tips',
      body1: {
        start: "Let's be honest:",
        strong: 'Comic Sans',
        end: 'isn\'t a font. It\'s a wellness check. Using it in a "serious" project tells users you learned design from a cereal box.'
      },
      body2: {
        start: 'Typography is more than',
        emphasis: '"pick a font and vibe."',
        end: "It's hierarchy, rhythm, and not making people feel like they forgot their glasses. If your line-height is tight, you're not bold. You're hostile."
      },
      body3: {
        start: 'Font-family',
        code: "isn't a casual decision.",
        middle: "It's a",
        link: 'long-term relationship',
        end: '. Choose wrong, and users will ghost your site.'
      },
      quote:
        '"Good typography whispers. Bad typography screams. Comic Sans commits crimes."'
    },
    {
      title: 'We Need to Talk About Your Hero Section',
      author: 'Kerning McSpacing',
      date: 'Nov 15, 2024',
      subtitle: 'Design Interventions',
      body1: {
        start: "Your hero section isn't",
        strong: 'heroic',
        end: ". It's three stock photos in a trench coat pretending to be a brand identity. Nobody believes the laptop-on-beach aesthetic anymore."
      },
      body2: {
        start: 'White space is called',
        emphasis: '"negative space"',
        end: "for a reason—it's negative when you don't use it. Cramming every pixel with content doesn't make you thorough. It makes you a hoarder."
      },
      body3: {
        start: 'margin-top: 0',
        code: 'is not a personality.',
        middle: 'Learn to give elements',
        link: 'room to breathe',
        end: ". Your users aren't speed-readers with magnifying glasses."
      },
      quote:
        '"Design is not just what it looks like. Design is not screaming at users in 72pt font."'
    },
    {
      title: 'Stop Calling It a "Quick Fix"',
      author: 'Dev Null',
      date: 'Sep 3, 2024',
      subtitle: 'Developer Therapy',
      body1: {
        start: 'There is no such thing as',
        strong: 'a quick fix',
        end: ". There's duct tape, prayers, and a Jira ticket you'll pretend doesn't exist. That console.log you added three years ago? It's still there, judging you."
      },
      body2: {
        start: "Technical debt isn't",
        emphasis: '"something we\'ll address later."',
        end: "It's a mortgage you're defaulting on. Every !important you add is another missed payment. Your CSS is now a foreclosure."
      },
      body3: {
        start: 'git commit -m "fix"',
        code: 'is not documentation.',
        middle: 'Your future self deserves',
        link: 'actual commit messages',
        end: ', not cryptic breadcrumbs written at 3am.'
      },
      quote:
        '"Programs must be written for people to read, and only incidentally for machines to execute. Unless it\'s React. Then who knows."'
    },
    {
      title: 'Your Landing Page Is Having an Identity Crisis',
      author: 'Gradient Overlord',
      date: 'Aug 12, 2024',
      subtitle: 'Marketing Malpractice',
      body1: {
        start: 'Using the word',
        strong: 'innovative',
        end: " on your landing page doesn't make you innovative. It makes you predictable. Every SaaS startup uses the same three words: innovative, seamless, revolutionary. Pick a struggle."
      },
      body2: {
        start: 'A call-to-action that says',
        emphasis: '"Learn More"',
        end: " isn't persuasive. It's a cop-out. Tell people what they're learning more about. Don't make curiosity your entire value prop."
      },
      body3: {
        start: 'conversion-rate',
        code: 'optimization is important.',
        middle: 'But if your copy sounds like a',
        link: 'corporate robot wrote it',
        end: ', no amount of A/B testing will save you.'
      },
      quote:
        '"The best marketing doesn\'t feel like marketing. Your landing page feels like a timeshare presentation."'
    },
    {
      title: 'Padding Is Not Optional',
      author: 'CSS Containment',
      date: 'Jul 19, 2024',
      subtitle: 'Layout Lectures',
      body1: {
        start: "Text touching the edge of a container isn't",
        strong: 'modern minimalism',
        end: ". It's claustrophobia in pixel form. Give your content room to exist. This isn't a game of Tetris."
      },
      body2: {
        start: 'Flexbox is not',
        emphasis: '"that hard."',
        end: " justify-content and align-items have literal meanings. If everything is centered, nothing is centered. That's philosophy and also CSS."
      },
      body3: {
        start: 'box-sizing: border-box',
        code: 'should be global.',
        middle: "It's the",
        link: 'first rule of CSS Club',
        end: '. If you forget it, your layouts will betray you.'
      },
      quote:
        '"CSS is easy, they said. Just add !important everywhere, they said. Now your stylesheet is a warzone."'
    },
    {
      title: 'Your Gradient Is Too Much',
      author: 'Monochrome Maven',
      date: 'Dec 8, 2024',
      subtitle: 'Color Theory for the Brave',
      body1: {
        start: 'A gradient from',
        strong: 'neon pink to electric lime',
        end: " isn't creative. It's a migraine in CSS. Not every button needs to look like a Lisa Frank poster had a meltdown."
      },
      body2: {
        start: 'Color contrast is',
        emphasis: '"legally required"',
        end: " for accessibility, but also morally required if you don't want users to squint-hate you. Light gray text on white backgrounds is violence."
      },
      body3: {
        start: 'background: linear-gradient()',
        code: 'is powerful.',
        middle: 'But with great power comes',
        link: 'great responsibility',
        end: '. Your homepage should not look like a disco ball exploded.'
      },
      quote:
        '"Subtlety is underrated. Your website doesn\'t need to scream. A whisper with good contrast works fine."'
    }
  ]

  const [content] = useState(() => {
    const randomIndex = Math.floor(Math.random() * mockData.length)
    return mockData[randomIndex]
  })

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
        <p className='body-paragraph'>
          {content.body1.start}{' '}
          <strong className='body-strong'>{content.body1.strong}</strong>{' '}
          {content.body1.end}
        </p>
        <h2 className='font-heading text-4xl mt-12 mb-6 text-white'>
          {content.subtitle}
        </h2>
        <p className='body-paragraph'>
          {content.body2.start}{' '}
          <em className='body-emphasis'>{content.body2.emphasis}</em>{' '}
          {content.body2.end}
        </p>
        <h3 className='font-heading text-3xl mt-12 mb-4 text-white'>
          Typography Hierarchy
        </h3>
        <p className='body-paragraph'>
          Let's admire the full emotional range of headings.
        </p>
        <h4 className='font-heading text-2xl mt-8 mb-3 text-white'>
          Fourth Level Heading
        </h4>
        <p className='body-paragraph'>
          An h4 trying its best to be taken seriously.
        </p>
        <h5 className='font-heading text-xl mt-6 mb-2 text-white'>
          Fifth Level Heading
        </h5>
        <p className='body-paragraph'>Smaller, quieter, still judged.</p>
        <h6 className='font-heading text-lg mt-4 mb-2 text-white'>
          Sixth Level Heading
        </h6>
        <p className='body-paragraph'>
          The whisper of a heading. Basically a suggestion.
        </p>
        <h2 className='font-heading text-3xl mt-12 mb-6 text-white'>
          Back to Content
        </h2>
        <p className='body-paragraph'>
          <code className='body-code bg-slate-800/50 px-2 py-1 rounded text-cyan-300'>
            {content.body3.start}
          </code>{' '}
          {content.body3.code} {content.body3.middle}{' '}
          <a
            href='#'
            className='body-link text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400'
          >
            {content.body3.link}
          </a>
          . {content.body3.end}
        </p>
        <blockquote className='body-blockquote bg-slate-900/70 border-l-4 border-purple-400 p-8 italic text-2xl my-12 text-white rounded-r-xl backdrop-blur-xs shadow-lg'>
          {content.quote}
        </blockquote>
      </div>
    </article>
  )
}

export default BlogPostPreview
