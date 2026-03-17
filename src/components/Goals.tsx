'use client'

import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/theme'

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
    <section id="about" className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="eyebrow mb-3">Sobre</p>
          <h2 className="title-headline max-w-3xl">Desenvolvimento com visão de negócio, excelência técnica e impacto real no mercado.</h2>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.base, duration: motionTokens.duration.base }}
              className="token-card p-6"
            >
              <h3 className="text-lg font-semibold">{pillar.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
