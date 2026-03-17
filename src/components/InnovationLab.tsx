'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Bot, Eye, Info, Workflow } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { motionTokens } from '@/lib/theme'

const demos = [
  {
    title: 'AI Assistant de Operações',
    icon: Bot,
    problem: 'Equipe de suporte consumia horas triando tickets repetitivos e priorizando demandas críticas manualmente.',
    solution: 'Assistente com RAG + classificação automática que responde questões de rotina e escala apenas casos complexos.',
    technology: 'Next.js, LangChain, vector store, observabilidade com traces em produção.',
    kpi: 'Tempo médio de resposta caiu 61% em 8 semanas.',
    demoSignal: 0.86,
  },
  {
    title: 'Automação de Backoffice',
    icon: Workflow,
    problem: 'Processos financeiros e de compliance dependiam de planilhas e conciliações manuais.',
    solution: 'Fluxos orquestrados por eventos que validam documentos, executam regras e notificam exceções em tempo real.',
    technology: 'Node workers, filas assíncronas, PostgreSQL e integrações via webhooks.',
    kpi: 'Redução de 48% no retrabalho operacional.',
    demoSignal: 0.74,
  },
  {
    title: 'Observabilidade Preditiva',
    icon: Eye,
    problem: 'Incidentes eram detectados apenas após reclamações de clientes e queda de conversão.',
    solution: 'Pipeline de métricas e logs com alertas por anomalia e diagnóstico guiado por runbooks.',
    technology: 'OpenTelemetry, dashboards de negócio e alertas orientados por SLO.',
    kpi: 'MTTR reduzido de 95 para 27 minutos.',
    demoSignal: 0.91,
  },
]

export default function InnovationLab() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-shell pt-0" aria-labelledby="innovation-lab-title">
      <div className="section-container">
        <div className="glass-panel p-6 md:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Innovation Lab</p>
              <h2 id="innovation-lab-title" className="title-headline mt-4 max-w-3xl">
                Demos funcionais para testar hipóteses de produto com risco controlado.
              </h2>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full border border-[var(--border-soft)] p-2 text-[var(--accent-400)]" aria-label="Sobre o laboratório de inovação">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="max-w-xs">
                Cada demo existe para reduzir incerteza antes de escalar investimento em produto.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {demos.map((demo, index) => {
              const Icon = demo.icon
              return (
                <motion.article
                  key={demo.title}
                  className="token-card p-5"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: motionTokens.duration.base, delay: index * 0.08, ease: motionTokens.easing.standard }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--accent-400)]">
                      <Icon size={17} />
                    </span>
                    <h3 className="font-semibold">{demo.title}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <p><strong>Problema:</strong> {demo.problem}</p>
                    <p><strong>Solução:</strong> {demo.solution}</p>
                    <p><strong>Tecnologia:</strong> {demo.technology}</p>
                    <p className="text-[var(--success-500)]"><strong>KPI:</strong> {demo.kpi}</p>
                  </div>
                  <div className="mt-5 rounded-full bg-[var(--surface-glass)] p-1">
                    <motion.div
                      className="h-1.5 rounded-full bg-[var(--accent-500)]"
                      initial={{ width: shouldReduceMotion ? `${demo.demoSignal * 100}%` : 0 }}
                      whileInView={{ width: `${demo.demoSignal * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: motionTokens.duration.slow, delay: 0.2 + index * 0.12 }}
                    />
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
