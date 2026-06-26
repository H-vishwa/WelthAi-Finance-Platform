
import SpaceBackground from "@/components/SpaceBackground";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex justify-center pt-32 pb-12 bg-black">
      <SpaceBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
