import SpaceBackground from "@/components/SpaceBackground";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full overflow-hidden">
      {/* Premium Space Background with animations */}
      <SpaceBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-8 flex flex-col min-h-[calc(100vh-6rem)] justify-between relative z-10">
        <div>
          {children}
        </div>
        <footer className="mt-16 py-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs">
            Made with <span className="text-white">♥</span> by <span className="text-slate-400 font-medium">Himanshu Vishwakarma</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;