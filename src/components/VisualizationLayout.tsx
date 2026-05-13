'use client'

import { ReactNode } from 'react'

interface VisualizationLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export default function VisualizationLayout({ 
  children, 
  title, 
  description 
}: VisualizationLayoutProps) {
  return (
    <div className="pt-28 min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          {description && (
            <p className="text-lg text-slate-300">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
