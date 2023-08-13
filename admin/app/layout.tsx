import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-prrovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllUNeed Admin',
  description: 'AllUNeed Admin Dashboard',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
          <div className='h-[50px]' />
        </body>
      </html>
    </ClerkProvider>
  )
}
