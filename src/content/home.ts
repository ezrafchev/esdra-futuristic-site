import { DeepPartial, HomeContent, Locale } from '@/content/types'

const homeContentPt: HomeContent = {
  hero: {
    eyebrow: 'Produto digital premium, do conceito à escala',
    title: 'Construímos experiências que elevam receita, confiança e velocidade de execução.',
    description: 'Estratégia de produto, design e engenharia full-cycle para transformar metas agressivas em crescimento previsível.',
    primaryCta: 'Ver projetos estratégicos',
    secondaryCta: 'Agendar diagnóstico',
    commandCenterLabel: 'Command Center',
    commandCenterDescription: 'Painel com visão em tempo real de funnel, receita e SLA operacional.',
    deploymentConfidenceLabel: 'Deployment confidence',
    deploymentConfidenceValue: '98.7%',
    releaseCadenceLabel: 'Release cadence',
    releaseCadenceValue: 'Semanal com rollback seguro',
    proofDeliveryLabel: 'Proof-driven delivery',
    trustBadges: ['ISO-ready architecture', 'LGPD by design', 'Deploy contínuo monitorado'],
    socialProof: [
      { name: 'Atlas Ventures', metric: '+42% conversão em 90 dias' },
      { name: 'Nexa Health', metric: '4.9/5 satisfação dos usuários' },
      { name: 'Orion Labs', metric: '3x mais velocidade de entrega' },
    ],
  },
  goals: {
    eyebrow: 'Sobre',
    title: 'Desenvolvimento com visão de negócio, excelência técnica e impacto real no mercado.',
    pillars: [
      {
        title: 'Estratégia orientada a dados',
        description:
          'Definição de roadmap com métricas claras de produto, CAC/LTV e retenção para garantir decisões inteligentes desde a primeira sprint.',
      },
      {
        title: 'Design de experiência premium',
        description:
          'Interfaces elegantes, acessíveis e responsivas que reforçam posicionamento de marca e aceleram a conversão em cada etapa do funil.',
      },
      {
        title: 'Arquitetura preparada para escala',
        description:
          'Estrutura robusta, performática e segura com foco em evolução contínua, monitoramento e estabilidade em produção.',
      },
    ],
  },
  technologies: {
    title: 'Stack de alta performance',
    description:
      'Ecossistema tecnológico selecionado para reduzir risco, aumentar velocidade de entrega e sustentar crescimento em escala global.',
    stacks: [
      {
        title: 'Frontend Experience',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        title: 'Backend & Data',
        items: ['Node.js', 'Python', 'PostgreSQL', 'APIs REST/GraphQL', 'Autenticação segura'],
      },
      {
        title: 'Cloud & Operações',
        items: ['Docker', 'CI/CD', 'Observabilidade', 'AWS', 'Boas práticas DevSecOps'],
      },
    ],
  },
  projects: {
    title: 'Projetos em destaque',
    description:
      'Cases orientados por resultados mensuráveis, com impacto em experiência, eficiência operacional e crescimento de receita.',
    projects: [
      {
        name: 'Fintech Growth Platform',
        result: '+38% na taxa de conversão em onboarding',
        summary: 'Reestruturação completa de front-end e motor de jornadas automatizadas para aquisição e retenção.',
      },
      {
        name: 'SaaS B2B Intelligence Hub',
        result: 'Redução de 52% no tempo de análise operacional',
        summary: 'Plataforma de dashboards em tempo real com arquitetura modular e performance enterprise.',
      },
      {
        name: 'E-commerce Premium Engine',
        result: 'Aumento de 2.3x em receita por sessão',
        summary: 'Experiência omnichannel com checkout otimizado, personalização e monitoramento de funil.',
      },
    ],
  },
  blog: {
    title: 'Insights estratégicos',
    description: 'Conteúdo técnico e executivo para decisões mais inteligentes em produto, design e engenharia.',
    highlights: [
      {
        title: 'Como construir produtos digitais com qualidade global',
        excerpt: 'Framework prático para alinhar discovery, tecnologia e growth em um fluxo contínuo de valor.',
      },
      {
        title: 'UX orientado a resultados: além da estética',
        excerpt: 'Métodos para desenhar interfaces de alto desempenho sem comprometer clareza e acessibilidade.',
      },
      {
        title: 'Arquitetura escalável para startups em crescimento acelerado',
        excerpt: 'Decisões técnicas que evitam retrabalho, melhoram previsibilidade e sustentam expansão.',
      },
    ],
  },
}

const homeContentEn: DeepPartial<HomeContent> = {
  hero: {
    eyebrow: 'Premium digital product, from concept to scale',
    title: 'We build experiences that increase revenue, trust, and execution speed.',
    description: 'Full-cycle product strategy, design, and engineering to turn aggressive goals into predictable growth.',
    primaryCta: 'View strategic projects',
    secondaryCta: 'Schedule a diagnostic',
  },
  projects: {
    title: 'Featured projects',
  },
  blog: {
    title: 'Strategic insights',
  },
}

const localizedHomeContent: Record<Locale, DeepPartial<HomeContent>> = {
  pt: homeContentPt,
  en: homeContentEn,
}

function mergeWithFallback<T>(base: T, override?: DeepPartial<T>): T {
  if (!override) return base
  if (Array.isArray(base) || Array.isArray(override)) {
    return ((override as T | undefined) ?? base) as T
  }

  if (typeof base === 'object' && base !== null) {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) }

    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      if (value === undefined) continue
      const baseValue = result[key]

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof baseValue === 'object' &&
        baseValue !== null &&
        !Array.isArray(baseValue)
      ) {
        result[key] = mergeWithFallback(baseValue, value as DeepPartial<typeof baseValue>)
      } else {
        result[key] = value
      }
    }

    return result as T
  }

  return (override as T | undefined) ?? base
}

export function getHomeContent(locale: Locale = 'pt'): HomeContent {
  return mergeWithFallback(homeContentPt, localizedHomeContent[locale])
}
