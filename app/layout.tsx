import type React from 'react'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AirBridge — The Application Delivery Platform for Air-Gapped Environments',
    template: '%s — AirBridge',
  },
  description:
    'AirBridge is the open-source application delivery platform for air-gapped environments. Develop anywhere, deploy everywhere, secure by design. Package your entire application into a single, immutable .aib bundle.',
  keywords: [
    'air-gapped',
    'application delivery',
    'kubernetes',
    'OCI',
    'DevOps',
    'platform engineering',
    'software factory',
    'SBOM',
    'bundle',
    'registry',
  ],
  generator: 'v0.app',
  metadataBase: new URL('https://airbridge.dev'),
  openGraph: {
    title: 'AirBridge — Application Delivery for Air-Gapped Environments',
    description: 'Develop anywhere. Deploy everywhere. Secure by design.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
