'use client'

import VisualizationLayout from '@/components/VisualizationLayout'
import EnergySourcesChart from '@/components/EnergySourcesChart'

export default function EnergySourcesPage() {
  return (
    <VisualizationLayout
      title="Renewable Energy Sources"
      description="Global electricity production by source"
    >
      <div className="space-y-8">
        <EnergySourcesChart />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What It Shows</h2>
            <p className="mt-3 leading-7 text-slate-300">
              The stacked chart shows how electricity production is divided among coal, gas, oil, nuclear, hydro, wind,
              solar, bioenergy, and other renewables. Region buttons reveal different energy mixes.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Why It Matters</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Electricity is central to climate action. Replacing fossil generation with clean power reduces emissions
              and makes electric vehicles, heat pumps, and industry cleaner over time.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What Can Help</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Grid upgrades, energy storage, transmission lines, efficiency, and policies that accelerate wind, solar,
              hydro, geothermal, and nuclear deployment can reduce fossil dependence.
            </p>
          </section>
        </div>
      </div>
    </VisualizationLayout>
  )
}
