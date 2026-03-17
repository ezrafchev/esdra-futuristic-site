import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const siteUrl = 'https://esdrafelipe.dev'
const socialImage = '/globe.svg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Esdra Felipe | Engenharia de Software & Produtos Digitais',
  description:
    'Portfólio moderno com foco em estratégia, engenharia de software e experiências digitais de alto impacto.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Esdra Studio',
    title: 'Esdra Felipe | Engenharia de Software & Produtos Digitais',
    description:
      'Portfólio moderno com foco em estratégia, engenharia de software e experiências digitais de alto impacto.',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Esdra Studio — Engenharia de Software e Produtos Digitais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esdra Felipe | Engenharia de Software & Produtos Digitais',
    description:
      'Portfólio moderno com foco em estratégia, engenharia de software e experiências digitais de alto impacto.',
    creator: '@esdrafelipe',
    images: [socialImage],
  },
  category: 'technology',
  other: {
    'performance-budget': 'LCP<=2.5s; CLS<=0.1; INP<=200ms',
  },
}

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Esdra Felipe',
    url: siteUrl,
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Esdra Studio',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Esdra Studio',
    url: siteUrl,
    logo: `${siteUrl}${socialImage}`,
    sameAs: ['https://www.linkedin.com', 'https://github.com'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Esdra Studio',
    url: siteUrl,
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Script
            id="structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,var(--accent-500),transparent_65%),_transparent_40%),radial-gradient(circle_at_85%_12%,_color-mix(in_oklab,var(--warning-500),transparent_82%),_transparent_34%),linear-gradient(180deg,_var(--surface-0)_0%,_color-mix(in_oklab,var(--surface-0),#0f172a_32%)_100%)]" />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
