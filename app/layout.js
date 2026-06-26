import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "WELTH — AI-Powered Intelligent Finance Platform",
  description: "The future of intelligent financial management. Track, analyze, and optimize your finances with advanced AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${plusJakartaSans.variable} ${outfit.variable} font-sans bg-[#080d1a] text-slate-200 overflow-x-hidden`}
        >
          <SmoothScrollProvider>
            {/* Header */}
            <Header />

            {/* Page content */}
            <main className="min-h-screen overflow-x-hidden">
              {children}
            </main>

            <Toaster richColors theme="dark" />
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
