'use client'

import { motion } from 'framer-motion'
import { BlogContent } from '@/content'
import { motionTokens } from '@/lib/theme'

interface BlogProps {
  content: BlogContent
}

export default function Blog({ content }: BlogProps) {
  return (
    <section id="blog" className="section-shell">
      <div className="section-container">
        <h2 className="title-headline">{content.title}</h2>
        <p className="text-muted mt-4 max-w-2xl">{content.description}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {content.highlights.map((insight, index) => (
            <motion.article
              key={insight.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * motionTokens.stagger.base, duration: motionTokens.duration.base }}
              className="token-card p-6"
            >
              <h3 className="text-lg font-semibold">{insight.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{insight.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
