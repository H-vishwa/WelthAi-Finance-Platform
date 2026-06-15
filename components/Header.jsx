import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full z-50 border-b border-white/5">
      <nav className="container mx-auto px-4 pt-1 backdrop-blur-sm pb-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-15  w-auto object-contain"
          />
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button
                variant="ghost"
                className="cursor-pointer text-slate-300 hover:text-white hover:bg-white/8 border border-transparent hover:border-white/10 transition-all duration-200 gap-2">
                <LayoutDashboard size={16} />
                <span className="hidden md:inline text-sm">Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button
                className="cursor-pointer btn-shimmer gap-2 text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  border: "none",
                  boxShadow: "0 0 20px rgba(59,130,246,0.35)",
                }}>
                <PenBox size={16} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="cursor-pointer text-sm border-white/15 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="ml-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 ring-2 ring-blue-500/30 ring-offset-2 ring-offset-[#080d1a]",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
