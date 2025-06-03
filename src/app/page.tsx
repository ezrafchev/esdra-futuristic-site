'use client'

import Technologies from '@/components/Technologies'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Blog from '@/components/Blog'
import Goals from '@/components/Goals'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { motion } from 'framer-motion'

export default function Home() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Desenvolvedor Full Stack', 'Estudioso de Tecnologia', 'Entusiasta de Inovação'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div 
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
            Esdra Felipe
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
            <span ref={typedRef}></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Criando soluções elegantes para problemas complexos através de código limpo e design intuitivo.
          </p>
          <motion.a
            href="#contact"
            className="glass-effect px-8 py-3 rounded-full text-white font-medium hover-scale inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entre em Contato
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="glass-effect p-8 rounded-2xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-6 text-gradient">Sobre Mim</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  Sou um futuro empresário bilionário, apaixonado por tecnologia, Torá e filosofia. 
                  Minha jornada é focada em criar impacto positivo e transformar vidas através da 
                  inovação e do conhecimento.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Residente em Vespasiano, MG, Brasil, tenho como meta impactar mil vidas até o 
                  final de 2025, combinando tecnologia com valores humanos fundamentais.
                </p>
              </div>
              <div className="space-y-4">
                <div className="glass-effect p-4 rounded-lg hover-scale">
                  <h3 className="text-xl font-semibold mb-2">Visão</h3>
                  <p className="text-gray-400">Transformar vidas através da tecnologia e conhecimento</p>
                </div>
                <div className="glass-effect p-4 rounded-lg hover-scale">
                  <h3 className="text-xl font-semibold mb-2">Missão</h3>
                  <p className="text-gray-400">Impactar mil vidas até 2025 com inovação e sabedoria</p>
                </div>
                <div className="glass-effect p-4 rounded-lg hover-scale">
                  <h3 className="text-xl font-semibold mb-2">Valores</h3>
                  <p className="text-gray-400">Ética, Inovação e Crescimento Contínuo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '5+', label: 'Anos de Experiência' },
              { number: '50+', label: 'Projetos Concluídos' },
              { number: '30+', label: 'Clientes Satisfeitos' },
              { number: '100%', label: 'Taxa de Sucesso' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-effect p-6 rounded-xl text-center hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-3xl font-bold text-gradient mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <Technologies />
      <Projects />
      <Blog />
      <Goals />
      <Contact />
    </div>
  )
}
