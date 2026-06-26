import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import HeaderWrapper from "./HeaderWrapper";

const Header = async () => {
  await checkUser();
  return (
    <HeaderWrapper>
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-widest text-white font-heading">
            WELTH
          </span>
        </Link>


        {/* Nav Actions */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button
                variant="ghost"
                className="cursor-pointer text-slate-350 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 gap-2 text-xs font-semibold"
              >
                <LayoutDashboard size={14} />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button
                className="cursor-pointer btn-shimmer gap-2 text-xs font-semibold"
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                }}
              >
                <PenBox size={14} />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                className="cursor-pointer btn-shimmer px-6 text-xs font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition-all duration-200"
                style={{ border: "none", boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)" }}
              >
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="ml-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 ring-2 ring-white/30 ring-offset-2 ring-offset-black",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </HeaderWrapper>
  );
};

export default Header;
