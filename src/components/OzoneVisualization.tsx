'use client'

import { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCSVData } from '@/hooks/useData'

const cfcLines = [
  { key: 'CFC11_NH', label: 'CFC-11 NH', color: '#2563eb' },
  { key: 'CFC11_SH', label: 'CFC-11 SH', color: '#9333ea' },
  { key: 'CFC12_NH', label: 'CFC-12 NH', color: '#16a34a' },
  { key: 'CFC12_SH', label: 'CFC-12 SH', color: '#eab308' },
  { key: 'CFC113_NH', label: 'CFC-113 NH', color: '#f97316' },
  { key: 'CFC113_SH', label: 'CFC-113 SH', color: '#dc2626' },
]

export default function OzoneVisualization() {
  const [year, setYear] = useState(2000)
  const { data, loading, error } = useCSVData('cfc_data.csv')

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-white">Antarctic Ozone Hole</h2>
            <span className="text-3xl font-bold text-cyan-200">{year}</span>
        </div>

        <div className="relative mx-auto flex max-w-3xl items-center justify-center overflow-hidden rounded-md border border-slate-700 bg-slate-900">
          <img
            src={`/imgs/ozone_images/${year}.png`}
            alt={`Antarctic ozone hole in ${year}`}
            className="h-auto max-h-[320px] w-auto max-w-full object-contain sm:max-h-[380px] lg:max-h-[440px]"
          />
          <div className="absolute bottom-3 right-3 flex max-h-[38%] items-center justify-center rounded-md border border-slate-700 bg-slate-950/80 p-2 shadow-2xl backdrop-blur-sm">
            <img src="/imgs/dobson_legend.png" alt="Dobson unit legend" className="max-h-20 w-auto sm:max-h-28 lg:max-h-36" />
          </div>
        </div>

          <label className="mt-6 block text-sm font-medium text-slate-200" htmlFor="ozone-year">
            Year
          </label>
          <input
            id="ozone-year"
            type="range"
            min="1979"
            max="2019"
            step="1"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            className="mt-2 w-full accent-cyan-300"
          />
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">CFC Levels by Hemisphere</h2>
        <p className="text-sm text-slate-300 mb-6">Atmospheric concentration in parts per trillion, 1979-2019.</p>
        {loading && <div className="text-slate-300">Loading CFC data...</div>}
        {error && <div className="text-red-300">Error: {error}</div>}
        {!loading && !error && (
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
              <XAxis
                dataKey="YEAR"
                tickFormatter={(value) => String(Math.floor(Number(value)))}
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1' }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#cbd5e1' }}
                label={{ value: 'Concentration (ppt)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
              />
              <Tooltip
                formatter={(value: number, name) => [`${value.toFixed(1)} ppt`, name]}
                labelFormatter={(label) => `Year ${Math.floor(Number(label))}`}
                contentStyle={{ background: '#020617', border: '1px solid #334155', color: '#e2e8f0' }}
                labelStyle={{ color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              {cfcLines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.label}
                  stroke={line.color}
                  dot={false}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
