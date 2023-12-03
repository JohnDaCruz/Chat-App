import './globals.css'
import { Inter } from 'next/font/google'
import Providers from "@/app/components/Providers";
import {Metadata} from "next";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>

  )
}
