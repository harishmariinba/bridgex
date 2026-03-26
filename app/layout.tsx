import Navbar from "@/components/Navbar"
import { Toaster } from "react-hot-toast"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">

        {/* 🔥 Animated Glow Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>
        </div>

        <Navbar />
        <Toaster position="top-right" />

        {children}
      </body>
    </html>
  )
}