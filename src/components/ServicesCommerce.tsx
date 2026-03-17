'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Banknote, CreditCard, QrCode, Rocket, ShoppingCart, Workflow } from 'lucide-react'
import { motionTokens } from '@/lib/theme'

const services = [
  {
    title: 'Landing Page Express',
    price: 'R$ 500',
    description: 'Página focada em conversão com copy, formulário e integração com WhatsApp.',
    icon: Rocket,
  },
  {
    title: 'Funil de Vendas + CRM',
    price: 'R$ 2.400',
    description: 'Pipeline comercial com etapas, alertas de follow-up e acompanhamento de leads.',
    icon: Workflow,
  },
  {
    title: 'Automação Comercial',
    price: 'R$ 6.900',
    description: 'Automações de proposta, resposta rápida e nutrição de oportunidades quentes.',
    icon: ShoppingCart,
  },
  {
    title: 'E-commerce Growth',
    price: 'R$ 12.500',
    description: 'Loja otimizada para venda com checkout rápido e métricas de conversão.',
    icon: CreditCard,
  },
  {
    title: 'Plataforma Sob Medida',
    price: 'R$ 22.000',
    description: 'Produto completo com vendas, pagamentos e operação conectados no mesmo painel.',
    icon: Banknote,
  },
]

const salesTools = ['Checkout por link', 'Pix com QR Code', 'Cartão em até 12x', 'Boleto e recorrência', 'Dashboard de receita']

export default function ServicesCommerce() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="services" className="section-shell pt-0" aria-labelledby="services-title">
      <div className="section-container">
        <div className="glass-panel p-6 md:p-8">
          <p className="eyebrow">Vendas e pagamentos</p>
          <h2 id="services-title" className="title-headline mt-4 max-w-3xl">
            5 serviços simples para vender mais, do primeiro lead ao pagamento aprovado.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.article
                  key={service.title}
                  className="token-card card-hover p-4"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: motionTokens.duration.base, delay: index * 0.06, ease: motionTokens.easing.standard }}
                >
                  <span className="inline-flex rounded-full bg-[var(--accent-soft)] p-2 text-[var(--accent-400)]">
                    <Icon size={16} />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-[var(--neutral-200)]">{service.description}</p>
                  <p className="mt-4 text-lg font-semibold text-[var(--success-500)]">{service.price}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-glass)] p-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold">Ferramentas comerciais inclusas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {salesTools.map((tool) => (
                  <span key={tool} className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--neutral-200)]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="token-card p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--accent-400)]">Pagamento imediato</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[var(--neutral-200)]">
                <QrCode size={15} className="text-[var(--success-500)]" /> Pix, cartão e boleto com confirmação automática.
              </p>
              <a href="#contact" className="btn-primary mt-4 w-full justify-center px-4 py-2 text-sm">
                Solicitar checkout de contratação
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
