import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const paymentRequestSchema = z.object({
  planId: z.enum(['landing-express', 'funnel-crm', 'automation-pro', 'ecommerce-growth', 'platform-custom']),
  paymentMethod: z.enum(['pix', 'card', 'boleto', 'recurring']),
})

const planEnvKeys = {
  'landing-express': 'LANDING_EXPRESS',
  'funnel-crm': 'FUNNEL_CRM',
  'automation-pro': 'AUTOMATION_PRO',
  'ecommerce-growth': 'ECOMMERCE_GROWTH',
  'platform-custom': 'PLATFORM_CUSTOM',
} as const

const methodEnvKeys = {
  pix: 'PIX',
  card: 'CARD',
  boleto: 'BOLETO',
  recurring: 'RECURRING',
} as const

const methodLabels = {
  pix: 'Pix',
  card: 'Cartão',
  boleto: 'Boleto',
  recurring: 'Recorrência',
} as const

function getEnv(name: string) {
  const value = process.env[name]
  return value?.trim() ? value.trim() : undefined
}

function getCheckoutUrl(planId: keyof typeof planEnvKeys, paymentMethod: keyof typeof methodEnvKeys) {
  const planKey = planEnvKeys[planId]
  const methodKey = methodEnvKeys[paymentMethod]

  const candidates = [
    `PAYMENT_LINK_${planKey}_${methodKey}`,
    `NEXT_PUBLIC_PAYMENT_LINK_${planKey}_${methodKey}`,
    `PAYMENT_LINK_${planKey}`,
    `NEXT_PUBLIC_PAYMENT_LINK_${planKey}`,
  ]

  for (const key of candidates) {
    const candidate = getEnv(key)
    if (!candidate) continue
    try {
      const url = new URL(candidate)
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return candidate
      }
    } catch {
      continue
    }
  }

  return undefined
}

export async function POST(request: NextRequest) {
  try {
    const parsed = paymentRequestSchema.safeParse(await request.json())

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados de checkout inválidos.' }, { status: 400 })
    }

    const { planId, paymentMethod } = parsed.data
    const checkoutUrl = getCheckoutUrl(planId, paymentMethod)

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: 'Checkout indisponível para este plano e meio de pagamento.' },
        { status: 503 },
      )
    }

    return NextResponse.json({
      checkoutUrl,
      methodLabel: methodLabels[paymentMethod],
    })
  } catch (error) {
    console.error('[/api/payment]', error)
    return NextResponse.json({ error: 'Não foi possível abrir o checkout agora.' }, { status: 500 })
  }
}
