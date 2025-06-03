'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Enterprise-level analytics platform leveraging machine learning for predictive insights.',
    tech: ['React', 'Python', 'TensorFlow', 'AWS'],
    category: 'Enterprise',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'E-commerce Marketplace',
    description: 'Scalable marketplace platform with real-time inventory and payment processing.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web App',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Smart Home IoT Dashboard',
    description: 'Real-time monitoring and control system for connected home devices.',
    tech: ['React', 'GraphQL', 'MQTT', 'Docker'],
    category: 'IoT',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Fintech Trading Platform',
    description: 'High-performance trading platform with real-time market data analysis.',
    tech: ['TypeScript', 'WebSocket', 'Redis', 'Kubernetes'],
    category: 'Finance',
    image: 'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

const categories = ['All', ...new Set(projects.map(project => project.category))]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative solutions across various domains and technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === category
                  ? 'bg-white text-black'
                  : 'glass-effect text-gray-300 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode='sync'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative group"
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  <motion.div
                    className="absolute inset-0 p-6 flex flex-col justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredProject === index ? 1 : 0.8,
                      y: hoveredProject === index ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm text-gray-300 mb-2">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="glass-effect px-3 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            className="glass-effect px-8 py-3 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
