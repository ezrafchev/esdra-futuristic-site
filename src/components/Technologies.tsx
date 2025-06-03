'use client'

import { motion } from 'framer-motion'

const technologies = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: 'fab fa-react', level: 90 },
      { name: 'Next.js', icon: 'fas fa-next', level: 85 },
      { name: 'TypeScript', icon: 'fas fa-code', level: 88 },
      { name: 'Tailwind CSS', icon: 'fas fa-paint-brush', level: 92 },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'fab fa-node-js', level: 88 },
      { name: 'Python', icon: 'fab fa-python', level: 85 },
      { name: 'PostgreSQL', icon: 'fas fa-database', level: 82 },
      { name: 'GraphQL', icon: 'fas fa-project-diagram', level: 80 },
    ]
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: 'fab fa-docker', level: 85 },
      { name: 'Git', icon: 'fab fa-git-alt', level: 90 },
      { name: 'AWS', icon: 'fab fa-aws', level: 82 },
      { name: 'Linux', icon: 'fab fa-linux', level: 88 },
    ]
  }
]

export default function Technologies() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="technologies" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Tecnologias</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Utilizando tecnologias de ponta para construir soluções modernas, escaláveis e eficientes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-6 rounded-2xl hover-scale"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gradient">{tech.category}</h3>
              <div className="space-y-6">
                {tech.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <i className={`${skill.icon} text-xl text-gray-300 mr-3`}></i>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-effect p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gradient">Conhecimentos Adicionais</h3>
          <div className="flex flex-wrap gap-4">
            {[
              'Design de UI/UX',
              'Design Responsivo',
              'APIs RESTful',
              'Microsserviços',
              'CI/CD',
              'Agile/Scrum',
              'Desenvolvimento Orientado a Testes',
              'Otimização de Performance'
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="glass-effect px-4 py-2 rounded-full text-sm text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
