import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Esdra Felipe | Engenharia de Software & Produtos Digitais',
  description:
    'Portfólio moderno com foco em estratégia, engenharia de software e experiências digitais de alto impacto.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,var(--accent-500),transparent_65%),_transparent_40%),radial-gradient(circle_at_85%_12%,_color-mix(in_oklab,var(--warning-500),transparent_82%),_transparent_34%),linear-gradient(180deg,_var(--surface-0)_0%,_color-mix(in_oklab,var(--surface-0),#0f172a_32%)_100%)]" />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  )
}
