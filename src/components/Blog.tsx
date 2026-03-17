'use client'

import { motion } from 'framer-motion'

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
    <section id="blog" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Insights estratégicos</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Conteúdo técnico e executivo para decisões mais inteligentes em produto, design e engenharia.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="rounded-2xl border border-white/10 bg-slate-900/55 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{insight.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
