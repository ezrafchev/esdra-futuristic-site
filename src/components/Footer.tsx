export default function Footer() {
  return (
    <footer className="relative w-full bg-black/40 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ESDRA</h3>
            <p className="text-gray-400">
              Visionário apaixonado por tecnologia, inovação e fé em Jesus Cristo.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#visao" className="text-gray-400 hover:text-white transition-colors">
                  Visão
                </a>
              </li>
              <li>
                <a href="#tecnologias" className="text-gray-400 hover:text-white transition-colors">
                  Tecnologias
                </a>
              </li>
              <li>
                <a href="#projetos" className="text-gray-400 hover:text-white transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ezrafchev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Esdra. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
