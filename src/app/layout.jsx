import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/ui/layout/header";
import Footer from "@/components/ui/layout/footer";

import Script from "next/script";

import { FontSizeProvider } from "@/components/ui/layout/font-size";
import { HuddleChatProvider } from "@/components/ui/layout/HuddleChatProvider";
import { HuddleChatWidget } from "@/components/chatbot/HuddleChatWidget";

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
      <HuddleChatProvider>
        <FontSizeProvider>
          <body
            id="top"
            className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
          >
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <HuddleChatWidget />
            <Script src="https://vlibras.gov.br/app/vlibras-plugin.js" />
          </body>
        </FontSizeProvider>
      </HuddleChatProvider>
    </html>
  );
}