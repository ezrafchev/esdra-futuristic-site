'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, RotateCcw, Copy, Check, Sparkles, ChevronDown } from 'lucide-react'
import { motionTokens } from '@/lib/theme'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTIONS = [
  'Quais tecnologias vocês usam?',
  'Como funciona o processo de desenvolvimento?',
  'Qual é o prazo médio de um projeto?',
  'O que é estratégia de produto?',
]

function generateId() {
  return Math.random().toString(36).slice(2)
}

function MessageBubble({ message, onCopy }: { message: Message; onCopy: (text: string) => void }) {
  const [copied, setCopied] = useState(false)
  const isAssistant = message.role === 'assistant'

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    onCopy(message.content)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.standard }}
      className={`flex gap-2 ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}
    >
      {isAssistant && (
        <div className="ai-avatar flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-500)]/20 border border-[var(--accent-500)]/30 text-[var(--accent-400)]">
          <Sparkles size={12} />
        </div>
      )}

      <div className={`group relative max-w-[82%] ${isAssistant ? '' : 'ml-auto'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            isAssistant
              ? 'bg-[var(--surface-glass)] border border-[var(--border-soft)] text-[var(--neutral-100)]'
              : 'bg-[var(--accent-500)] text-white'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        {isAssistant && (
          <button
            onClick={handleCopy}
            className="absolute -right-8 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-1 text-[var(--neutral-300)] hover:text-[var(--neutral-100)]"
            aria-label="Copiar mensagem"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-2"
    >
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-500)]/20 border border-[var(--accent-500)]/30 text-[var(--accent-400)]">
        <Sparkles size={12} />
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-[var(--surface-glass)] border border-[var(--border-soft)] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent-400)]"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true)
      setMessages([
        {
          id: generateId(),
          role: 'assistant',
          content:
            'Olá! Sou o assistente da Esdra Studio. Posso ajudar com dúvidas sobre tecnologia, arquitetura de sistemas, desenvolvimento de produto e muito mais. Como posso te ajudar hoje?',
          timestamp: new Date(),
        },
      ])
    }
  }, [open, hasGreeted])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const history = [...messages, userMessage].map(({ role, content }) => ({ role, content }))

      const SYSTEM_CONTENT =
        'Você é o assistente de IA da Esdra Studio — um estúdio de produtos digitais premium especializado em estratégia de produto, design de sistemas, engenharia full-stack e integração de IA. Responda em português brasileiro, de forma direta e profissional. Máximo 3 parágrafos por resposta.'

      // Try local API route first (works in server/dev mode), then fall back to direct call
      let content: string | undefined

      try {
        const localRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: AbortSignal.timeout(15000),
        })
        if (localRes.ok) {
          const localData = await localRes.json()
          content = localData.message
        }
      } catch {
        // Local API unavailable (e.g. static export) — fall through to direct call
      }

      if (!content) {
        // Direct call to Pollinations.ai (free, no API key, CORS-enabled)
        const extRes = await fetch('https://text.pollinations.ai/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'openai',
            messages: [{ role: 'system', content: SYSTEM_CONTENT }, ...history],
            max_tokens: 600,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(20000),
        })
        const extData = await extRes.json()
        content = extData?.choices?.[0]?.message?.content
      }

      if (!content) throw new Error('Empty response')

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: 'Desculpe, não consegui processar sua mensagem agora. Verifique sua conexão e tente novamente.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function handleReset() {
    setMessages([])
    setHasGreeted(false)
    setInput('')
  }

  const showSuggestions = messages.length <= 1 && !isLoading

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        aria-label="Abrir assistente de IA"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-[var(--accent-500)]/40 bg-[var(--surface-0)]/90 px-5 py-3 text-sm font-medium text-[var(--accent-400)] shadow-[0_0_24px_rgba(124,148,255,0.25)] backdrop-blur-xl transition-all hover:border-[var(--accent-400)]/70 hover:shadow-[0_0_32px_rgba(124,148,255,0.4)] ${open ? 'pointer-events-none opacity-0 scale-90' : 'opacity-100 scale-100'}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.standard }}
      >
        <Bot size={16} />
        <span>IA Studio</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success-500)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success-500)]" />
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.fast }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
              className="ai-panel fixed bottom-6 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-0)]/95 shadow-[0_32px_80px_rgba(2,6,23,0.7),0_0_0_1px_rgba(124,148,255,0.08)] backdrop-blur-2xl sm:w-96"
              style={{ height: 'min(580px, calc(100dvh - 6rem))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-500)]/15 border border-[var(--accent-500)]/25">
                    <Sparkles size={14} className="text-[var(--accent-400)]" />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface-0)] bg-[var(--success-500)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight">Esdra AI</p>
                    <p className="text-[10px] text-[var(--neutral-300)]">Powered by AI · Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    className="rounded-lg p-1.5 text-[var(--neutral-300)] transition hover:bg-[var(--surface-glass)] hover:text-[var(--neutral-100)]"
                    aria-label="Reiniciar conversa"
                    title="Reiniciar conversa"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-1.5 text-[var(--neutral-300)] transition hover:bg-[var(--surface-glass)] hover:text-[var(--neutral-100)]"
                    aria-label="Fechar assistente"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} onCopy={() => {}} />
                  ))}
                  {isLoading && <TypingIndicator />}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-4 pb-2"
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[var(--neutral-300)]">Sugestões</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-glass)] px-3 py-1.5 text-xs text-[var(--neutral-200)] transition hover:border-[var(--accent-400)]/40 hover:text-[var(--neutral-100)]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input area */}
              <div className="border-t border-[var(--border-soft)] p-3">
                <div className="flex items-end gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-glass)] px-3.5 py-2.5 focus-within:border-[var(--accent-400)]/50 transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pergunte algo…"
                    rows={1}
                    disabled={isLoading}
                    className="flex-1 resize-none bg-transparent text-sm text-[var(--neutral-100)] placeholder:text-[var(--neutral-300)] outline-none disabled:opacity-50"
                    style={{ maxHeight: '120px', minHeight: '20px' }}
                    aria-label="Mensagem para o assistente de IA"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-500)] text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent-400)]"
                    aria-label="Enviar mensagem"
                  >
                    <Send size={13} />
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[9px] text-[var(--neutral-300)]">
                  IA pode cometer erros · Esdra Studio © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Close button visible when open, outside the panel area */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="close-btn"
            aria-label="Minimizar assistente"
            onClick={() => setOpen(false)}
            className="fixed bottom-6 right-6 z-[51] hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-[var(--border-soft)] bg-[var(--surface-0)]/90 text-[var(--neutral-300)] backdrop-blur shadow-lg hover:text-[var(--neutral-100)] transition"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
