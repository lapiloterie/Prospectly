import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prospectly — Lead Generation for Web Agencies',
  description: 'Find local businesses that need a website or improvements. Score, filter, and reach out at scale.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-0 text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
