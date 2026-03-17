'use client'

import { motion } from 'framer-motion'
import { GoalsContent } from '@/content'
import { motionTokens } from '@/lib/theme'

interface GoalsProps {
  content: GoalsContent
}

export default function Goals({ content }: GoalsProps) {
  return (
    <section id="about" className="section-shell">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="eyebrow mb-3">{content.eyebrow}</p>
          <h2 className="title-headline max-w-3xl">{content.title}</h2>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {content.pillars.map((pillar, index) => (
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
