export type Locale = 'pt' | 'en'

export interface HeroStat {
  label: string
  value: string
}

export interface SocialProofItem {
  name: string
  metric: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  commandCenterLabel: string
  commandCenterDescription: string
  deploymentConfidenceLabel: string
  deploymentConfidenceValue: string
  releaseCadenceLabel: string
  releaseCadenceValue: string
  proofDeliveryLabel: string
  trustBadges: string[]
  socialProof: SocialProofItem[]
}

export interface GoalsPillar {
  title: string
  description: string
}

export interface GoalsContent {
  eyebrow: string
  title: string
  pillars: GoalsPillar[]
}

export interface StackBlock {
  title: string
  items: string[]
}

export interface TechnologiesContent {
  title: string
  description: string
  stacks: StackBlock[]
}

export interface ProjectCase {
  name: string
  result: string
  summary: string
}

export interface ProjectsContent {
  title: string
  description: string
  projects: ProjectCase[]
}

export interface InsightHighlight {
  title: string
  excerpt: string
}

export interface BlogContent {
  title: string
  description: string
  highlights: InsightHighlight[]
}

export interface HomeContent {
  hero: HeroContent
  goals: GoalsContent
  technologies: TechnologiesContent
  projects: ProjectsContent
  blog: BlogContent
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}
