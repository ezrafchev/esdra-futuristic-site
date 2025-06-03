import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Esdra - Desenvolvedor Visionário',
  description: 'Site pessoal de Esdra - Desenvolvedor, Visionário e Arquiteto do Invisível',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
