"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Technology {
  name: string;
  description: string;
  icon: string;
}

const technologies: Technology[] = [
  {
    name: "Artificial Intelligence",
    description: "Desenvolvimento de soluções inovadoras com IA",
    icon: "🤖",
  },
  {
    name: "Blockchain",
    description: "Tecnologia descentralizada e segura",
    icon: "⛓️",
  },
  {
    name: "Cloud Computing",
    description: "Infraestrutura escalável e flexível",
    icon: "☁️",
  },
  {
    name: "IoT",
    description: "Internet das Coisas e conectividade",
    icon: "🌐",
  },
  {
    name: "Cybersecurity",
    description: "Proteção de dados e sistemas",
    icon: "🔒",
  },
  {
    name: "Big Data",
    description: "Análise e processamento de dados em larga escala",
    icon: "📊",
  },
];

const TechCard = ({ name, description, icon, index }: Technology & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-black/40 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-transform duration-500 ease-out group-hover:scale-150" />
      <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 transition-transform duration-500 ease-out group-hover:scale-150" />
      <div className="relative z-10">
        <div className="mb-6 inline-block rounded-lg bg-white/10 p-3">
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{name}</h3>
        <p className="text-lg text-gray-300">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

export default function Technologies() {
  return (
    <section id="tecnologias" className="relative min-h-screen w-full bg-black/20 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center text-4xl font-bold text-white"
        >
          Tecnologias do Futuro
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} {...tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
