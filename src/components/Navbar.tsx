'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
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
    <header className="fixed inset-x-0 top-0 z-50 px-[var(--space-container)] py-4" role="banner">
      <div className={`section-container flex items-center justify-between rounded-[var(--radius-card)] border px-5 py-3 transition ${scrolled ? 'glass-panel' : 'border bg-[var(--surface-2)]'}`}>
        <Link href="/" className="text-sm font-semibold tracking-[0.24em]">
          ESDRA STUDIO
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[var(--neutral-200)] transition hover:text-[var(--neutral-100)]">
              {link.label}
            </a>
          ))}
          <button
            aria-label="Alternar tema"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full border p-2"
            type="button"
          >
            {mounted && theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <a href="#contact" className="btn-primary px-4 py-2 text-sm" aria-label="Ir para seção de contato para iniciar projeto">
            Iniciar projeto
          </a>
        </nav>

        <button
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border p-2 md:hidden"
          type="button"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="section-container mt-2 rounded-[var(--radius-card)] border bg-[var(--surface-1)] p-4 backdrop-blur md:hidden" aria-label="Navegação móvel">
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
