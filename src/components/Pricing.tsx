"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" style={{ perspective: "1000px" }}>
          {plans.map((plan, idx) => {
            const glowColor = plan.highlighted
              ? "oklch(0.78 0.13 78 / 20%)"
              : "oklch(0.96 0.012 80 / 8%)";
            const gradientColors = plan.highlighted
              ? { primary: "#f9de90", secondary: "#e7c966", accent: "#fff4c1" }
              : { primary: "#6d5d3c", secondary: "#b08b3a", accent: "#d9c17a" };

            return (
              <BorderRotate
                key={plan.name}
                className="h-full"
                animationMode="auto-rotate"
                animationSpeed={14}
                gradientColors={gradientColors}
                backgroundColor="oklch(0.17 0.013 65)"
                borderWidth={2}
                borderRadius={28}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseMove={handleMouseMove(idx, glowColor)}
                  onMouseLeave={handleMouseLeave(idx)}
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                  className={`relative h-full overflow-hidden rounded-[22px] ${
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
              </BorderRotate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
