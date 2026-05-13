'use client'

import { useState } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Extreme Weather', href: '/#extreme-weather' },
  { name: 'Surface Temperature', href: '/#surface-temperature' },
  { name: 'CO2', href: '/#co2' },
  { name: 'Ozone Layer', href: '/#ozone-layer' },
  { name: 'Energy Sources', href: '/#energy-sources' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="min-w-0 flex-1" onClick={() => setMenuOpen(false)}>
            <span className="block truncate text-2xl font-bold text-cyan-300 sm:text-3xl">Climate Data</span>
          </Link>

          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              href="/#take-action"
              onClick={() => setMenuOpen(false)}
              className="whitespace-nowrap rounded-md border border-cyan-300/30 px-3 py-2 text-sm font-bold text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100 sm:px-4"
            >
              Take Action
            </Link>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl backdrop-blur sm:left-auto sm:right-6 sm:mt-3 sm:w-80 sm:rounded-lg sm:border sm:border-white/10 sm:px-3">
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900 hover:text-cyan-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
