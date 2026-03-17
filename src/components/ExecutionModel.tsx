'use client'

import { motion } from 'framer-motion'
import { Compass, Gauge, Rocket, Shield } from 'lucide-react'
import { motionTokens } from '@/lib/theme'

const phases = [
  {
    title: 'Discovery orientada a valor',
    description: 'Mapeamos oportunidades, gargalos e hipóteses para focar no que acelera receita e retenção.',
    icon: Compass,
  },
  {
    title: 'Design de conversão',
    description: 'Criamos fluxos claros, consistentes e acessíveis com foco em ativação e experiência premium.',
    icon: Gauge,
  },
  {
    title: 'Entrega contínua com qualidade',
    description: 'Sprints com benchmark de engenharia global, automação de testes e releases previsíveis.',
    icon: Rocket,
  },
  {
    title: 'Escala, governança e segurança',
    description: 'Monitoramento ativo, observabilidade e práticas de segurança para crescer com confiança.',
    icon: Shield,
  },
]

export default function ExecutionModel() {
  return (
    <section className="section-shell pt-0" aria-labelledby="execution-model-title">
      <div className="section-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Framework de execução</p>
            <h2 id="execution-model-title" className="title-headline mt-3 max-w-3xl">
              Metodologia própria para transformar visão em crescimento consistente.
            </h2>
          </div>
          <a href="#contact" className="btn-secondary text-sm">
            Receber plano inicial
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {phases.map((phase, index) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * motionTokens.stagger.tight, duration: motionTokens.duration.base }}
              className="token-card card-hover p-5"
            >
              <div className="inline-flex rounded-xl border border-[var(--border-soft)] bg-[var(--surface-glass)] p-3 text-[var(--accent-400)]">
                <phase.icon size={18} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{phase.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{phase.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
