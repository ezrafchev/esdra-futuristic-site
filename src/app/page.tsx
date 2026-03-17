diff --git a/src/app/page.tsx b/src/app/page.tsx
index 54c79771c618baa8f503794d990b9f8e809b4d3c..309e0673f3b3c03467a83dc85f90407df56c0815 100644
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -1,79 +1,173 @@
 'use client'
 
-import { motion } from 'framer-motion'
-import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
+import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
+import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react'
+import { useRef } from 'react'
 import Technologies from '@/components/Technologies'
 import Projects from '@/components/Projects'
 import Blog from '@/components/Blog'
 import Goals from '@/components/Goals'
 import Contact from '@/components/Contact'
 import { motionTokens } from '@/lib/theme'
 
-const metrics = [
-  { value: '99.9%', label: 'Uptime em entregas cloud-first' },
-  { value: '+120k', label: 'Usuários impactados por produtos lançados' },
-  { value: '15 dias', label: 'Tempo médio para MVP estratégico' },
+const socialProof = [
+  { name: 'Atlas Ventures', metric: '+42% conversão em 90 dias' },
+  { name: 'Nexa Health', metric: '4.9/5 satisfação dos usuários' },
+  { name: 'Orion Labs', metric: '3x mais velocidade de entrega' },
 ]
 
+const trustBadges = ['ISO-ready architecture', 'LGPD by design', 'Deploy contínuo monitorado']
+
+
 export default function Home() {
+  const heroRef = useRef<HTMLElement | null>(null)
+  const shouldReduceMotion = useReducedMotion()
+
+  const pointerX = useMotionValue(50)
+  const pointerY = useMotionValue(50)
+  const springPointerX = useSpring(pointerX, { stiffness: 120, damping: 25, mass: 0.25 })
+  const springPointerY = useSpring(pointerY, { stiffness: 120, damping: 25, mass: 0.25 })
+
+  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
+
+  const cursorDriftX = useTransform(springPointerX, [0, 100], [-16, 16])
+  const cursorDriftY = useTransform(springPointerY, [0, 100], [-12, 12])
+
+  const scrollLift = useTransform(scrollYProgress, [0, 1], [0, -38])
+  const scrollDepth = useTransform(scrollYProgress, [0, 1], [0, 28])
+
+  const messageYMotion = useTransform([scrollLift, cursorDriftY], ([scroll, cursor]: number[]) => scroll + cursor * 0.35)
+  const visualYMotion = useTransform([scrollDepth, cursorDriftY], ([scroll, cursor]: number[]) => scroll + cursor * 0.6)
+  const proofYMotion = useTransform([scrollLift, cursorDriftY], ([scroll, cursor]: number[]) => scroll * 0.45 + cursor * 0.2)
+  const visualXMotion = useTransform(cursorDriftX, (value) => value * 0.8)
+
+  const heroGlow = useMotionTemplate`radial-gradient(700px circle at ${springPointerX}% ${springPointerY}%, color-mix(in oklab, var(--accent-500) 36%, transparent), transparent 62%)`
+
+  const sequence = {
+    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
+    show: {
+      opacity: 1,
+      y: 0,
+      transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.standard },
+    },
+  }
+
   return (
     <div className="layout-shell">
-      <section className="section-shell pb-24 pt-36 md:pt-40">
-        <div className="section-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
-          <motion.div
-            initial={{ opacity: 0, y: 28 }}
-            animate={{ opacity: 1, y: 0 }}
-            transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.standard }}
-          >
-            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border bg-[var(--accent-soft)] px-4 py-2">
-              <Sparkles size={14} /> Engenharia com visão de negócio
-            </p>
-            <h1 className="title-display max-w-4xl">Experiências digitais de padrão global para marcas que querem liderar.</h1>
-            <p className="text-muted mt-6 max-w-2xl">
-              Desenvolvimento full-cycle, design orientado a conversão e arquitetura escalável para transformar ideias ambiciosas em produtos sólidos.
+      <section
+        ref={heroRef}
+        className="section-shell pb-24 pt-36 md:pt-40"
+        onMouseMove={(event) => {
+          if (shouldReduceMotion) return
+          const bounds = event.currentTarget.getBoundingClientRect()
+          pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100)
+          pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100)
+        }}
+      >
+        <motion.div
+          className="section-container relative overflow-hidden rounded-[var(--radius-panel)] border border-[var(--border-soft)] bg-[var(--surface-1)]/70 p-6 backdrop-blur-xl md:p-10"
+          style={shouldReduceMotion ? { background: 'var(--surface-1)' } : { backgroundImage: heroGlow }}
+          initial="hidden"
+          animate="show"
+          variants={{
+            hidden: {},
+            show: { transition: { staggerChildren: motionTokens.stagger.base, delayChildren: 0.05 } },
+          }}
+        >
+          <motion.div className="grid gap-10" variants={sequence} style={{ y: shouldReduceMotion ? 0 : messageYMotion }}>
+            <p className="eyebrow inline-flex w-fit items-center gap-2 rounded-full border bg-[var(--accent-soft)] px-4 py-2">
+              <Sparkles size={14} /> Produto digital premium, do conceito à escala
             </p>
-            <div className="mt-10 flex flex-wrap gap-4">
-              <a href="#projects" className="btn-primary">
-                Ver projetos <ArrowRight size={17} />
-              </a>
-              <a href="#contact" className="btn-secondary">
-                Falar com especialista
-              </a>
+            <div className="max-w-4xl">
+              <h1 className="title-display">Construímos experiências que elevam receita, confiança e velocidade de execução.</h1>
+              <p className="text-muted mt-6 max-w-2xl">
+                Estratégia de produto, design e engenharia full-cycle para transformar metas agressivas em crescimento previsível.
+              </p>
+            </div>
+            <div className="flex flex-wrap gap-4">
+              <motion.a
+                href="#projects"
+                className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
+                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
+                whileTap={shouldReduceMotion ? {} : { scale: 0.98, y: 0 }}
+              >
+                Ver projetos estratégicos <ArrowRight size={17} />
+              </motion.a>
+              <motion.a
+                href="#contact"
+                className="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
+                whileHover={shouldReduceMotion ? {} : { y: -2 }}
+                whileTap={shouldReduceMotion ? {} : { scale: 0.98, y: 0 }}
+              >
+                Agendar diagnóstico
+              </motion.a>
             </div>
           </motion.div>
 
-          <motion.div
-            initial={{ opacity: 0, x: 24 }}
-            animate={{ opacity: 1, x: 0 }}
-            transition={{ duration: motionTokens.duration.slow, delay: 0.15, ease: motionTokens.easing.standard }}
-            className="glass-panel p-[var(--space-card)]"
-          >
-            <div className="mb-8 flex items-center gap-3">
-              <div className="rounded-xl bg-[var(--success-soft)] p-2 text-[var(--success-500)]">
-                <TrendingUp size={20} />
-              </div>
-              <div>
-                <p className="text-muted text-sm">Performance benchmark</p>
-                <p className="font-semibold">Escala, velocidade e conversão</p>
+          <motion.div variants={sequence} style={{ x: shouldReduceMotion ? 0 : visualXMotion, y: shouldReduceMotion ? 0 : visualYMotion }} className="mt-12">
+            <div className="glass-panel relative overflow-hidden p-6 md:p-8">
+              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[var(--accent-soft)] blur-2xl" aria-hidden />
+              <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[var(--success-soft)] blur-2xl" aria-hidden />
+              <div className="relative grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
+                <div className="token-card p-5">
+                  <p className="text-muted text-sm">Command Center</p>
+                  <p className="mt-3 text-xl font-semibold">Painel com visão em tempo real de funnel, receita e SLA operacional.</p>
+                  <div className="mt-6 h-2 rounded-full bg-[var(--surface-glass)]">
+                    <motion.div
+                      className="h-full rounded-full bg-[var(--accent-500)]"
+                      initial={{ width: shouldReduceMotion ? '68%' : '0%' }}
+                      animate={{ width: '68%' }}
+                      transition={{ duration: motionTokens.duration.slow, delay: 0.35, ease: motionTokens.easing.smooth }}
+                    />
+                  </div>
+                </div>
+                <div className="space-y-4">
+                  <div className="token-card p-4">
+                    <p className="text-muted text-xs uppercase tracking-[0.16em]">Deployment confidence</p>
+                    <p className="mt-1 text-lg font-semibold">98.7%</p>
+                  </div>
+                  <div className="token-card p-4">
+                    <p className="text-muted text-xs uppercase tracking-[0.16em]">Release cadence</p>
+                    <p className="mt-1 text-lg font-semibold">Semanal com rollback seguro</p>
+                  </div>
+                </div>
               </div>
             </div>
-            <div className="space-y-5">
-              {metrics.map((metric) => (
-                <div key={metric.label} className="token-card p-5">
-                  <p className="text-2xl font-semibold">{metric.value}</p>
-                  <p className="text-muted mt-1 text-sm">{metric.label}</p>
+          </motion.div>
+
+          <motion.div
+            variants={sequence}
+            style={{ y: shouldReduceMotion ? 0 : proofYMotion }}
+            className="mt-10 flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--surface-glass)] p-4 md:flex-row md:items-center md:justify-between md:p-5"
+          >
+            <div className="flex flex-wrap items-center gap-4 md:gap-6">
+              {socialProof.map((item) => (
+                <div key={item.name} className="min-w-[170px]">
+                  <p className="text-sm font-semibold">{item.name}</p>
+                  <p className="text-muted text-xs">{item.metric}</p>
                 </div>
               ))}
             </div>
+            <div className="flex flex-wrap items-center gap-2">
+              {trustBadges.map((badge) => (
+                <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--neutral-200)]">
+                  <ShieldCheck size={13} className="text-[var(--success-500)]" />
+                  {badge}
+                </span>
+              ))}
+              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--accent-400)]">
+                <Zap size={13} /> Proof-driven delivery
+              </span>
+            </div>
           </motion.div>
-        </div>
+        </motion.div>
       </section>
 
       <Goals />
       <Technologies />
       <Projects />
       <Blog />
       <Contact />
     </div>
   )
 }
