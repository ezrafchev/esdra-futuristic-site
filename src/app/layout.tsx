import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Esdra | Engenheiro de Software',
  description: 'Portfólio pessoal apresentando projetos e expertise em engenharia de software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} min-h-screen grid-pattern`}>
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black -z-10" />
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <a href="#" className="text-xl font-bold text-gradient">E</a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Sobre</a>
                  <a href="#technologies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Tecnologias</a>
                  <a href="#projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Projetos</a>
                  <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contato</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
