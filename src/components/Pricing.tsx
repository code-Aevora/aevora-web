"use client";

import React from "react";
import { GlassButton } from "@/components/ui/GlassButton";

type PricingProps = {
  openModal: () => void;
};

interface PlanCardProps {
  plan: {
    name: string;
    description: string;
    includes: string[];
    excludes: string[];
    cta: string;
    highlighted: boolean;
  };
  openModal: () => void;
  highlighted: boolean;
}

function PlanCard({ plan, openModal, highlighted }: PlanCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 80ms ease-out';
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      key={plan.name}
      className={`group relative h-full overflow-visible rounded-[22px] border border-border/50 ${
        highlighted
          ? "bg-card/70 shadow-[0_24px_80px_-30px_oklch(0.78_0.13_78/0.35)]"
          : "bg-card/60"
      }`}
      style={{ transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${
            highlighted
              ? 'oklch(0.78 0.13 78 / 0.12)'
              : 'oklch(0.96 0.012 80 / 0.05)'
          }, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,222,144,0.18),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:18px_18px] opacity-40" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="rounded-full border border-gold/60 bg-card px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
            Recomendado
          </span>
        </div>
      )}
      <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
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
          <GlassButton
            type="button"
            onClick={openModal}
            size={plan.highlighted ? "lg" : "default"}
            className="w-full"
          >
            {plan.cta}
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

export function Pricing({ openModal }: PricingProps) {
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
    <section id="inversion" className="py-20 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">— Niveles</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Elige el nivel de autonomía comercial que necesitas.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} openModal={openModal} highlighted={plan.highlighted} />
          ))}
        </div>
      </div>
    </section>
  );
}
