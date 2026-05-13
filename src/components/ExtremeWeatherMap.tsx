'use client'

import { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'
import { feature } from 'topojson-client'
import { select } from 'd3-selection'
import land from 'world-atlas/land-110m.json'

type Location = {
  name: string
  lon: number
  lat: number
  type: string
  brief: string
  info: string
  reference: string
  imgCitation: string
}

const colorScale: Record<string, string> = {
  FLOOD: '#925CFF',
  HEAT: '#EB8D00',
  DROUGHT: '#FFEE00',
  ICEMELT: '#FAFAFA',
  TYPHOON: '#A1A2A5',
  RISINGSEA: '#AA8FFF',
  FF: '#FF4647',
  TSUNAMI: '#93C83C',
  PRECIP: '#6BA5FF',
  COASTAL: '#34D8CC',
}

const imageMap: Record<string, string> = {
  FLOOD: '/imgs/floodImg.jpg',
  HEAT: '/imgs/heatWaveImg.jpg',
  DROUGHT: '/imgs/droughtImg.jpg',
  ICEMELT: '/imgs/meltingIceImg.jpg',
  TYPHOON: '/imgs/typhoonImg.jpg',
  RISINGSEA: '/imgs/seaLevelsImg.jpg',
  FF: '/imgs/wildfiresImg.jpg',
  TSUNAMI: '/imgs/tsunamiImg.jpg',
  PRECIP: '/imgs/precipImg.jpg',
  COASTAL: '/imgs/coastalStormImg.jpg',
}

const locations: Location[] = [
  {
    name: 'Floods',
    lon: 68.7356,
    lat: 26.3747,
    type: 'FLOOD',
    brief:
      '2022 | Pakistan | 1/3 of the Country | 1,739 Deaths | 33 Million Affected | Damages: $40 Billion (Estimated USD)',
    info:
      'Heavy monsoon rains caused widespread flooding in Pakistan. Model-based analysis confirms that the trend in cross-equatorial moisture transport is consistent with the fingerprint of anthropogenic climate warming. The 2022 floods in Pakistan resulted in devastating loss of life, displacement of millions, and significant damage to infrastructure and agriculture, exacerbating an already challenging humanitarian situation in the region.',
    reference:
      'You Y. et al., (2024) Climate warming contributes to the record-shattering 2022 Pakistan rainfall, npj Climate and Atmospheric Science, doi:10.1038/s41612-024-00630-4',
    imgCitation: '',
  },
  {
    name: 'Heat Waves',
    lon: -2.0,
    lat: 52.0,
    type: 'HEAT',
    brief:
      '2022 | United Kingdom | Highest Recorded Temperature 40.3°C | 2,985 Excess Deaths in Summer of 2022',
    info:
      'Human-caused climate change made the event at least 10 times more likely. In observational analysis and study models, the same event would be about 2C less hot in a 1.2°C cooler world. On July 19, the heat reached 40.3°C (104.5°F), the hottest ever recorded in the UK, resulting in around 1,700 excess deaths, mainly among vulnerable individuals.',
    reference:
      'Zachariah, M. et al., (2022). Without human-caused climate change temperatures of 40°C in the UK would have been extremely unlikely, World Weather Attribution',
    imgCitation: '',
  },
  {
    name: 'Tsunami',
    lon: -26.965,
    lat: 72.817,
    type: 'TSUNAMI',
    brief:
      '2023 | Greenland | Global Seismic Vibrations for Nine Days | 200m High Waves',
    info:
      'Greenland tsunami was triggered by a series of factors, including the melting glacial ice due to global warming. Greenland, being highly sensitive to rising temperatures, has experienced accelerated glacial retreat and destabilization in recent years, making landslides more frequent and severe. The event started a seismic vibration that was detectable around the world for over a week.',
    reference:
      'Svennevig K. et al., A rockslide-generated tsunami in a Greenland fjord rang Earth for 9 days. Science. 385,1196-1205(2024). DOI:10.1126/science.adm9247',
    imgCitation: '',
  },
  {
    name: 'Drought',
    lon: 38.0,
    lat: 8.0,
    type: 'DROUGHT',
    brief:
      '2017 | East Africa: Ethiopia, Kenya, Somalia, South Sudan | 40°C Recorded Temperatures | 10,000+ Deaths | 23 Million Left in Urgent Need of Food, Water, and Medical Treatment',
    info:
      'Anthropogenic warming of Western V sea surface temperatures contributed to East African drought. Extremely warm Western V SST doubled the probability of drought, contributing to widespread food insecurity. The 2017 East African drought impacted millions across countries like Somalia and Ethiopia, leading to severe food insecurity and malnutrition. Estimates suggest that tens of thousands lost their lives due to famine and related health issues.',
    reference:
      'Funk, C. et al. 2018: Examining the Potential Contributions of Extreme “Western V” Sea Surface Temperatures to the 2017 March–June East African Drought. Explaining Extreme Events of 2017 from a Climate Perspective. Bull. Amer. Meteor. Soc., doi:10.1175/BAMS-D-18-0108.1',
    imgCitation: '',
  },
  {
    name: 'Coastal Storms',
    lon: -80.0,
    lat: 35.0,
    type: 'COASTAL',
    brief:
      '2024 | Catastrophic Helene Rainfall | United States | 249 Deaths',
    info:
      'Anthropogenic climate change causing warmer ocean and air temperatures has led to an increase in the intensity of hurricanes. Sea level rise has also made coastal storms more damaging, in the last century, sea levels have already risen more than half a foot, a trend expected to more than double to between 1 and 2.5 feet in the current century. In a 1.5°C warming world, these events are more common, more severe, and more deadly. Hurricane Helene was the deadliest hurricane in the contiguous United States since Katrina (2005).',
    reference:
      'Clarke, B. et al., (2024). Climate change key driver of catastrophic impacts of Hurricane Helene that devastated both coastal and inland communities. spiral.imperial.ac.uk. https://doi.org/10.25561/115024',
    imgCitation: '',
  },
  {
    name: 'Rising Sea Levels',
    lon: -52.5055,
    lat: -32.026,
    type: 'RISINGSEA',
    brief:
      '2024 | Rio Grande do Sul, Brazil | 181 Deaths | 2.4 Million Affected | Damages: $3.7 Billion (Estimated USD)',
    info:
      'In 2024, the state of Rio Grande do Sul in Brazil saw massive flooding caused by heavy rain and storms. These floods have been exacerbated by climate change and El Niño, alongside the rising water levels that have led to even more displacement and destruction. According to the 2023 IPCC report, relative sea levels in the South Atlantic have increased at a higher rate than the global mean. This trend is extremely likely to continue, contributing to increased coastal flooding and shoreline retreat.',
    reference:
      'IPCC, (2023). Regional fact sheet -- Central and South America. Sixth Assessment Report. https://www.ipcc.ch/report/ar6/wg1/downloads/factsheets/IPCC_AR6_WGI_Regional_Fact_Sheet_Central_and_South_America.pdf',
    imgCitation: '',
  },
  {
    name: 'Precipitation',
    lon: 10.0,
    lat: 48.0,
    type: 'PRECIP',
    brief:
      '2021 | Western Europe | 300mm in 24 Hours | 243 Deaths | Damages: $35 Billion (Estimated USD)',
    info:
      'Extreme rainfall over the period of 1-2 days led to massive flooding. The historic amount of rain broke records by wide margins, creating conditions no area was prepared for, leading to massive devastation. The amounts of rainfall observed in Western Europe in 2021 would have once been considered a once-in-a-millennium event, but climate scientists have suggested the frequency of such events is increasing, and will likely become more frequent in the future.',
    reference:
      'Kreienkamp, F. et al., (2021). Rapid attribution of heavy rainfall events in Western Europe July 2021. World Weather Attribution.',
    imgCitation: '',
  },
  {
    name: 'Forest Fires',
    lon: 133.2711,
    lat: -22.739,
    type: 'FF',
    brief:
      '2020 | Australian Bushfires | 19 Million Hectares Burnt | 715 Million Tonnes of CO₂ Emitted | 3 Billion Animals Killed or Displaced',
    info:
      'In 2019 and 2020, the Black Summer bushfires ravaged Australia, making global news. During the fires, more than three billion animals were killed or displaced. These extreme wildfire events are more common and expected to increase by 50% as a result of anthropogenic climate change through extreme heat, dryness, and faster wind speeds. Emissions from wildfires contributed 4.8% to total global emissions in 2021, a total of 1.76 billion tonnes.',
    reference:
      'Hortle, R. (2025, February 25). In a dangerously warming world, we must confront the grim reality of Australia’s bushfire emissions. University of Tasmania. https://www.utas.edu.au/about/news-and-stories/articles/2024/',
    imgCitation: '',
  },
  {
    name: 'Antarctica',
    lon: 0.0,
    lat: -80.2917,
    type: 'ICEMELT',
    brief:
      '2023 | Ice Melt | Antarctica | 16 in (40.6 cm) Predicted Sea Level Rise by 2100 | 150 Billion Tonnes of Ice Lost per Year',
    info:
      'Antarctic sea ice extent hit a record low in 2023, and the trend of Antarctic ice has continued at a rate of 150 billion tonnes per year. Antarctic sea ice acts as a global air conditioning system by reflecting sunlight and cooling polar vortexes. This feedback loop is actively contributing to increasing global warming, and in the Arctic, leading to warming at a rate twice the global average.',
    reference:
      'IPCC, (2023). Regional fact sheet -- Polar Regions. Sixth Assessment Report. https://www.ipcc.ch/report/ar6/wg1/downloads/factsheets/IPCC_AR6_WGI_Regional_Fact_Sheet_Polar_regions.pdf',
    imgCitation: '',
  },
]

const getImagePath = (type: string) => imageMap[type] ?? '/imgs/EventsLegend.svg'

function resolveLocation(datum: unknown, element?: SVGCircleElement): Location | null {
  if (datum && typeof datum === 'object' && 'name' in datum) {
    return datum as Location
  }

  if (typeof datum === 'number') {
    return locations[datum] ?? null
  }

  const title = element?.querySelector('title')?.textContent
  if (title) {
    return locations.find((location) => location.name === title) ?? null
  }

  return null
}

function createPopup(location: Location) {
  select('#popup').remove()
  const { year, details } = formatBrief(location.brief)

  const popup = select('body')
    .append('div')
    .attr('id', 'popup')
    .style('position', 'fixed')
    .style('left', '50%')
    .style('top', '50%')
    .style('transform', 'translate(-50%, -50%)')
    .style('box-sizing', 'border-box')
    .style('background', 'rgba(22, 33, 52, 0.98)')
    .style('padding', 'clamp(16px, 3vw, 24px)')
    .style('border', '1px solid rgba(148, 163, 184, 0.45)')
    .style('border-radius', '16px')
    .style('z-index', '1000')
    .style('width', 'min(1280px, calc(100vw - clamp(48px, 8vw, 120px)))')
    .style('max-height', 'calc(100dvh - clamp(48px, 8vw, 120px))')
    .style('overflow-y', 'auto')
    .style('overscroll-behavior', 'contain')
    .style('color', 'white')
    .style('box-shadow', '0 24px 80px rgba(0, 0, 0, 0.55)')

  const header = popup.append('div').style('display', 'flex').style('justify-content', 'space-between').style('align-items', 'center')
  header
    .append('h3')
    .text(location.name)
    .style('margin', '0')
    .style('font-size', 'clamp(1.4rem, 4vw, 2rem)')
    .style('font-weight', '700')
    .style('line-height', '1.15')

  header
    .append('button')
    .text('✕')
    .style('background', 'transparent')
    .style('border', 'none')
    .style('color', 'white')
    .style('font-size', '1.25rem')
    .style('cursor', 'pointer')
    .on('click', () => popup.remove())

  const content = popup
    .append('div')
    .style('display', 'grid')
    .style('grid-template-columns', 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))')
    .style('gap', '20px')
    .style('margin-top', '18px')

  content
    .append('div')
    .style('min-width', '160px')
    .style('border-radius', '14px')
    .style('overflow', 'hidden')
    .style('background', '#0f172a')
    .style('border', '1px solid rgba(148, 163, 184, 0.25)')
    .append('img')
    .attr('src', getImagePath(location.type))
    .attr('alt', location.name)
    .style('width', '100%')
    .style('max-height', 'min(42vh, 380px)')
    .style('object-fit', 'cover')
    .style('display', 'block')

  const textContainer = content.append('div')

  if (year) {
    textContainer
      .append('p')
      .text(year)
      .style('margin', '0 0 10px')
      .style('font-size', 'clamp(1.6rem, 5vw, 2.4rem)')
      .style('font-weight', '800')
      .style('line-height', '1')
      .style('color', '#67e8f9')
  }

  if (details.length > 0) {
    const detailList = textContainer
      .append('div')
      .style('display', 'flex')
      .style('flex-wrap', 'wrap')
      .style('gap', '8px')
      .style('margin', '0 0 18px')

    details.forEach((detail) => {
      detailList
        .append('span')
        .text(detail)
        .style('display', 'inline-flex')
        .style('align-items', 'center')
        .style('border', '1px solid rgba(103, 232, 249, 0.25)')
        .style('background', 'rgba(8, 47, 73, 0.35)')
        .style('border-radius', '999px')
        .style('padding', '6px 10px')
        .style('font-size', 'clamp(0.8rem, 2.5vw, 0.95rem)')
        .style('font-weight', '700')
        .style('line-height', '1.25')
        .style('color', '#e0f2fe')
    })
  } else {
    textContainer
      .append('p')
      .text(location.brief)
      .style('margin', '0 0 16px')
      .style('line-height', '1.5')
      .style('font-size', 'clamp(1rem, 2.5vw, 1.2rem)')
      .style('font-weight', '700')
  }

  textContainer
    .append('p')
    .html(location.info)
    .style('margin', '0')
    .style('line-height', '1.8')
    .style('font-size', 'clamp(0.95rem, 2vw, 1.05rem)')
    .style('opacity', '0.95')

  popup
    .append('div')
    .style('margin-top', '18px')
    .style('border-top', '1px solid rgba(148, 163, 184, 0.25)')
    .style('padding-top', '14px')
    .style('font-size', '0.9rem')
    .style('opacity', '0.9')
    .html(`<em>Reference: ${location.reference}</em>`)
}

function showTooltip(event: MouseEvent, location: Location) {
  select('#tooltip').remove()
  select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('left', `${event.pageX + 16}px`)
    .style('top', `${event.pageY + 16}px`)
    .style('background', 'rgba(15, 23, 42, 0.95)')
    .style('color', 'white')
    .style('padding', '10px 14px')
    .style('border-radius', '12px')
    .style('box-shadow', '0 10px 30px rgba(15, 23, 42, 0.35)')
    .style('pointer-events', 'none')
    .style('z-index', '1000')
    .style('font-size', '0.95rem')
    .html(`<strong>${location.name}</strong><br/>${location.brief}`)
}

function hideTooltip() {
  select('#tooltip').remove()
}

function formatBrief(brief: string) {
  const parts = brief.split('|').map((part) => part.trim()).filter(Boolean)
  const [year, ...details] = parts
  return { year, details }
}

export default function ExtremeWeatherMap() {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    const world = feature(land as any, (land as any).objects.land)
    container.innerHTML = ''

    const width = Math.max(760, container.clientWidth || 960)
    const height = Math.max(460, Math.min(620, width * 0.55))

    const plot = Plot.plot({
      width,
      height,
      projection: 'equal-earth',
      style: {
        background: '#0f172a',
        color: '#e2e8f0',
      },
      margin: 0,
      inset: 0,
      marks: [
        Plot.graticule({ stroke: '#64748b', strokeWidth: 0.5 }),
        Plot.geo(world, { fill: '#111827', stroke: '#475569', strokeWidth: 0.8 }),
        Plot.dot(locations, {
          x: 'lon',
          y: 'lat',
          r: 10,
          fill: (d: any) => colorScale[d.type] || '#94a3b8',
          fillOpacity: 0.9,
          stroke: 'white',
          strokeWidth: 1,
          title: (d: any) => d.name,
        }),
      ],
    })

    container.append(plot)

    const circles = select(container).selectAll('svg circle')
    circles
      .style('cursor', 'pointer')
      .on('click', function (this: SVGCircleElement, _event: MouseEvent, d: unknown) {
        const location = resolveLocation(d, this)
        if (location) createPopup(location)
      })
      .on('mouseover', function (this: SVGCircleElement, event: MouseEvent, d: unknown) {
        const location = resolveLocation(d, this)
        if (location) showTooltip(event, location)
      })
      .on('mousemove', function (event: MouseEvent) {
        select('#tooltip')
          .style('left', `${event.pageX + 16}px`)
          .style('top', `${event.pageY + 16}px`)
      })
      .on('mouseout', hideTooltip)

    return () => {
      container.innerHTML = ''
      hideTooltip()
      select('#popup').remove()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div ref={mapRef} className="w-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl" />
      <img
        src="/imgs/EventsLegend.svg"
        alt="Event legend"
        className="w-full max-w-6xl mx-auto"
      />
    </div>
  )
}
