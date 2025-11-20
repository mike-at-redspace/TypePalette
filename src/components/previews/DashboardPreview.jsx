import { useMemo } from 'react'
import { ArrowUpDown, TrendingUp, TrendingDown, Clock, User, DollarSign } from 'lucide-react'
import { GlassPanel } from '@/components/ui'
import { falso } from '@/utils'

const DashboardPreview = ({ style }) => {
  const stats = useMemo(
    () => [
      {
        label: 'Fonts Loaded',
        val: `${falso.randNumber({ min: 47, max: 99 })}`,
        delta: `+${falso.randNumber({ min: 10, max: 40 })}`,
        trend: 'up'
      },
      {
        label: 'CSS Variables',
        val: falso.randNumber({ min: 1337, max: 4200 }).toLocaleString(),
        delta: `+${falso.randNumber({ min: 100, max: 300 })}`,
        trend: 'up'
      },
      {
        label: 'Ligature Errors',
        val: `${falso.randFloat({ min: 0.1, max: 2.5, fraction: 1 })}%`,
        delta: `-${falso.randFloat({ min: 0, max: 0.5, fraction: 1 })}%`,
        trend: 'down'
      }
    ],
    []
  )

  const transactions = useMemo(
    () => {
      const projects = [
        'Fix Comic Sans',
        'Kerning Emergency',
        'Font Loading',
        'Tracking Issues',
        'Leading Problems',
        'Ligature Support',
        'Baseline Alignment',
        'X-Height Crisis'
      ]
      const clients = [
        'Helvetica Neue',
        'Times Roman',
        'Arial Bold',
        'Georgia Serif',
        'Roboto Slab',
        'Open Sans',
        'Lato Light',
        'Montserrat'
      ]
      const statuses = ['Active', 'Pending', 'Completed', 'On Hold']
      const priorities = ['High', 'Medium', 'Low']

      return Array.from({ length: 8 }, (_, i) => {
        const status = statuses[falso.randNumber({ min: 0, max: statuses.length - 1 })]
        const priority = priorities[falso.randNumber({ min: 0, max: priorities.length - 1 })]
        const daysAgo = falso.randNumber({ min: 1, max: 30 })
        const date = new Date()
        date.setDate(date.getDate() - daysAgo)

        return {
          id: i + 1,
          project: projects[i],
          client: clients[i],
          status,
          priority,
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          value: falso.randFloat({ min: 100, max: 9999, fraction: 2 })
        }
      })
    },
    []
  )

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'On Hold':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return 'text-red-400'
      case 'Medium':
        return 'text-yellow-400'
      case 'Low':
        return 'text-slate-400'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div className='h-full p-8 bg-slate-950/50' style={style}>
      <header className='flex justify-between items-end mb-10 border-b border-white/10 pb-6'>
        <div>
          <h1 className='font-heading text-3xl text-white mb-2'>Type Metrics</h1>
          <p className='font-body text-sm text-slate-400'>
            Tracking all your typography needs.{' '}
            <a
              href='#'
              className='body-link text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400'
            >
              Read the docs
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
            <div className='flex items-center justify-between mb-3'>
              <div className='font-ui text-[10px] text-slate-400 uppercase tracking-widest opacity-70'>
                {stat.label}
              </div>
              {stat.trend === 'up' ? (
                <TrendingUp size={14} className='text-emerald-400' />
              ) : (
                <TrendingDown size={14} className='text-red-400' />
              )}
            </div>
            <div className='font-heading text-4xl text-white mb-3'>
              {stat.val}
            </div>
            <span
              className={`font-ui text-[10px] font-bold px-2 py-1 rounded border ${
                stat.trend === 'up'
                  ? 'text-emerald-400 bg-emerald-900/30 border-emerald-500/20'
                  : 'text-red-400 bg-red-900/30 border-red-500/20'
              }`}
            >
              {stat.delta}
            </span>
          </GlassPanel>
        ))}
      </div>
      <GlassPanel className='overflow-hidden'>
        <div className='p-6 border-b border-white/5 flex justify-between items-center bg-white/5'>
          <div>
            <h3 className='font-heading text-lg text-white mb-1'>
              Active Projects
            </h3>
            <p className='font-body text-xs text-slate-400 prose prose-sm max-w-none'>
              Because someone has to fix the font rendering issues
            </p>
          </div>
          <button className='font-ui text-[10px] text-blue-400 hover:text-blue-300 uppercase tracking-wider font-bold flex items-center gap-1 shrink-0'>
            View All
            <ArrowUpDown size={12} />
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full font-body text-sm text-left'>
            <thead className='bg-black/20 font-ui text-[10px] uppercase text-slate-500 tracking-wider border-b border-white/5'>
              <tr>
                <th className='px-6 py-4 font-semibold'>
                  <div className='flex items-center gap-2'>
                    Project
                    <ArrowUpDown size={10} className='opacity-50' />
                  </div>
                </th>
                <th className='px-6 py-4 font-semibold'>
                  <div className='flex items-center gap-2'>
                    Client
                    <User size={10} className='opacity-50' />
                  </div>
                </th>
                <th className='px-6 py-4 font-semibold'>Status</th>
                <th className='px-6 py-4 font-semibold'>Priority</th>
                <th className='px-6 py-4 font-semibold'>
                  <div className='flex items-center gap-2'>
                    Date
                    <Clock size={10} className='opacity-50' />
                  </div>
                </th>
                <th className='px-6 py-4 text-right font-semibold'>
                  <div className='flex items-center justify-end gap-2'>
                    Value
                    <DollarSign size={10} className='opacity-50' />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5 text-slate-300'>
              {transactions.map(transaction => (
                <tr
                  key={transaction.id}
                  className='hover:bg-white/5 transition-colors group'
                >
                  <td className='px-6 py-4'>
                    <div className='text-white font-medium'>
                      {transaction.project}
                    </div>
                    <div className='text-xs text-slate-500 mt-0.5'>
                      ID: #{String(transaction.id).padStart(4, '0')}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0'>
                        {transaction.client
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                      <span className='font-body text-sm'>{transaction.client}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`font-ui text-[10px] px-2.5 py-1 rounded-full border ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`font-ui text-[10px] font-semibold ${getPriorityColor(
                        transaction.priority
                      )}`}
                    >
                      {transaction.priority}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='font-body text-xs text-slate-400'>
                      {transaction.date}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <code className='body-code bg-slate-800/50 px-2.5 py-1 rounded text-cyan-300 font-mono text-sm'>
                        {Number(transaction.value).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </code>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className='bg-black/10 border-t border-white/5'>
              <tr>
                <td colSpan={5} className='px-6 py-4 text-right font-ui text-[10px] uppercase text-slate-500 tracking-wider'>
                  Total
                </td>
                <td className='px-6 py-4 text-right'>
                  <div className='font-heading text-lg text-white'>
                    {transactions
                      .reduce((sum, t) => sum + Number(t.value), 0)
                      .toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassPanel>
    </div>
  )
}

export default DashboardPreview
