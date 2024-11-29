import { Toaster } from '@/components/ui/sonner'
import { montserrat, prata } from '@/fonts/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Provider } from './provider'

export const metadata: Metadata = {
  title: 'Organo - Organize sua equipe',
  description: 'Crie sua organização e gerencie seus colaboradores.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${prata.variable} ${montserrat.variable}`}>
      <body className="font-montserrat antialiased">
        <Provider>
          {children}
          <Toaster position="top-center" richColors />
        </Provider>
      </body>
    </html>
  )
}
