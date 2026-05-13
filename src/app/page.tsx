import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import CO2Charts from '@/components/CO2Charts'
import EnergySourcesChart from '@/components/EnergySourcesChart'
import ExtremeWeatherMap from '@/components/ExtremeWeatherMap'
import OzoneVisualization from '@/components/OzoneVisualization'
import TemperatureAnomalyChart from '@/components/TemperatureAnomalyChart'

function SummaryCard({
  eyebrow,
  title,
  summary,
  href,
  className = '',
}: {
  eyebrow: string
  title: string
  summary: string
  href: string
  className?: string
}) {
  return (
    <aside className={`rounded-lg border border-white/10 bg-slate-950/80 p-6 shadow-2xl ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4 leading-8 text-slate-300">{summary}</p>
      <Link
        href={href}
        className="mt-6 inline-flex rounded-md bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
      >
        View full page
      </Link>
    </aside>
  )
}

function HomeSection({
  sectionIndex,
  id,
  eyebrow,
  title,
  summary,
  href,
  children,
}: {
  sectionIndex: number
  id: string
  eyebrow: string
  title: string
  summary: string
  href: string
  children: ReactNode
}) {
  const reversed = sectionIndex % 2 === 1
  const dark = sectionIndex % 2 === 1
  const gridColumns = reversed
    ? 'lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]'
    : 'lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)]'

  return (
    <section id={id} className={`${dark ? 'bg-slate-900' : 'bg-slate-950'} px-4 py-20 sm:px-6 lg:px-8`}>
      <div
        className={`mx-auto grid max-w-7xl gap-8 lg:items-center ${gridColumns} ${
          reversed ? 'lg:[&>aside]:order-2 lg:[&>div]:order-1' : ''
        }`}
      >
        <SummaryCard eyebrow={eyebrow} title={title} summary={summary} href={href} />
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

function CenteredHomeSection({
  sectionIndex,
  id,
  eyebrow,
  title,
  summary,
  href,
  children,
}: {
  sectionIndex: number
  id: string
  eyebrow: string
  title: string
  summary: string
  href: string
  children: ReactNode
}) {
  const dark = sectionIndex % 2 === 1

  return (
    <section id={id} className={`${dark ? 'bg-slate-900' : 'bg-slate-950'} px-4 py-20 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl space-y-8">
        <SummaryCard
          eyebrow={eyebrow}
          title={title}
          href={href}
          summary={summary}
          className="mx-auto max-w-4xl text-center"
        />
        {children}
      </div>
    </section>
  )
}

export default function Home() {
  const homepageSections = [
    {
      id: 'extreme-weather',
      eyebrow: 'Extreme Weather',
      title: 'Climate-linked events around the world',
      href: '/extreme-weather',
      summary:
        'A global map of major weather and climate events. Use it as a quick entry point, then open the full page for event details, references, and impact discussion.',
      content: <ExtremeWeatherMap />,
    },
    {
      id: 'surface-temperature',
      eyebrow: 'Surface Temperature',
      title: 'The long-term warming signal',
      href: '/surface-temperature',
      summary:
        'Annual temperature anomalies summarize how global temperatures have shifted over time. The full page explains how to read the trend and why it matters.',
      content: <TemperatureAnomalyChart />,
    },
    {
      id: 'co2',
      eyebrow: 'Atmospheric CO2',
      title: 'The greenhouse gas driver',
      href: '/co2',
      summary:
        'CO2 concentrations show the atmospheric buildup behind much of modern warming. The full page explains the seasonal cycle, long-term trend, and mitigation paths.',
      content: <CO2Charts />,
    },
    {
      id: 'ozone-layer',
      eyebrow: 'Ozone Layer',
      title: 'Ozone hole and CFC recovery',
      href: '/ozone',
      summary:
        'The ozone visualization pairs yearly satellite imagery with CFC trends. The full page connects the data to the Montreal Protocol, why ozone protection matters, and what continued recovery depends on.',
      content: <OzoneVisualization />,
      centered: true,
    },
    {
      id: 'energy-sources',
      eyebrow: 'Energy Sources',
      title: 'Electricity production by source',
      href: '/energy-sources',
      summary:
        'A stacked area chart compares fossil, nuclear, and renewable electricity production globally and by continent. The full page explains the transition stakes.',
      content: <EnergySourcesChart />,
    },
    {
      id: 'take-action',
      eyebrow: 'Take Action',
      title: 'From visualization to response',
      href: '/action',
      summary:
        'The project ends by translating climate indicators into practical individual, community, and policy-level responses.',
      content: (
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Individual', 'Reduce energy use, choose low-carbon transport, waste less, and support cleaner products.'],
            ['Community', 'Support local resilience planning, clean energy projects, and public climate education.'],
            ['Systems', 'Back policies and investments that reduce emissions and protect carbon-storing ecosystems.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-cyan-300/20 bg-slate-900 p-6">
              <h3 className="text-2xl font-bold text-cyan-200">{title}</h3>
              <p className="mt-4 leading-8 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <main className="bg-slate-950">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
        <Image
          src="/imgs/climateChangeGlobal.jpeg"
          alt="A landscape affected by climate change"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Climate Data Visualization
            </p>
            <h1 className="mt-5 text-6xl font-black leading-none text-white md:text-8xl">
              Climate Change
            </h1>
            <p className="mt-6 max-w-3xl text-2xl leading-10 text-slate-100">
              A scrollable overview of the project visualizations, with each section linking to a deeper page for
              context, impacts, and possible responses.
            </p>
            <a
              href="#extreme-weather"
              className="mt-10 inline-flex rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              Start Exploring
            </a>
          </div>
        </div>
      </section>

      {homepageSections.map((section, index) =>
        section.centered ? (
          <CenteredHomeSection key={section.id} sectionIndex={index} {...section}>
            {section.content}
          </CenteredHomeSection>
        ) : (
          <HomeSection key={section.id} sectionIndex={index} {...section}>
            {section.content}
          </HomeSection>
        ),
      )}
    </main>
  )
}
