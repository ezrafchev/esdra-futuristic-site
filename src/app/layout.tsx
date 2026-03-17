import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Esdra Felipe | Engenharia de Software & Produtos Digitais',
  description:
    'Portfólio moderno com foco em estratégia, engenharia de software e experiências digitais de alto impacto.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-slate-950 font-sans text-slate-100 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_38%),radial-gradient(circle_at_85%_12%,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#020617_55%,_#0f172a_100%)]" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
