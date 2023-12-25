import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AppProvider from './components/layout/appContext'
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={inter.className}>
        <main className='max-w-4xl mx-auto'>
          <AppProvider>
          <Toaster />
          <Header/>
          {children}
          <Footer/>
          </AppProvider>
        </main>
        </body>
    </html>
  )
}
