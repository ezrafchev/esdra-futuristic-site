'use client'

import { motion } from 'framer-motion'

const goals = [
  { title: 'Impactar 1000 vidas', progress: 75 },
  { title: 'Aprender novas tecnologias', progress: 60 },
  { title: 'Publicar artigos no blog', progress: 40 },
  { title: 'Expandir rede de contatos', progress: 50 },
]

export default function Goals() {
  return (
    <section id="goals" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-gradient text-center">Metas e Progresso</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {goals.map((goal, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
