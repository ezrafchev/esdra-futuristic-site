'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Banknote, CreditCard, QrCode, Rocket, ShoppingCart, Workflow } from 'lucide-react'
import { useState } from 'react'
import { motionTokens } from '@/lib/theme'

type PlanId = 'landing-express' | 'funnel-crm' | 'automation-pro' | 'ecommerce-growth' | 'platform-custom'
type PaymentMethod = 'pix' | 'card' | 'boleto' | 'recurring'

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
const paymentMethodOptions: Array<{ id: PaymentMethod; label: string }> = [
  { id: 'pix', label: 'Pix' },
  { id: 'card', label: 'Cartão' },
  { id: 'boleto', label: 'Boleto' },
  { id: 'recurring', label: 'Recorrência' },
]

const paymentMethodLabels: Record<PaymentMethod, string> = {
  pix: 'Pix',
  card: 'Cartão',
  boleto: 'Boleto',
  recurring: 'Recorrência',
}

export default function ServicesCommerce() {
  const shouldReduceMotion = useReducedMotion()
  const [checkoutStatus, setCheckoutStatus] = useState('')
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
  const featuredService = services[0]

  const handleCheckout = async (planId: PlanId, planName: string) => {
    setLoadingPlan(planId)
    setCheckoutStatus('')

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, paymentMethod }),
      })

      if (response.status === 404) {
        // API not available (static export) — redirect to contact section
        setCheckoutStatus('Pagamento online indisponível neste ambiente. Clique em "Fale pelo WhatsApp" para contratar.')
        setLoadingPlan(null)
        return
      }

      if (!response.ok) {
        throw new Error('checkout_unavailable')
      }

      const payload = (await response.json()) as { checkoutUrl?: string; methodLabel?: string }
      if (!payload.checkoutUrl) {
        throw new Error('checkout_url_missing')
      }

      const methodLabel = payload.methodLabel ?? paymentMethodLabels[paymentMethod]
      setCheckoutStatus(`Checkout "${planName}" (${methodLabel}) aberto em uma nova aba.`)
      window.open(payload.checkoutUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('[checkout]', error)
      setCheckoutStatus('Não foi possível abrir o checkout agora. Tente novamente em instantes.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section id="services" className="section-shell pt-0" aria-labelledby="services-title">
      <div className="section-container">
        <div className="glass-panel p-6 md:p-8">
          <p className="eyebrow">Vendas e pagamentos</p>
          <h2 id="services-title" className="title-headline mt-4 max-w-3xl">
            5 serviços simples para vender mais, do primeiro lead ao pagamento aprovado.
          </h2>
          <div className="mt-6 max-w-sm">
            <label htmlFor="payment-method" className="text-xs uppercase tracking-[0.14em] text-[var(--neutral-300)]">
              Meio de pagamento
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
              className="mt-2 w-full rounded-md border border-white/15 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
            >
              {paymentMethodOptions.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

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
              <a
                href="https://wa.me/5511999999999?text=Olá,%20quero%20contratar%20um%20serviço!"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary mt-2 flex w-full items-center justify-center gap-2 px-4 py-2 text-sm"
              >
                Fale pelo WhatsApp
              </a>
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
