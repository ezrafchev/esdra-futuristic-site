import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const SYSTEM_PROMPT = `Você é o assistente de IA da Esdra Studio — um estúdio de produtos digitais premium especializado em estratégia de produto, design de sistemas, engenharia full-stack e integração de IA.

Responda sempre em português brasileiro, de forma direta, técnica e profissional, mas acessível. Seja conciso (máximo 3 parágrafos por resposta) e útil.

Sobre a Esdra Studio:
- Construímos produtos digitais de alto impacto: SaaS, plataformas, apps
- Especialidades: Next.js, React, Node.js, arquitetura de sistemas, IA/ML, design de produto
- Clientes: startups, scale-ups e empresas de médio porte
- Foco em ROI mensurável, velocidade de execução e qualidade de engenharia

Você pode ajudar com:
- Dúvidas sobre tecnologia e desenvolvimento de software
- Consultoria sobre arquitetura de sistemas e escolha de stack
- Orientação sobre estratégia de produto e métricas
- Informações sobre os serviços da Esdra Studio
- Perguntas gerais sobre IA, programação e inovação`

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const payload = {
      model: 'openai',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 600,
      temperature: 0.7,
    }

    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`)
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }

    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Empty response from AI')
    }

    return NextResponse.json({ message: content })
  } catch (error) {
    console.error('[/api/chat]', error)
    return NextResponse.json(
      { error: 'Não foi possível processar sua mensagem agora. Tente novamente em instantes.' },
      { status: 500 },
    )
  }
}
