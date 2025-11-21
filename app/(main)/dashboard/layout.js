import { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader } from "react-spinners";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold gradient-title mb-4 animate-gradient">
        Dashboard
      </h1>

      {/* dashboard Page */}
      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color="#0e7490" />
        }>
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
