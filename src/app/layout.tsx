import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Esdra | Software Engineer',
  description: 'Personal portfolio showcasing software engineering projects and expertise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
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
                  <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                  <a href="#technologies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Technologies</a>
                  <a href="#projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
                  <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
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
