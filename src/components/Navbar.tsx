'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Bot, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Tecnologias', href: '#technologies' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contato', href: '#contact' },
]

const AI_LABEL = 'IA Studio'

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
          <Image src="/esdra-icon.svg" alt="ESDRA" width={112} height={24} priority />
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
          <button
            aria-label="Abrir assistente de IA"
            onClick={() => {
              const aiBtn = document.querySelector<HTMLButtonElement>('[aria-label="Abrir assistente de IA"]')
              if (aiBtn && !aiBtn.classList.contains('fixed')) return
              const floatingBtn = document.querySelector<HTMLButtonElement>('.fixed[aria-label="Abrir assistente de IA"]')
              floatingBtn?.click()
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-500)]/30 bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--accent-400)] transition hover:border-[var(--accent-400)]/60 hover:text-[var(--accent-300)]"
          >
            <Bot size={13} />
            {AI_LABEL}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success-500)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success-500)]" />
            </span>
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
          <button
            onClick={() => {
              setOpen(false)
              setTimeout(() => {
                const floatingBtn = document.querySelector<HTMLButtonElement>('.fixed[aria-label="Abrir assistente de IA"]')
                floatingBtn?.click()
              }, 150)
            }}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--accent-400)] transition hover:bg-[var(--accent-soft)]"
          >
            <Bot size={14} />
            {AI_LABEL}
            <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-[var(--success-500)]" />
          </button>
        </nav>
      )}
    </header>
  )
}
