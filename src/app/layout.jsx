import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";
import ThemeToggle from "@/components/ui/layout/theme-toggle";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Huddle",
  description: "Plataforma gamer para encontrar seu squad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body id="top"
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <ThemeToggle />
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
