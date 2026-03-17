'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologias', href: '#technologies' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contato', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 transition ${
          scrolled
            ? 'border-white/20 bg-slate-900/80 shadow-2xl shadow-black/30 backdrop-blur-xl'
            : 'border-white/10 bg-slate-900/40 backdrop-blur-md'
        }`}
      >
        <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-slate-100">
          ESDRA STUDIO
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:opacity-90">
            Iniciar projeto
          </a>
        </nav>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-white/20 p-2 text-slate-100 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-slate-900/95 p-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
