import type { Metadata } from 'next'
import { Dancing_Script, Poppins } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
})

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'For My Bestie',
  description: 'A special Valentine card',
}

import CursorTrail from './components/CursorTrail'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} ${poppins.variable}`}>
        <CursorTrail />
        {children}
      </body>
    </html>
  )
}
