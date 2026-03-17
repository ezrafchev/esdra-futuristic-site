'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Banknote, CreditCard, QrCode, Rocket, ShoppingCart, Workflow } from 'lucide-react'
import { useState } from 'react'
import { motionTokens } from '@/lib/theme'

type PlanId = 'landing-express' | 'funnel-crm' | 'automation-pro' | 'ecommerce-growth' | 'platform-custom'

const services: Array<{ id: PlanId; title: string; price: string; description: string; icon: typeof Rocket }> = [
  {
    id: 'landing-express',
    title: 'Landing Page Express',
    price: 'R$ 500',
    description: 'Página focada em conversão com copy, formulário e integração com WhatsApp.',
    icon: Rocket,
  },
  {
    id: 'funnel-crm',
    title: 'Funil de Vendas + CRM',
    price: 'R$ 2.400',
    description: 'Pipeline comercial com etapas, alertas de follow-up e acompanhamento de leads.',
    icon: Workflow,
  },
  {
    id: 'automation-pro',
    title: 'Automação Comercial',
    price: 'R$ 6.900',
    description: 'Automações de proposta, resposta rápida e nutrição de oportunidades quentes.',
    icon: ShoppingCart,
  },
  {
    id: 'ecommerce-growth',
    title: 'E-commerce Growth',
    price: 'R$ 12.500',
    description: 'Loja otimizada para venda com checkout rápido e métricas de conversão.',
    icon: CreditCard,
  },
  {
    id: 'platform-custom',
    title: 'Plataforma Sob Medida',
    price: 'R$ 22.000',
    description: 'Produto completo com vendas, pagamentos e operação conectados no mesmo painel.',
    icon: Banknote,
  },
]

const salesTools = ['Checkout por link', 'Pix com QR Code', 'Cartão em até 12x', 'Boleto e recorrência', 'Dashboard de receita']
const digitalResources = ['Portal do cliente', 'Assinatura digital de proposta', 'Alertas com IA', 'Métricas em tempo real']
const paymentLinks: Record<PlanId, string | undefined> = {
  'landing-express': process.env.NEXT_PUBLIC_PAYMENT_LINK_LANDING_EXPRESS,
  'funnel-crm': process.env.NEXT_PUBLIC_PAYMENT_LINK_FUNNEL_CRM,
  'automation-pro': process.env.NEXT_PUBLIC_PAYMENT_LINK_AUTOMATION_PRO,
  'ecommerce-growth': process.env.NEXT_PUBLIC_PAYMENT_LINK_ECOMMERCE_GROWTH,
  'platform-custom': process.env.NEXT_PUBLIC_PAYMENT_LINK_PLATFORM_CUSTOM,
}

export default function ServicesCommerce() {
  const shouldReduceMotion = useReducedMotion()
  const [checkoutStatus, setCheckoutStatus] = useState('')
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const featuredService = services[0]

  const handleCheckout = (planId: PlanId, planName: string) => {
    setLoadingPlan(planId)
    setCheckoutStatus('')

    const checkoutUrl = paymentLinks[planId]
    if (!checkoutUrl) {
      setCheckoutStatus('Link de checkout ainda não configurado para este plano. Fale com nosso time para ativar.')
      setLoadingPlan(null)
      return
    }

    setCheckoutStatus(`Checkout "${planName}" aberto em uma nova aba.`)
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
    setLoadingPlan(null)
  }

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
                  <button
                    type="button"
                    onClick={() => handleCheckout(service.id, service.title)}
                    disabled={loadingPlan === service.id}
                    className="btn-secondary mt-4 w-full justify-center px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loadingPlan === service.id ? 'Abrindo checkout...' : 'Pagar pelo site'}
                  </button>
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
            <div id="checkout" className="token-card p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--accent-400)]">Pagamento imediato</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[var(--neutral-200)]">
                <QrCode size={15} className="text-[var(--success-500)]" /> Pix, cartão e boleto com confirmação automática.
              </p>
              <button
                type="button"
                onClick={() => handleCheckout(featuredService.id, featuredService.title)}
                disabled={loadingPlan === featuredService.id}
                className="btn-primary mt-4 w-full justify-center px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingPlan === featuredService.id ? 'Abrindo checkout...' : 'Solicitar checkout de contratação'}
              </button>
            </div>
          </div>

          <div className="token-card mt-4 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--accent-400)]">Recursos digitais incluídos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {digitalResources.map((resource) => (
                <span key={resource} className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-glass)] px-3 py-1 text-xs text-[var(--neutral-200)]">
                  {resource}
                </span>
              ))}
            </div>
            {checkoutStatus && <p className="mt-3 text-sm text-[var(--accent-300)]">{checkoutStatus}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
