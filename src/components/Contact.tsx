'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motionTokens } from '@/lib/theme'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const contactSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo.'),
  company: z.string().min(2, 'Informe o nome da sua empresa.'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento.'),
  timeline: z.string().min(1, 'Defina o prazo desejado.'),
  goal: z.string().min(20, 'Descreva seu objetivo com mais detalhes (mínimo 20 caracteres).'),
})

type ContactFormData = z.infer<typeof contactSchema>
type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const steps: Array<{ key: keyof ContactFormData; title: string; description: string }> = [
  { key: 'name', title: 'Qual é o seu nome?', description: 'Vamos começar com uma apresentação rápida.' },
  { key: 'company', title: 'Qual é a empresa/projeto?', description: 'Isso ajuda a contextualizar o segmento.' },
  { key: 'budget', title: 'Qual orçamento estimado?', description: 'Escolha a faixa para calibrarmos o escopo ideal.' },
  { key: 'timeline', title: 'Qual prazo para entrega?', description: 'Entender o timing ajuda a priorizar o plano de execução.' },
  { key: 'goal', title: 'Qual objetivo principal?', description: 'Conte o que você quer alcançar com este projeto.' },
]

const testimonials = [
  { quote: 'Entregou nossa nova plataforma em 9 semanas com qualidade impecável.', author: 'Marina Lopes', role: 'CMO · Nexa Health', avatar: 'ML' },
  { quote: 'A combinação de design premium e performance aumentou nossa conversão já no primeiro mês.', author: 'Diego Arantes', role: 'Founder · Orbital Fintech', avatar: 'DA' },
]

const cases = [
  { name: 'SaaS B2B', metric: 'Taxa de conversão', before: '1,9%', after: '4,8%' },
  { name: 'E-commerce nichado', metric: 'Ticket médio', before: 'R$ 187', after: 'R$ 263' },
  { name: 'EdTech', metric: 'Ativação em 7 dias', before: '32%', after: '61%' },
]

const faqItems = [
  {
    question: 'Como funciona o kickoff do projeto?',
    answer:
      'Conduzimos uma sessão estratégica para alinhar objetivos, público, métricas e restrições. A partir daí, você recebe um plano de execução por etapas.',
  },
  {
    question: 'Vocês atendem projetos em estágio inicial?',
    answer:
      'Sim. Trabalhamos desde MVPs até reestruturações de produtos maduros, sempre com foco em retorno de negócio e velocidade de validação.',
  },
  {
    question: 'Quanto tempo leva para começar?',
    answer:
      'Após o alinhamento comercial, normalmente iniciamos em até 5 dias úteis com cronograma, rituais e backlog inicial definidos.',
  },
]

function trackConversion(eventName: string, payload?: Record<string, string | number>) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...payload })

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (command: 'event', eventName: string, params?: Record<string, string | number>) => void
  }
}

export default function Contact() {
  const [step, setStep] = useState(0)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      company: '',
      budget: '',
      timeline: '',
      goal: '',
    },
  })

  const activeStep = steps[step]
  const isLastStep = useMemo(() => step === steps.length - 1, [step])

  async function nextStep() {
    const isValid = await trigger(activeStep.key)
    if (isValid) {
      setStep((current) => Math.min(current + 1, steps.length - 1))
      trackConversion('contact_cta_click', { step: step + 1 })
    }
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0))
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitState('sending')
      trackConversion('contact_form_submit', { budget: data.budget, timeline: data.timeline })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('contact_submit_failed')
      }

      setSubmitState('success')
      reset()
      setStep(0)
    } catch {
      setSubmitState('error')
    }
  })

  return (
    <section id="contact" className="section-shell pb-24">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
        className="section-container space-y-8"
      >
        <div className="glass-panel max-w-4xl p-[var(--space-card)] text-center md:p-12">
          <p className="eyebrow">Contato</p>
          <h2 className="title-headline mt-4">Vamos transformar sua ideia em um produto com performance comercial.</h2>
          <p className="text-muted mx-auto mt-4 max-w-2xl">
            Preencha o briefing rápido abaixo para receber um plano inicial de execução com escopo, prazo e próximos passos.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl text-left">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/60">
              <span>Etapa {step + 1} de {steps.length}</span>
              <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[var(--accent-400)] transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>

            <div className="token-card mt-6 p-6">
              <h3 className="text-xl font-semibold">{activeStep.title}</h3>
              <p className="text-muted mt-2 text-sm">{activeStep.description}</p>

              <div className="mt-4">
                {activeStep.key === 'name' && (
                  <input
                    {...register('name')}
                    placeholder="Ex.: João Silva"
                    className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
                  />
                )}

                {activeStep.key === 'company' && (
                  <input
                    {...register('company')}
                    placeholder="Ex.: Atlas Ventures"
                    className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
                  />
                )}

                {activeStep.key === 'budget' && (
                  <select
                    {...register('budget')}
                    className="w-full rounded-md border border-white/15 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="10k-25k">R$ 10k — R$ 25k</option>
                    <option value="25k-60k">R$ 25k — R$ 60k</option>
                    <option value="60k+">Acima de R$ 60k</option>
                  </select>
                )}

                {activeStep.key === 'timeline' && (
                  <select
                    {...register('timeline')}
                    className="w-full rounded-md border border-white/15 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="2-4-semanas">2 a 4 semanas</option>
                    <option value="1-2-meses">1 a 2 meses</option>
                    <option value="3-meses+">3 meses ou mais</option>
                  </select>
                )}

                {activeStep.key === 'goal' && (
                  <textarea
                    {...register('goal')}
                    rows={4}
                    placeholder="Ex.: aumentar leads qualificados e reduzir custo por aquisição com um novo fluxo de onboarding"
                    className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--accent-400)]"
                  />
                )}

                {errors[activeStep.key] && <p className="mt-2 text-sm text-red-300">{errors[activeStep.key]?.message}</p>}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={previousStep} disabled={step === 0} className="btn-secondary disabled:opacity-40">
                Voltar
              </button>

              {!isLastStep ? (
                <button type="button" onClick={nextStep} className="btn-primary">
                  Próxima etapa
                </button>
              ) : (
                <button type="submit" disabled={submitState === 'sending'} className="btn-primary disabled:opacity-60">
                  {submitState === 'sending' ? 'Enviando...' : 'Enviar briefing'}
                </button>
              )}
            </div>

            {submitState === 'success' && (
              <p className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                Briefing enviado com sucesso. Em até 1 dia útil você receberá o retorno inicial.
              </p>
            )}

            {submitState === 'error' && (
              <p className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                Não foi possível enviar agora. Verifique sua conexão e tente novamente em instantes.
              </p>
            )}
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/esdrafelipe/30min"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('contact_schedule_click', { provider: 'calendly' })}
              className="btn-primary"
            >
              Agendar reunião no Calendly
            </a>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('contact_schedule_click', { provider: 'google_calendar' })}
              className="btn-secondary"
            >
              Abrir Google Calendar
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="token-card p-6 lg:col-span-1">
            <p className="eyebrow">Prova social</p>
            <h3 className="mt-3 text-xl font-semibold">Depoimentos</h3>
            <div className="mt-4 space-y-4">
              {testimonials.map((item) => (
                <article key={item.author} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-500)]/30 text-sm font-semibold">{item.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold">{item.author}</p>
                      <p className="text-muted text-xs">{item.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/85">“{item.quote}”</p>
                </article>
              ))}
            </div>
          </div>

          <div className="token-card p-6 lg:col-span-1">
            <p className="eyebrow">Cases</p>
            <h3 className="mt-3 text-xl font-semibold">KPIs antes e depois</h3>
            <div className="mt-4 space-y-3">
              {cases.map((item) => (
                <article key={item.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-muted mt-1 text-xs uppercase tracking-[0.08em]">{item.metric}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    <span className="rounded bg-white/10 px-2 py-1">Antes: {item.before}</span>
                    <span className="rounded bg-emerald-400/20 px-2 py-1 text-emerald-200">Depois: {item.after}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="token-card p-6 lg:col-span-1">
            <p className="eyebrow">FAQ</p>
            <h3 className="mt-3 text-xl font-semibold">Objeções comuns</h3>
            <Accordion type="single" collapsible className="mt-4 w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
