'use client'

import VisualizationLayout from '@/components/VisualizationLayout'
import TemperatureAnomalyChart from '@/components/TemperatureAnomalyChart'

export default function SurfaceTemperaturePage() {
  return (
    <VisualizationLayout
      title="Surface Temperature Anomalies"
      description="Global temperature variations over time"
    >
      <div className="space-y-8">
        <TemperatureAnomalyChart />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What It Shows</h2>
            <p className="mt-3 leading-7 text-slate-300">
              The chart plots annual global temperature anomalies from 1850 onward. Values above zero represent years
              warmer than the baseline; values below zero represent cooler years.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Why It Matters</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Temperature anomaly data makes the long-term warming trend visible. That warming increases the odds of
              heat waves, shifts precipitation, melts ice, raises seas, and stresses ecosystems.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What Can Help</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Rapid emissions cuts, cleaner electricity, efficient buildings, low-carbon transportation, and protecting
              forests and wetlands can slow the rate of warming and reduce future impacts.
            </p>
          </section>
        </div>
      </div>
    </VisualizationLayout>
  )
}
