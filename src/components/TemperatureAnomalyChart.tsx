'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCSVData } from '@/hooks/useData'

type TemperatureRow = {
  Year: number
  Anomaly: number
}

export default function TemperatureAnomalyChart() {
  const { data, loading, error } = useCSVData('GlobalAvgTempAnom.csv')
  const rows = data as TemperatureRow[]

  if (loading) return <div className="text-slate-300">Loading temperature data...</div>
  if (error) return <div className="text-red-300">Error: {error}</div>

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-2">Global Temperature Anomalies</h2>
      <p className="text-sm text-slate-300 mb-6">Annual surface temperature anomaly in degrees Celsius.</p>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={rows} margin={{ top: 16, right: 24, bottom: 16, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
          <XAxis
            dataKey="Year"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => String(value)}
            stroke="#94a3b8"
            tick={{ fill: '#cbd5e1' }}
          />
          <YAxis
            tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
            stroke="#94a3b8"
            tick={{ fill: '#cbd5e1' }}
            label={{ value: 'Anomaly (C)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)} C`, 'Anomaly']}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ background: '#020617', border: '1px solid #334155', color: '#e2e8f0' }}
            labelStyle={{ color: '#f8fafc' }}
          />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="Anomaly" stroke="#fb7185" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
