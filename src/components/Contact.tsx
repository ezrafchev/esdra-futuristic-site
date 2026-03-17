'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-slate-900/70 to-fuchsia-500/20 p-8 text-center md:p-12"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">Contato</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
          Vamos tirar seu projeto do papel com padrão premium.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200">
          Entre em contato para planejar arquitetura, design e execução de um produto digital competitivo em qualquer mercado.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="mailto:contato@esdrafelipe.dev" className="rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:opacity-90">
            contato@esdrafelipe.dev
          </a>
          <a href="https://wa.me/5531999999999" className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:border-white/70">
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}
