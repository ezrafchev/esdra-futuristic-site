'use client'

import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/ezrafchev',
    icon: 'fab fa-github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/esdra-felipe-746425271',
    icon: 'fab fa-linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/EsdraFelipe95',
    icon: 'fab fa-twitter'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/esdraFSO',
    icon: 'fab fa-instagram'
  }
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Contato</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Vamos trabalhar juntos? Entre em contato para discutirmos seu próximo projeto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium"
              >
                Enviar Mensagem
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-300">
                  <i className="fas fa-envelope mr-3 text-blue-400"></i>
                  esdrafelipe1@gmail.com
                </p>
                <p className="flex items-center text-gray-300">
                  <i className="fas fa-map-marker-alt mr-3 text-blue-400"></i>
                  Vespasiano, MG, Brasil
                </p>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-2xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={link.icon}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
