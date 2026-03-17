'use client'

import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/theme'

const insights = [
  {
    title: 'Como construir produtos digitais com qualidade global',
    excerpt: 'Framework prático para alinhar discovery, tecnologia e growth em um fluxo contínuo de valor.',
  },
  {
    title: 'UX orientado a resultados: além da estética',
    excerpt: 'Métodos para desenhar interfaces de alto desempenho sem comprometer clareza e acessibilidade.',
  },
  {
    title: 'Arquitetura escalável para startups em crescimento acelerado',
    excerpt: 'Decisões técnicas que evitam retrabalho, melhoram previsibilidade e sustentam expansão.',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="section-shell">
      <div className="section-container">
        <h2 className="title-headline">Insights estratégicos</h2>
        <p className="text-muted mt-4 max-w-2xl">
          Conteúdo técnico e executivo para decisões mais inteligentes em produto, design e engenharia.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.base, duration: motionTokens.duration.base }}
              className="token-card p-6"
            >
              <h3 className="text-lg font-semibold">{insight.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{insight.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
