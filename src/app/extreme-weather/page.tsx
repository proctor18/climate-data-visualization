import VisualizationLayout from '@/components/VisualizationLayout'
import ExtremeWeatherMap from '@/components/ExtremeWeatherMap'

export default function ExtremeWeatherPage() {
  return (
    <VisualizationLayout
      title="Extreme Weather Events"
      description="Tracking climate-driven extreme weather around the world"
    >
      <div className="space-y-10">
        <ExtremeWeatherMap />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What It Shows</h2>
            <p className="mt-3 leading-7 text-slate-300">
              This map highlights major floods, heat waves, droughts, wildfires, storms, sea-level events, and ice melt
              examples. Click a marker to view event context, impacts, and source references.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Why It Matters</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Extreme events are where climate change becomes tangible. They affect food systems, infrastructure,
              insurance, water security, public health, displacement, and local economies.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What Can Help</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Adaptation reduces harm: stronger warning systems, resilient infrastructure, heat plans, floodplain
              protection, ecosystem restoration, and emissions cuts all lower future risk.
            </p>
          </section>
        </div>
      </div>
    </VisualizationLayout>
  )
}
