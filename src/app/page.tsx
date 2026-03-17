'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import Technologies from '@/components/Technologies'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Goals from '@/components/Goals'
import Contact from '@/components/Contact'

const metrics = [
  { value: '99.9%', label: 'Uptime em entregas cloud-first' },
  { value: '+120k', label: 'Usuários impactados por produtos lançados' },
  { value: '15 dias', label: 'Tempo médio para MVP estratégico' },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pb-24 pt-36 md:px-8 md:pt-40">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-indigo-200">
              <Sparkles size={14} /> Engenharia com visão de negócio
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Experiências digitais de padrão global para marcas que querem liderar.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Desenvolvimento full-cycle, design orientado a conversão e arquitetura escalável para transformar ideias ambiciosas em produtos sólidos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:opacity-90">
                Ver projetos <ArrowRight size={17} />
              </a>
              <a href="#contact" className="rounded-full border border-white/25 px-6 py-3 font-medium text-slate-100 transition hover:border-white/60">
                Falar com especialista
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-300">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-400">Performance benchmark</p>
                <p className="font-semibold text-white">Escala, velocidade e conversão</p>
              </div>
            </div>
            <div className="space-y-5">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
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
