'use client'

import { motion } from 'framer-motion'

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
    <section id="technologies" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl md:p-12">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Stack de alta performance</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Ecossistema tecnológico selecionado para reduzir risco, aumentar velocidade de entrega e sustentar crescimento em escala global.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stacks.map((stack, index) => (
            <motion.div
              key={stack.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{stack.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
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
