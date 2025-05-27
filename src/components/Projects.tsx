"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Pensamento Computacional",
    description: "Resumo sobre pensamento computacional em HTML",
    tech: "HTML",
    link: "https://github.com/ezrafchev/Pensamento-Computacional"
  },
  {
    title: "Golang Training",
    description: "Projeto de treinamento em Go para cálculos e análises",
    tech: "Go",
    link: "https://github.com/ezrafchev/Golang-treinamento"
  },
  {
    title: "Conversor de Dólar",
    description: "Aplicação simples para converter valores em dólar",
    tech: "JavaScript",
    link: "https://github.com/ezrafchev/projeto_conversor_dolar"
  },
  {
    title: "Valor Gasto em Viagem",
    description: "Calculadora de custos de viagem com múltiplas variáveis",
    tech: "JavaScript",
    link: "https://github.com/ezrafchev/Valor-Gasto-Em-Uma-Viagem"
  }
];

const ProjectCard = ({ title, description, tech, link, index }: Project & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 p-6">
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-4 text-gray-300">{description}</p>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {tech}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ver Projeto →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projetos" className="relative min-h-screen w-full bg-black/20 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center text-4xl font-bold text-white"
        >
          Projetos em Destaque
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
