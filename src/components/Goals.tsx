'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    title: 'Estratégia orientada a dados',
    description:
      'Definição de roadmap com métricas claras de produto, CAC/LTV e retenção para garantir decisões inteligentes desde a primeira sprint.',
  },
  {
    title: 'Design de experiência premium',
    description:
      'Interfaces elegantes, acessíveis e responsivas que reforçam posicionamento de marca e aceleram a conversão em cada etapa do funil.',
  },
  {
    title: 'Arquitetura preparada para escala',
    description:
      'Estrutura robusta, performática e segura com foco em evolução contínua, monitoramento e estabilidade em produção.',
  },
]

export default function Goals() {
  return (
    <section id="about" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">Sobre</p>
          <h2 className="max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            Desenvolvimento com visão de negócio, excelência técnica e impacto real no mercado.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
