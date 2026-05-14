"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function SchemaCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    let animationFrameId = 0;

    function resizeCanvas() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      currentCanvas.width = window.innerWidth;
      currentCanvas.height = window.innerHeight;
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * canvas.height / 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx.lineWidth = 1 + i * 0.3;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative isolate mb-16 overflow-hidden rounded-3xl bg-background/40">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
      <div className="relative z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-xs">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-[0_25px_90px_-40px_rgba(255,255,255,0.16)]">
            <div className="p-4 flex justify-center relative">
              <div className="w-full h-48 rounded-xl bg-white/5 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:15px_15px]" />
              </div>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="p-4">
              <span className="inline-block px-3 py-1 rounded-full border border-indigo-400/30 bg-white/5 text-indigo-300 text-xs font-medium mb-3">
                Database
              </span>
              <h3 className="text-lg font-medium text-white mb-2">Schema Management</h3>
              <p className="text-white/70 mb-4 leading-relaxed text-xs">
                Design, optimize and maintain your database structure with powerful schema tools.
              </p>
              <div className="flex justify-between items-center">
                <a href="#" className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition text-xs font-medium rounded-lg border border-indigo-400/30 bg-white/5 px-3 py-1.5">
                  Manage
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <span className="text-white/50 text-xs bg-white/5 px-2 py-1 rounded-full border border-white/10">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type PricingProps = {
  openModal: () => void;
};

type AnimationMode = "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface BorderRotateProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: "#584827",
  secondary: "#c7a03c",
  accent: "#f9de90",
};

const BorderRotate = ({
  children,
  className = "",
  animationMode = "auto-rotate",
  animationSpeed = 12,
  gradientColors = defaultGradientColors,
  backgroundColor = "oklch(0.17 0.013 65)",
  borderWidth = 2,
  borderRadius = 24,
  style = {},
  ...props
}: BorderRotateProps) => {
  const getAnimationClass = () => {
    switch (animationMode) {
      case "auto-rotate":
        return "gradient-border-auto";
      case "rotate-on-hover":
        return "gradient-border-hover";
      case "stop-rotate-on-hover":
        return "gradient-border-stop-hover";
      default:
        return "";
    }
  };

  const combinedStyle: CSSProperties = {
    "--gradient-primary": gradientColors.primary,
    "--gradient-secondary": gradientColors.secondary,
    "--gradient-accent": gradientColors.accent,
    "--bg-color": backgroundColor,
    "--border-width": `${borderWidth}px`,
    "--border-radius": `${borderRadius}px`,
    "--animation-duration": `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `linear-gradient(${backgroundColor}, ${backgroundColor}), conic-gradient(from 0deg, ${gradientColors.primary} 0%, ${gradientColors.secondary} 20%, ${gradientColors.accent} 35%, ${gradientColors.secondary} 50%, ${gradientColors.primary} 70%, ${gradientColors.accent} 85%, ${gradientColors.primary} 100%)`,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
    ...style,
  } as CSSProperties;

  return (
    <div
      className={`gradient-border-component ${getAnimationClass()} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export function Pricing({ openModal }: PricingProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove =
    (idx: number, glowColor: string) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current[idx];
      const glow = glowRefs.current[idx];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * 20; // -10..10
      const rotX = -((y / rect.height) - 0.5) * 20;
      card.style.transition = "transform 100ms ease-out";
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
        glow.style.opacity = "1";
      }
    };

  const handleMouseLeave = (idx: number) => () => {
    const card = cardRefs.current[idx];
    const glow = glowRefs.current[idx];
    if (card) {
      card.style.transition = "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
    if (glow) glow.style.opacity = "0";
  };
  const plans = [
    {
      name: "Aevora You",
      description: "Para negocios con leads que ya entran pero pierden ventas por falta de seguimiento o cierre.",
      includes: [
        "CRM de Aevora con migración automática",
        "2 Voice Sales Agents con voz clonada",
        "1 Setter IA para cualificar leads entrantes",
        "Onboarding IA que analiza tu negocio",
        "Priorización automática de leads",
      ],
      excludes: [
        "Prospección en frío",
        "Generación de campañas",
      ],
      cta: "Solicitar información",
      highlighted: false,
    },
    {
      name: "Aevora Addon",
      description: "Para negocios que necesitan generar sus propios leads y cerrarlos con IA.",
      includes: [
        "Todo lo de Aevora You",
        "Integración directa con Meta Ads",
        "Creación automática de campañas (posters, vídeos, copy)",
        "Leads de formulario → cualificación y cierre automático",
      ],
      excludes: [
        "Avatares con rostro",
        "Comerciales digitales visuales",
      ],
      cta: "Solicitar información",
      highlighted: false,
    },
    {
      name: "Aevora Bespoke",
      description: "Para empresas con alto volumen que quieren delegar el 100% del proceso comercial a IA.",
      includes: [
        "Todo lo de Aevora Addon",
        "6 Comerciales Digitales con rostro y voz propia",
        "Gestión autónoma 24/7 de objeciones y cierre",
        "Reportes automáticos de rendimiento",
        "Actualización automática del CRM",
        "Sustituye un equipo de +10 personas",
      ],
      excludes: [],
      cta: "Hablemos de tu cuenta",
      highlighted: true,
    },
  ];

  return (
    <section id="inversion" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">— Niveles</p>
          <h2 className="font-display text-4xl md:text-5xl">Elige el nivel de autonomía comercial que necesitas.</h2>
        </div>
        <SchemaCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" style={{ perspective: "1000px" }}>
          {plans.map((plan, idx) => {
            const glowColor = plan.highlighted
              ? "oklch(0.78 0.13 78 / 20%)"
              : "oklch(0.96 0.012 80 / 8%)";

            return (
              <div key={plan.name} className="h-full">
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseMove={handleMouseMove(idx, glowColor)}
                  onMouseLeave={handleMouseLeave(idx)}
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                  className={`relative h-full overflow-hidden rounded-[22px] border border-border/50 ${
                    plan.highlighted
                      ? "bg-card/70 shadow-[0_24px_80px_-30px_oklch(0.78_0.13_78/0.35)]"
                      : "bg-card/60"
                  }`}
                >
                  <div
                    ref={(el) => {
                      glowRefs.current[idx] = el;
                    }}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-200"
                    style={{ zIndex: 0 }}
                  />
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2" style={{ zIndex: 2 }}>
                      <span className="rounded-full border border-gold/60 bg-card px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                        Recomendado
                      </span>
                    </div>
                  )}
                  <div className="relative z-10 flex h-full flex-col p-8">
                    <div className="flex-1">
                      <h3 className="text-2xl mb-2" style={{ fontFamily: 'Astera, sans-serif' }}>
                        {plan.name}
                      </h3>
                      <p className="text-base text-muted-foreground mb-8 leading-relaxed">{plan.description}</p>
                      <ul className="space-y-3 mb-6">
                        {plan.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-base">
                            <span className="text-gold mt-0.5">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.excludes.length > 0 && (
                        <ul className="space-y-2 mb-8 pt-4 border-t border-border/30">
                          {plan.excludes.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                              <span className="mt-0.5">–</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-6">
                      <Button
                        type="button"
                        onClick={openModal}
                        className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-full overflow-hidden cursor-pointer"
                      >
                        <span className="relative z-10 transition-all duration-500">
                          {plan.cta}
                        </span>
                        <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                          <ArrowUpRight size={16} />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
