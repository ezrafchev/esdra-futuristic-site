'use client'

import { motion } from 'framer-motion'
import { ProjectsContent } from '@/content'
import { motionTokens } from '@/lib/theme'

interface ProjectsProps {
  content: ProjectsContent
}

export default function Projects({ content }: ProjectsProps) {
  return (
    <section id="projects" className="section-shell">
      <div className="section-container">
        <h2 className="title-headline">{content.title}</h2>
        <p className="text-muted mt-4 max-w-2xl">{content.description}</p>

        <div className="mt-10 space-y-5">
          {content.projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.tight, duration: motionTokens.duration.base }}
              className="token-card p-6 md:p-8"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-muted mt-2">{project.summary}</p>
                </div>
                <p className="rounded-full border px-4 py-2 text-sm text-[var(--success-500)]" style={{ background: 'var(--success-soft)' }}>
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
