"use client";

import { useRef } from "react";
import { GlassButton } from "@/components/ui/GlassButton";

type PricingProps = {
  openModal: () => void;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" style={{ perspective: "1000px" }}>
          {plans.map((plan, idx) => {
            const glowColor = plan.highlighted
              ? "oklch(0.78 0.13 78 / 20%)"
              : "oklch(0.96 0.012 80 / 8%)";
            return (
              <div
                key={plan.name}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onMouseMove={handleMouseMove(idx, glowColor)}
                onMouseLeave={handleMouseLeave(idx)}
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border border-gold/80 bg-card/60 shadow-[0_0_60px_-20px_oklch(0.78_0.13_78/0.3)]"
                    : "border border-border/40 bg-card/30"
                }`}
              >
                <div
                  ref={(el) => {
                    glowRefs.current[idx] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200"
                  style={{ zIndex: 0 }}
                />
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2" style={{ zIndex: 2 }}>
                    <span className="rounded-full border border-gold/60 bg-card px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                      Recomendado
                    </span>
                  </div>
                )}
                <div className="relative" style={{ zIndex: 1 }}>
                  <h3 className="font-display text-2xl mb-2">{plan.name}</h3>
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
                  <GlassButton
                    onClick={openModal}
                    size={plan.highlighted ? "lg" : "default"}
                    className="block w-full"
                    contentClassName="block w-full text-center"
                  >
                    {plan.cta} →
                  </GlassButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
