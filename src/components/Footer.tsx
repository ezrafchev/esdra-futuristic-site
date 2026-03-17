export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Esdra Studio. Engenharia e design para negócios digitais.</p>
        <div className="flex items-center gap-4">
          <a href="#about" className="transition hover:text-white">Sobre</a>
          <a href="#projects" className="transition hover:text-white">Projetos</a>
          <a href="#contact" className="transition hover:text-white">Contato</a>
        </div>
      </div>
    </footer>
  )
}
