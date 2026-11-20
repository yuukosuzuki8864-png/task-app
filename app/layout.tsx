import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner' // ★1

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "TaskApp",
  description: "タスク管理アプリ",
};

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
