"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contato" className="relative min-h-screen w-full bg-black/20 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center text-4xl font-bold text-white"
        >
          Entre em Contato
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-xl bg-black/40 p-8 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="group">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-blue-400">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="group">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-blue-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="group">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300 transition-colors group-focus-within:text-blue-400">
                Mensagem
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="h-32 w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Sua mensagem"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white transition-all hover:from-blue-600 hover:to-purple-600"
            >
              <span className="relative z-10">Enviar Mensagem</span>
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />
            </motion.button>
          </form>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
