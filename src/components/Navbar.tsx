'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'

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
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMounted(true), [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[var(--space-container)] py-4">
      <div className={`section-container flex items-center justify-between rounded-[var(--radius-card)] border px-5 py-3 transition ${scrolled ? 'glass-panel' : 'border bg-[var(--surface-2)]/95'}`}>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.24em]">
          <Sparkles size={14} className="text-[var(--accent-400)]" />
          ESDRA STUDIO
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[var(--neutral-200)] transition hover:text-[var(--neutral-100)]">
              {link.label}
            </a>
          ))}
          <button aria-label="Alternar tema" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="rounded-full border p-2">
            {mounted && theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a href="#contact" className="btn-primary px-4 py-2 text-sm">
            Iniciar projeto
          </a>
        </nav>

        <button aria-label="Abrir menu" onClick={() => setOpen((value) => !value)} className="rounded-lg border p-2 md:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="section-container mt-2 rounded-[var(--radius-card)] border bg-[var(--surface-1)] p-4 backdrop-blur md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[var(--neutral-200)] transition hover:bg-[var(--surface-glass)] hover:text-[var(--neutral-100)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
