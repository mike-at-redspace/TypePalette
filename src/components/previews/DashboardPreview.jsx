import { useMemo } from 'react'
import { GlassPanel } from '@/components/ui'
import { falso } from '@/utils'

const DashboardPreview = ({ style }) => {
  const stats = useMemo(
    () => [
      {
        label: 'Total Revenue',
        val: `$${falso.randFloat({ min: 10, max: 99, fraction: 2 })}k`,
        delta: `+${falso.randNumber({ min: 10, max: 40 })}%`
      },
      {
        label: 'Active Users',
        val: falso.randNumber({ min: 1000, max: 5000 }),
        delta: `+${falso.randNumber({ min: 100, max: 300 })}`
      },
      {
        label: 'Bounce Rate',
        val: `${falso.randFloat({ min: 2, max: 15, fraction: 1 })}%`,
        delta: `-${falso.randFloat({ min: 0, max: 2, fraction: 1 })}%`
      }
    ],
    []
  )

  return (
    <div className='h-full p-8 bg-slate-950/50' style={style}>
      <header className='flex justify-between items-end mb-10 border-b border-white/10 pb-6'>
        <div>
          <h1 className='font-heading text-3xl text-white mb-2'>Analytics</h1>
          <p className='font-body text-sm text-slate-400'>
            Real-time platform metrics.{' '}
            <a
              href='#'
              className='body-link text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400'
            >
              View documentation
            </a>
          </p>
        </div>
        <button className='font-ui text-xs bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/40 transition-all'>
          Generate Report
        </button>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        {stats.map((stat, i) => (
          <GlassPanel
            key={i}
            className='p-6 hover:bg-slate-900/80 transition-colors'
          >
            <div className='font-ui text-[10px] text-slate-400 mb-3 uppercase tracking-widest opacity-70'>
              {stat.label}
            </div>
            <div className='font-heading text-4xl text-white mb-3'>
              {stat.val}
            </div>
            <span className='font-ui text-[10px] font-bold text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-500/20'>
              {stat.delta}
            </span>
          </GlassPanel>
        ))}
      </div>
      <GlassPanel className='overflow-hidden'>
        <div className='p-6 border-b border-white/5 flex justify-between items-center bg-white/5'>
          <h3 className='font-heading text-lg text-white'>
            Recent Transactions
          </h3>
          <button className='font-ui text-[10px] text-blue-400 hover:text-blue-300 uppercase tracking-wider font-bold'>
            View All
          </button>
        </div>
        <table className='w-full font-body text-sm text-left'>
          <thead className='bg-black/20 font-ui text-[10px] uppercase text-slate-500 tracking-wider'>
            <tr>
              <th className='px-6 py-4'>Project</th>
              <th className='px-6 py-4'>Status</th>
              <th className='px-6 py-4 text-right'>Value</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5 text-slate-300'>
            {[1, 2, 3, 4].map(row => (
              <tr key={row} className='hover:bg-white/5 transition-colors'>
                <td className='px-6 py-4 text-white font-medium'>
                  {falso.randPhrase().split(' ').slice(0, 2).join(' ')}
                </td>
                <td className='px-6 py-4'>
                  <span className='font-ui text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30'>
                    Active
                  </span>
                </td>
                <td className='px-6 py-4 text-right'>
                  <code className='body-code bg-slate-800/50 px-2 py-1 rounded text-cyan-300'>
                    ${falso.randFloat({ min: 100, max: 900, fraction: 2 })}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </div>
  )
}

export default DashboardPreview
