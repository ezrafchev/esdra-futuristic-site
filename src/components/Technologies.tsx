'use client'

import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/theme'

const stacks = [
  {
    title: 'Frontend Experience',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend & Data',
    items: ['Node.js', 'Python', 'PostgreSQL', 'APIs REST/GraphQL', 'Autenticação segura'],
  },
  {
    title: 'Cloud & Operações',
    items: ['Docker', 'CI/CD', 'Observabilidade', 'AWS', 'Boas práticas DevSecOps'],
  },
]

export default function Technologies() {
  return (
    <section id="technologies" className="section-shell">
      <div className="section-container glass-panel p-[var(--space-card)] md:p-12">
        <h2 className="title-headline">Stack de alta performance</h2>
        <p className="text-muted mt-4 max-w-2xl">
          Ecossistema tecnológico selecionado para reduzir risco, aumentar velocidade de entrega e sustentar crescimento em escala global.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stacks.map((stack, index) => (
            <motion.div
              key={stack.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.tight, duration: motionTokens.duration.base }}
              className="token-card p-6"
            >
              <h3 className="text-lg font-semibold">{stack.title}</h3>
              <ul className="text-muted mt-4 space-y-2 text-sm">
                {stack.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
