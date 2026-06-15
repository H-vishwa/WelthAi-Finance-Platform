import { Suspense } from "react";
import DashboardPage from "./page";

const DashboardLayout = () => {
  return (
    <div className="pb-12">
      {/* Page Header */}
      <div className="mb-8 pt-4">
        <h1 className="text-4xl md:text-5xl font-black gradient-title mb-1">
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm">Your financial overview at a glance</p>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-1 rounded-full overflow-hidden bg-white/5">
            <div className="h-full w-3/5 rounded-full animate-pulse bg-gradient-to-r from-blue-500 to-cyan-400" />
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
