'use client'

import VisualizationLayout from '@/components/VisualizationLayout'
import OzoneVisualization from '@/components/OzoneVisualization'

export default function OzonePage() {
  return (
    <VisualizationLayout
      title="Ozone Layer"
      description="Monitoring the recovery of Earth's ozone layer"
    >
      <div className="space-y-8">
        <OzoneVisualization />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What It Shows</h2>
            <p className="mt-3 leading-7 text-slate-300">
              The slider shows yearly Antarctic ozone images from 1979-2019. The line chart tracks several CFC gases in
              the northern and southern hemispheres over the same period.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">Why It Matters</h2>
            <p className="mt-3 leading-7 text-slate-300">
              The ozone layer shields life from harmful ultraviolet radiation. Ozone loss increases risks to human
              health, crops, marine food chains, and ecosystems.
            </p>
          </section>
          <section className="rounded-lg border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white">What Can Help</h2>
            <p className="mt-3 leading-7 text-slate-300">
              The Montreal Protocol shows that coordinated policy can work. Continued monitoring, proper refrigerant
              disposal, and avoiding ozone-depleting substitutes help protect recovery.
            </p>
          </section>
        </div>
      </div>
    </VisualizationLayout>
  )
}
