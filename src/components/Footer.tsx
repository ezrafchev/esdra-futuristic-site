export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] px-[var(--space-container)] py-10">
      <div className="section-container flex flex-col items-start justify-between gap-4 text-sm text-[var(--neutral-300)] md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Esdra Studio. Digital product strategy, design e engenharia de classe global.</p>
        <div className="flex items-center gap-4">
          <a href="#about" className="transition hover:text-[var(--neutral-100)]">Sobre</a>
          <a href="#projects" className="transition hover:text-[var(--neutral-100)]">Projetos</a>
          <a href="#contact" className="transition hover:text-[var(--neutral-100)]">Contato</a>
        </div>
      </div>
    </footer>
  )
}
