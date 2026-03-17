'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import Technologies from '@/components/Technologies'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Goals from '@/components/Goals'
import Contact from '@/components/Contact'
import { motionTokens } from '@/lib/theme'

const metrics = [
  { value: '99.9%', label: 'Uptime em entregas cloud-first' },
  { value: '+120k', label: 'Usuários impactados por produtos lançados' },
  { value: '15 dias', label: 'Tempo médio para MVP estratégico' },
]

export default function Home() {
  return (
    <div className="layout-shell">
      <section className="section-shell pb-24 pt-36 md:pt-40">
        <div className="section-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.standard }}
          >
            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border bg-[var(--accent-soft)] px-4 py-2">
              <Sparkles size={14} /> Engenharia com visão de negócio
            </p>
            <h1 className="title-display max-w-4xl">Experiências digitais de padrão global para marcas que querem liderar.</h1>
            <p className="text-muted mt-6 max-w-2xl">
              Desenvolvimento full-cycle, design orientado a conversão e arquitetura escalável para transformar ideias ambiciosas em produtos sólidos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                Ver projetos <ArrowRight size={17} />
              </a>
              <a href="#contact" className="btn-secondary">
                Falar com especialista
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionTokens.duration.slow, delay: 0.15, ease: motionTokens.easing.standard }}
            className="glass-panel p-[var(--space-card)]"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-[var(--success-soft)] p-2 text-[var(--success-500)]">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-muted text-sm">Performance benchmark</p>
                <p className="font-semibold">Escala, velocidade e conversão</p>
              </div>
            </div>
            <div className="space-y-5">
              {metrics.map((metric) => (
                <div key={metric.label} className="token-card p-5">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="text-muted mt-1 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Goals />
      <Technologies />
      <Projects />
      <Blog />
      <Contact />
    </div>
  )
}
