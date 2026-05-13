'use client'

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useCSVData } from '@/hooks/useData'

export default function CO2Charts() {
  const { data, loading, error } = useCSVData('CO2_monthly_mean_data.csv')

  if (loading) return <div className="text-slate-300">Loading CO2 data...</div>
  if (error) return <div className="text-red-300">Error: {error}</div>

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Monthly Mean CO2</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
            <XAxis dataKey="decimal date" stroke="#94a3b8" tick={{ fill: '#cbd5e1' }} />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#cbd5e1' }}
              label={{ value: 'CO2 (PPM)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
            />
            <Tooltip
              contentStyle={{ background: '#020617', border: '1px solid #334155', color: '#e2e8f0' }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="average" stroke="#38bdf8" dot={false} strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Deseasonalized CO2</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
            <XAxis dataKey="decimal date" stroke="#94a3b8" tick={{ fill: '#cbd5e1' }} />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#cbd5e1' }}
              label={{ value: 'CO2 (PPM)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
            />
            <Tooltip
              contentStyle={{ background: '#020617', border: '1px solid #334155', color: '#e2e8f0' }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="deseasonalized" stroke="#4ade80" dot={false} strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
