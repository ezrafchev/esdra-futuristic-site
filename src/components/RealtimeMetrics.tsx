'use client'

import { useEffect, useState } from 'react'
import { motion, animate, useReducedMotion } from 'framer-motion'
import { Activity, Gauge, Info, Timer } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { motionTokens } from '@/lib/theme'

const metrics = [
  {
    name: 'Assistência IA Resolvida',
    icon: Activity,
    target: 87,
    suffix: '%',
    problem: 'Sem métrica de efetividade, automações de IA viravam caixa-preta para o negócio.',
    solution: 'Painel consolidado por jornada com score de resolução e fallback monitorado.',
    technology: 'Event tracking, Recharts e stream de eventos em tempo real.',
    kpi: '+22 p.p. na taxa de resolução sem intervenção humana.',
    trend: [32, 44, 49, 58, 67, 72, 81, 87],
  },
  {
    name: 'Lead Time de Fluxos',
    icon: Timer,
    target: 19,
    suffix: ' min',
    problem: 'Automação de processos demorava para concluir e criava gargalos invisíveis.',
    solution: 'Medição de lead time por etapa com alertas contextuais para atrasos críticos.',
    technology: 'Workers assíncronos, filas e telemetria por estágio.',
    kpi: '-46% no tempo total de execução operacional.',
    trend: [42, 41, 39, 34, 31, 26, 22, 19],
  },
  {
    name: 'Saúde de Arquitetura',
    icon: Gauge,
    target: 99.3,
    suffix: '%',
    problem: 'Equipes só percebiam degradação de serviços após incidentes no cliente final.',
    solution: 'Métricas de SLO + sinais de infraestrutura em um cockpit único para priorização rápida.',
    technology: 'OpenTelemetry, tracing distribuído e monitoramento por SLO.',
    kpi: 'Disponibilidade sustentada acima de 99%.',
    trend: [96.4, 96.8, 97.2, 97.9, 98.4, 98.8, 99, 99.3],
  },
]

function MetricValue({ target, suffix }: { target: number; suffix: string }) {
  const shouldReduceMotion = useReducedMotion()
  const [value, setValue] = useState(shouldReduceMotion ? target : 0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(target)
      return
    }

    const controls = animate(0, target, {
      duration: 1.1,
      ease: motionTokens.easing.standard,
      onUpdate: (latest) => setValue(target % 1 === 0 ? Math.round(latest) : Number(latest.toFixed(1))),
    })
    return () => controls.stop()
  }, [shouldReduceMotion, target])

  return (
    <motion.span>
      {value}{suffix}
    </motion.span>
  )
}

export default function RealtimeMetrics() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-shell pt-0" aria-labelledby="metrics-title">
      <div className="section-container">
        <div className="glass-panel p-6 md:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Realtime Metrics</p>
              <h2 id="metrics-title" className="title-headline mt-4 max-w-3xl">
                Indicadores vivos para decidir rápido e evitar perda de performance.
              </h2>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full border border-[var(--border-soft)] p-2 text-[var(--accent-400)]" aria-label="Sobre as métricas em tempo real">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="max-w-xs">
                Os contadores animam para destacar evolução dos KPIs monitorados ao vivo.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.article
                  key={metric.name}
                  className="token-card p-5"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: motionTokens.duration.base, delay: index * 0.08 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--accent-400)]">
                        <Icon size={16} />
                      </span>
                      <h3 className="text-sm font-semibold">{metric.name}</h3>
                    </div>
                    <p className="text-lg font-semibold text-[var(--success-500)]">
                      <MetricValue target={metric.target} suffix={metric.suffix} />
                    </p>
                  </div>

                  <div className="mt-4 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={metric.trend.map((value, point) => ({ point, value }))}>
                        <defs>
                          <linearGradient id={`gradient-${metric.name}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent-500)" stopOpacity={0.55} />
                            <stop offset="95%" stopColor="var(--accent-500)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <RechartsTooltip
                          cursor={{ stroke: 'var(--border-soft)', strokeWidth: 1 }}
                          contentStyle={{ background: 'var(--surface-1)', border: '1px solid var(--border-soft)', borderRadius: 12 }}
                          formatter={(value: number) => [`${value}${metric.suffix}`, metric.name]}
                          labelFormatter={() => 'Amostra temporal'}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="var(--accent-400)"
                          fill={`url(#gradient-${metric.name})`}
                          strokeWidth={2}
                          isAnimationActive={!shouldReduceMotion}
                          animationDuration={900}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3 space-y-2 text-sm">
                    <p><strong>Problema:</strong> {metric.problem}</p>
                    <p><strong>Solução:</strong> {metric.solution}</p>
                    <p><strong>Tecnologia:</strong> {metric.technology}</p>
                    <p className="text-[var(--success-500)]"><strong>KPI:</strong> {metric.kpi}</p>
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
