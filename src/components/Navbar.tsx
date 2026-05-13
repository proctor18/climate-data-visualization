'use client'

import Link from 'next/link'

const navigation = [
  { name: 'Extreme Weather', href: '/#extreme-weather' },
  { name: 'Surface Temperature', href: '/#surface-temperature' },
  { name: 'CO2', href: '/#co2' },
  { name: 'Ozone Layer', href: '/#ozone-layer' },
  { name: 'Energy Sources', href: '/#energy-sources' },
  { name: 'Take Action', href: '/#take-action' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-cyan-300">Climate Data</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-200 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
