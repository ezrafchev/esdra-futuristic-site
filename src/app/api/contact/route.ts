import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  goal: z.string().min(20),
})

export async function POST(request: NextRequest) {
  try {
    const parsed = contactSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados de contato inválidos.' }, { status: 400 })
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.CONTACT_WEBHOOK_AUTH_TOKEN
            ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_AUTH_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({
          source: 'esdra-futuristic-site',
          submittedAt: new Date().toISOString(),
          ...parsed.data,
        }),
      })

      if (!webhookResponse.ok) {
        throw new Error(`webhook_error_${webhookResponse.status}`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[/api/contact]', error)
    return NextResponse.json({ error: 'Erro ao enviar contato no momento.' }, { status: 500 })
  }
}
