'use client'

import VisualizationLayout from '@/components/VisualizationLayout'

export default function ActionPage() {
  return (
    <VisualizationLayout
      title="Take Action"
      description="What you can do about climate change"
    >
      <div className="rounded-lg border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Individual Actions</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Reduce energy consumption at home</li>
              <li>Use renewable energy sources</li>
              <li>Reduce, reuse, and recycle</li>
              <li>Use sustainable transportation</li>
              <li>Support climate-friendly businesses</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Community Actions</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Join local environmental groups</li>
              <li>Advocate for renewable energy policies</li>
              <li>Support sustainable urban planning</li>
              <li>Participate in climate education initiatives</li>
            </ul>
          </div>

          <div className="p-4 bg-cyan-300/10 border-l-4 border-cyan-300">
            <p className="text-cyan-100 font-semibold">Global Impact</p>
            <p className="text-cyan-50 text-sm mt-2">
              Addressing climate change requires action at all levels - individual, community, national, and
              international. Together, we can create positive change for our planet.
            </p>
          </div>
        </div>
      </div>
    </VisualizationLayout>
  )
}
