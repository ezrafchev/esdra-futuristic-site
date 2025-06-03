'use client'

import { motion } from 'framer-motion'

const blogPosts = [
  {
    title: 'A Jornada do Conhecimento',
    date: '15 Mar 2024',
    excerpt: 'Reflexões sobre a busca constante por sabedoria através da tecnologia e da Torá.',
    link: '#'
  },
  {
    title: 'Inovação e Valores Tradicionais',
    date: '10 Mar 2024',
    excerpt: 'Como equilibrar o avanço tecnológico com os valores fundamentais da vida.',
    link: '#'
  },
  {
    title: 'O Caminho para o Sucesso',
    date: '5 Mar 2024',
    excerpt: 'Estratégias e insights sobre empreendedorismo e crescimento pessoal.',
    link: '#'
  }
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-gradient text-center">Blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="glass-effect p-6 rounded-xl hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <time className="text-sm text-gray-400">{post.date}</time>
                <h3 className="text-xl font-semibold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                >
                  Ler mais
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
