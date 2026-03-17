'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    name: 'Fintech Growth Platform',
    result: '+38% na taxa de conversão em onboarding',
    summary: 'Reestruturação completa de front-end e motor de jornadas automatizadas para aquisição e retenção.',
  },
  {
    name: 'SaaS B2B Intelligence Hub',
    result: 'Redução de 52% no tempo de análise operacional',
    summary: 'Plataforma de dashboards em tempo real com arquitetura modular e performance enterprise.',
  },
  {
    name: 'E-commerce Premium Engine',
    result: 'Aumento de 2.3x em receita por sessão',
    summary: 'Experiência omnichannel com checkout otimizado, personalização e monitoramento de funil.',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Projetos em destaque</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Cases orientados por resultados mensuráveis, com impacto em experiência, eficiência operacional e crescimento de receita.
        </p>

        <div className="mt-10 space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-2 text-slate-300">{project.summary}</p>
                </div>
                <p className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                  {project.result}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
