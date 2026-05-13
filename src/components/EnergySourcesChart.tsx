'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCSVData } from '@/hooks/useData'

type DatasetKey = 'world' | 'asia' | 'africa' | 'northAmerica' | 'southAmerica' | 'europe' | 'oceania'

type EnergyRow = {
  Year: number
  [key: string]: number | string
}

type SourceConfig = {
  key: string
  label: string
  color: string
}

const worldSources: SourceConfig[] = [
  { key: 'Electricity from coal - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Coal', color: '#586994' },
  { key: 'Electricity from gas - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Gas', color: '#c0847a' },
  { key: 'Electricity from oil - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Oil', color: '#8f8f8f' },
  { key: 'Electricity from nuclear - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Nuclear', color: '#b38b59' },
  { key: 'Electricity from hydro - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Hydro', color: '#2aa9a1' },
  { key: 'Electricity from wind - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Wind', color: '#d946ef' },
  { key: 'Electricity from solar - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Solar', color: '#facc15' },
  { key: 'Electricity from bioenergy - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Bioenergy', color: '#84cc16' },
  { key: 'Other renewables excluding bioenergy - TWh (adapted for visualization of chart electricity-prod-source-stacked)', label: 'Other Renewables', color: '#60a5fa' },
]

const continentSources: SourceConfig[] = [
  { key: 'Electricity.from.coal...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Coal', color: '#586994' },
  { key: 'Electricity.from.gas...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Gas', color: '#c0847a' },
  { key: 'Electricity.from.oil...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Oil', color: '#8f8f8f' },
  { key: 'Electricity.from.nuclear...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Nuclear', color: '#b38b59' },
  { key: 'Electricity.from.hydro...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Hydro', color: '#2aa9a1' },
  { key: 'Electricity.from.wind...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Wind', color: '#d946ef' },
  { key: 'Electricity.from.solar...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Solar', color: '#facc15' },
  { key: 'Electricity.from.bioenergy...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Bioenergy', color: '#84cc16' },
  { key: 'Other.renewables.excluding.bioenergy...TWh..adapted.for.visualization.of.chart.electricity.prod.source.stacked.', label: 'Other Renewables', color: '#60a5fa' },
]

const datasets: Record<DatasetKey, { label: string; file: string; sources: SourceConfig[] }> = {
  world: { label: 'World', file: 'electricity-prod-source-stacked.csv', sources: worldSources },
  asia: { label: 'Asia', file: 'shareElecBySourceAS.csv', sources: continentSources },
  africa: { label: 'Africa', file: 'shareElecBySourceAF.csv', sources: continentSources },
  northAmerica: { label: 'North America', file: 'shareElecBySourceNA.csv', sources: continentSources },
  southAmerica: { label: 'South America', file: 'shareElecBySourceSA.csv', sources: continentSources },
  europe: { label: 'Europe', file: 'shareElecBySourceEU.csv', sources: continentSources },
  oceania: { label: 'Oceania', file: 'shareElecBySourceOC.csv', sources: continentSources },
}

function normalizeRows(rows: EnergyRow[], sources: SourceConfig[]) {
  return rows
    .filter((row) => Number.isFinite(Number(row.Year)))
    .map((row) => {
      const normalized: Record<string, number> = { Year: Number(row.Year) }
      sources.forEach((source) => {
        normalized[source.label] = Number(row[source.key] ?? 0)
      })
      return normalized
    })
}

export default function EnergySourcesChart() {
  const [activeDataset, setActiveDataset] = useState<DatasetKey>('world')
  const active = datasets[activeDataset]
  const { data, loading, error } = useCSVData(active.file)
  const chartData = useMemo(() => normalizeRows(data as EnergyRow[], active.sources), [data, active.sources])

  if (loading) return <div className="text-slate-300">Loading electricity data...</div>
  if (error) return <div className="text-red-300">Error: {error}</div>

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Electricity Production by Source</h2>
          <p className="text-sm text-slate-300 mt-1">Stacked annual production in terawatt-hours.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(datasets) as DatasetKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDataset(key)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                activeDataset === key
                  ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                  : 'border-slate-600 bg-slate-900 text-slate-200 hover:border-cyan-300 hover:text-cyan-200'
              }`}
            >
              {datasets[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={420}>
          <AreaChart data={chartData} margin={{ top: 16, right: 24, bottom: 16, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
            <XAxis dataKey="Year" stroke="#94a3b8" tick={{ fill: '#cbd5e1' }} />
            <YAxis
              tickFormatter={(value) => `${Number(value) / 1000}k`}
              stroke="#94a3b8"
              tick={{ fill: '#cbd5e1' }}
            />
            <Tooltip
              formatter={(value: number, name) => [`${value.toFixed(1)} TWh`, name]}
              contentStyle={{ background: '#020617', border: '1px solid #334155', color: '#e2e8f0' }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            {active.sources.map((source) => (
              <Area
                key={source.label}
                type="monotone"
                dataKey={source.label}
                stackId="energy"
                stroke={source.color}
                fill={source.color}
                fillOpacity={0.68}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
