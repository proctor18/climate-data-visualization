'use client'

import VisualizationLayout from '@/components/VisualizationLayout'
import CO2Charts from '@/components/CO2Charts'

export default function CO2Page() {
  return (
    <VisualizationLayout
      title="Monthly Mean CO2"
      description="Atmospheric carbon dioxide measurements from 1958-2024"
    >
      <div className="space-y-8">
        <CO2Charts />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What It Shows</h2>
            <p className="mt-3 leading-7 text-slate-300">
              These charts show monthly atmospheric carbon dioxide concentrations and a deseasonalized trend line.
              The seasonal cycle rises and falls each year, but the long-term direction is steadily upward.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Why It Matters</h2>
            <p className="mt-3 leading-7 text-slate-300">
              CO2 traps heat in the atmosphere. Rising concentrations are one of the clearest measurements of the
              human-driven changes behind global warming, sea-level rise, and intensifying climate risks.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What Can Help</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Cutting fossil fuel use, electrifying buildings and transport, protecting carbon-rich ecosystems, and
              expanding clean energy all reduce the rate at which CO2 accumulates.
            </p>
          </section>
        </div>
      </div>
    </VisualizationLayout>
  )
}
