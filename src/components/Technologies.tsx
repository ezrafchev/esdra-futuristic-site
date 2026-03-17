'use client'

import { motion } from 'framer-motion'
import { TechnologiesContent } from '@/content'
import { motionTokens } from '@/lib/theme'

interface TechnologiesProps {
  content: TechnologiesContent
}

export default function Technologies({ content }: TechnologiesProps) {
  return (
    <section id="technologies" className="section-shell">
      <div className="section-container glass-panel p-[var(--space-card)] md:p-12">
        <h2 className="title-headline">{content.title}</h2>
        <p className="text-muted mt-4 max-w-2xl">{content.description}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.stacks.map((stack, index) => (
            <motion.div
              key={stack.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.tight, duration: motionTokens.duration.base }}
              className="token-card p-6"
            >
              <h3 className="text-lg font-semibold">{stack.title}</h3>
              <ul className="text-muted mt-4 space-y-2 text-sm">
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
