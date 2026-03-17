'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRightLeft, Database, Info, Layers, ShieldCheck } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { motionTokens } from '@/lib/theme'

const architecture = [
  {
    id: 'experience',
    label: 'Experience Layer',
    icon: Layers,
    problem: 'Interfaces isoladas não refletiam o contexto operacional em tempo real para o usuário.',
    solution: 'BFF e componentes orientados a eventos para sincronizar estados críticos em múltiplos canais.',
    technology: 'Next.js App Router, Edge middleware e cache de borda.',
    kpi: '+28% em conversão por consistência entre jornadas web e mobile.',
  },
  {
    id: 'orchestration',
    label: 'Orchestration Core',
    icon: ArrowRightLeft,
    problem: 'Regras de negócio duplicadas entre sistemas causavam inconsistência e retrabalho.',
    solution: 'Motor central de regras com fluxos versionados e rollback seguro por domínio.',
    technology: 'Workers event-driven, filas e contratos com versionamento semântico.',
    kpi: '-37% em incidentes causados por regra divergente.',
  },
  {
    id: 'data',
    label: 'Data + Reliability',
    icon: Database,
    problem: 'Dados críticos sem rastreabilidade dificultavam auditoria e resposta a incidentes.',
    solution: 'Camada de dados com trilha de auditoria e políticas de observabilidade ativa por serviço.',
    technology: 'PostgreSQL, OpenTelemetry, dashboards SLO e alertas inteligentes.',
    kpi: 'Tempo de diagnóstico caiu 63% com observabilidade ponta a ponta.',
  },
]

export default function ArchitectureShowcase() {
  const shouldReduceMotion = useReducedMotion()
  const [activeLayer, setActiveLayer] = useState(architecture[1].id)
  const active = architecture.find((item) => item.id === activeLayer) ?? architecture[1]

  return (
    <section className="section-shell pt-0" aria-labelledby="architecture-title">
      <div className="section-container">
        <div className="glass-panel p-6 md:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Architecture Showcase</p>
              <h2 id="architecture-title" className="title-headline mt-4 max-w-3xl">
                Stack interativa para explicar como dados fluem com segurança da captura ao insight.
              </h2>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="rounded-full border border-[var(--border-soft)] p-2 text-[var(--accent-400)]" aria-label="Sobre o fluxo de arquitetura">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="max-w-xs">
                Selecione uma camada para ver o problema tratado, abordagem técnica e impacto de negócio.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="token-card p-5">
              <div className="space-y-3">
                {architecture.map((layer, index) => {
                  const Icon = layer.icon
                  const activeItem = layer.id === activeLayer
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      className="relative w-full rounded-2xl border border-[var(--border-soft)] px-4 py-3 text-left"
                      onMouseEnter={() => setActiveLayer(layer.id)}
                      onFocus={() => setActiveLayer(layer.id)}
                      onClick={() => setActiveLayer(layer.id)}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="flex items-center gap-3 font-medium">
                          <span className="rounded-full bg-[var(--surface-glass)] p-2 text-[var(--accent-400)]"><Icon size={15} /></span>
                          {layer.label}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span tabIndex={0} className="text-xs text-[var(--neutral-300)]">Fluxo</span>
                          </TooltipTrigger>
                          <TooltipContent side="left">Camada {index + 1} no pipeline de dados.</TooltipContent>
                        </Tooltip>
                      </div>
                      {activeItem && (
                        <motion.span
                          layoutId="active-layer"
                          className="absolute inset-0 rounded-2xl border border-[var(--accent-400)] bg-[var(--accent-soft)]"
                          transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-[var(--neutral-300)]">
                <ShieldCheck size={14} className="text-[var(--success-500)]" />
                O destaque animado indica o trecho ativo do fluxo para guiar leitura arquitetural.
              </div>
            </div>

            <div className="token-card p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -14 }}
                  transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
                  className="space-y-3 text-sm"
                >
                  <h3 className="text-base font-semibold text-[var(--accent-400)]">{active.label}</h3>
                  <p><strong>Problema:</strong> {active.problem}</p>
                  <p><strong>Solução:</strong> {active.solution}</p>
                  <p><strong>Tecnologia:</strong> {active.technology}</p>
                  <p className="text-[var(--success-500)]"><strong>KPI:</strong> {active.kpi}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
