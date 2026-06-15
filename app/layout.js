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
  title: "Welth — AI Finance Platform",
  description: "One stop solution for all your financial management",
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

            {/* Page content — top padding to clear fixed header */}
            <main className="min-h-screen pt-20 overflow-x-hidden">
              {children}
            </main>

            <Toaster richColors theme="dark" />

            {/* Footer */}
            <footer className="mt-8 py-10 bg-[#050a14] border-t border-[#1e2d4a]/80">
              <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
                <p className="text-slate-500 text-sm">
                  Made with{" "}
                  <span className="text-blue-400">♥</span>{" "}
                  by{" "}
                  <span className="text-slate-300 font-medium">
                    Himanshu Vishwakarma
                  </span>{" "}
                  👨🏻‍💻
                </p>
              </div>
            </footer>
          </SmoothScrollProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
