'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="glass-effect p-6 rounded-2xl hover-scale">
                <h3 className="text-xl font-semibold mb-4 text-gradient">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 glass-effect rounded-full flex items-center justify-center">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <a href="mailto:contact@esdra.dev" className="text-white hover:text-gray-300 transition-colors">
                        contact@esdra.dev
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 glass-effect rounded-full flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className="text-white">São Paulo, Brazil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-2xl hover-scale">
                <h3 className="text-xl font-semibold mb-4 text-gradient">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ezrafchev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/esdra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a
                    href="https://twitter.com/esdra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full glass-effect py-3 rounded-lg text-white font-medium relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </motion.button>
              
              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 text-center"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
