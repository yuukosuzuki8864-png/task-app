import type { Metadata } from 'next'
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner' // ★1

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'TaskApp',
    template: '%s | TaskApp',
  },
  description: 'タスク管理アプリ',
  openGraph: {
    title: 'TaskApp',
    description: 'タスク管理アプリ',
    type: 'website',
    locale: 'ja_JP', // 言語と地域（日本語）
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children ,}: {children:React.ReactNode}) {
  return (
    <html
      lang="ja" className={cn("font-sans", geist.variable)}>
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
        <Toaster richColors /> {/* ★2 */}
      </body>
    </html>
  );
}
