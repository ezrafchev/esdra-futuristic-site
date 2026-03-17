'use client'

import { motion } from 'framer-motion'
import { motionTokens } from '@/lib/theme'

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-24" aria-labelledby="contact-heading">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
        className="section-container glass-panel max-w-4xl p-[var(--space-card)] text-center md:p-12"
      >
        <p className="eyebrow">Contato</p>
        <h2 id="contact-heading" className="title-headline mt-4">Vamos tirar seu projeto do papel com padrão premium.</h2>
        <p className="text-muted mx-auto mt-4 max-w-2xl">
          Entre em contato para planejar arquitetura, design e execução de um produto digital competitivo em qualquer mercado.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4" role="group" aria-label="Canais de contato">
          <a href="mailto:contato@esdrafelipe.dev" className="btn-primary" aria-label="Enviar e-mail para contato arroba esdrafelipe ponto dev">
            contato@esdrafelipe.dev
          </a>
          <a href="https://wa.me/5531999999999" className="btn-secondary" aria-label="Iniciar conversa no WhatsApp">
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}
