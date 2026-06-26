"use client";
import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars = [];

    const createStar = () => {
      const currentWidth = width || canvas.offsetWidth || window.innerWidth;
      const currentHeight = height || canvas.offsetHeight || 800;
      return {
        x: Math.random() * currentWidth,
        y: Math.random() * (currentHeight / 2),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 3 + 2,
        dx: Math.random() * 2 + 1.5,
        dy: Math.random() * 1.5 + 1.5,
        opacity: 1,
        fadeSpeed: Math.random() * 0.01 + 0.005,
      };
    };

    const animate = () => {
      const currentWidth = canvas.offsetWidth;
      const currentHeight = canvas.offsetHeight;

      if (currentWidth !== width || currentHeight !== height) {
        width = canvas.width = currentWidth;
        height = canvas.height = currentHeight;
      }

      ctx.clearRect(0, 0, width, height);

      // Spawn stars occasionally
      if (Math.random() < 0.012 && stars.length < 3) {
        stars.push(createStar());
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.x += star.dx;
        star.y += star.dy;
        star.opacity -= star.fadeSpeed;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          stars.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.length * (star.dx / Math.sqrt(star.dx * star.dx + star.dy * star.dy)),
          star.y - star.length * (star.dy / Math.sqrt(star.dx * star.dx + star.dy * star.dy))
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        grad.addColorStop(0.15, `rgba(168, 85, 247, ${star.opacity * 0.5})`); // purple
        grad.addColorStop(0.5, `rgba(59, 130, 246, ${star.opacity * 0.2})`);  // blue
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.length * (star.dx / Math.sqrt(star.dx * star.dx + star.dy * star.dy)),
          star.y - star.length * (star.dy / Math.sqrt(star.dx * star.dx + star.dy * star.dy))
        );
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background ambient orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-violet-600/5 blur-[120px] md:blur-[180px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-indigo-500/5 blur-[120px] md:blur-[180px]" />
      
      {/* Shooting Stars Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Starry Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1px)`,
          backgroundSize: "48px 48px, 96px 96px",
          backgroundPosition: "0 0, 24px 24px",
        }}
      />
    </div>
  );
};

export default SpaceBackground;
