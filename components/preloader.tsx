"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
  spring: number;
}

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

const CONFIG = {
  gap: 3,
  particleSize: 2.2,
  assembleTime: 1800,      // ← 1.8 sec assemble
  startDelay: 200,         // ← 0.2 sec delay
  mouseRadius: 110,
  mouseForce: 12,
};

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const finishedRef = useRef(false);
  const mouseRef = useRef<MouseState>({ x: -9999, y: -9999, active: false });
  const animFrameRef = useRef<number>(0);
  const WRef = useRef(0);
  const HRef = useRef(0);
  const dprRef = useRef(1);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const easeOut = useCallback((t: number) => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const logo = logoRef.current;
    if (!canvas || !image || !image.complete || !image.naturalWidth || !logo) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    WRef.current = W;
    HRef.current = H;

    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;

    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.clearRect(0, 0, W, H);

    const ratio = image.naturalWidth / image.naturalHeight;
    let logoW = Math.min(W * 0.62, 520);
    let logoH = logoW / ratio;

    if (logoH > H * 0.62) {
      logoH = H * 0.62;
      logoW = logoH * ratio;
    }

    const logoX = (W - logoW) / 2;
    const logoY = (H - logoH) / 2;

    offCtx.drawImage(image, logoX, logoY, logoW, logoH);

    const pixels = offCtx.getImageData(0, 0, W, H).data;
    const particles: Particle[] = [];

    for (let y = 0; y < H; y += CONFIG.gap) {
      for (let x = 0; x < W; x += CONFIG.gap) {
        const i = (y * W + x) * 4;
        const alpha = pixels[i + 3];

        if (alpha > 30) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 220 + Math.random() * 300;

          particles.push({
            homeX: x,
            homeY: y,
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            vx: 0,
            vy: 0,
            r: pixels[i],
            g: pixels[i + 1],
            b: pixels[i + 2],
            a: alpha,
            size: CONFIG.particleSize * (0.65 + Math.random() * 0.8),
            spring: 0.045 + Math.random() * 0.055,
          });
        }
      }
    }

    particlesRef.current = particles;
    finishedRef.current = false;
    logo.classList.remove("show");
    startTimeRef.current = performance.now() + CONFIG.startDelay;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    WRef.current = W;
    HRef.current = H;
    dprRef.current = dpr;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    buildParticles();
  }, [buildParticles]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, p: Particle) => {
    const dpr = dprRef.current;
    const size = p.size * dpr;

    ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
    ctx.beginPath();
    ctx.arc(p.x * dpr, p.y * dpr, size, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const animate = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      const logo = logoRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      animFrameRef.current = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = now - startTimeRef.current;
      const progress = Math.max(0, Math.min(1, elapsed / CONFIG.assembleTime));
      const eased = easeOut(progress);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (const p of particles) {
        if (progress < 1) {
          const dx = p.homeX - p.x;
          const dy = p.homeY - p.y;
          p.vx += dx * p.spring;
          p.vy += dy * p.spring;
        } else {
          p.vx += (p.homeX - p.x) * 0.006;
          p.vy += (p.homeY - p.y) * 0.006;
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRadius && distance > 0.1) {
            const force = Math.pow(1 - distance / CONFIG.mouseRadius, 2) * CONFIG.mouseForce;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
          }
        }

        p.vx *= 0.82;
        p.vy *= 0.82;
        p.vx = Math.max(-5, Math.min(5, p.vx));
        p.vy = Math.max(-5, Math.min(5, p.vy));
        p.x += p.vx;
        p.y += p.vy;

        drawParticle(ctx, p);
      }

      if (!finishedRef.current && progress >= 1) {
        finishedRef.current = true;
        setTimeout(() => {
          logo?.classList.add("show");
        }, 250);
      }
    },
    [easeOut, drawParticle]
  );

  useEffect(() => {
    const image = new Image();
    image.src = "/logo.png";
    imageRef.current = image;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = (event.clientX - rect.left) * (WRef.current / rect.width);
      mouseRef.current.y = (event.clientY - rect.top) * (HRef.current / rect.height);
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    image.onload = () => {
      resizeCanvas();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, resizeCanvas]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Easy-Ware Solution"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "min(430px, 68vw)",
          height: "auto",
          transform: "translate(-50%, -50%) scale(0.92)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 1.2s cubic-bezier(.22, 1, .36, 1), transform 1.4s cubic-bezier(.16, 1, .3, 1)",
          filter: "drop-shadow(0 0 25px rgba(115, 45, 255, .18))",
        }}
        className="preloader-logo"
      />
      <style jsx global>{`
        .preloader-logo.show {
          opacity: 1 !important;
          transform: translate(-50%, -50%) scale(1) !important;
        }
      `}</style>
    </div>
  );
}