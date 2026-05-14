"use client";

import { HeroCanvas } from "./HeroCanvas";
import { GlassButton } from "@/components/ui/GlassButton";

type HeroProps = {
  openModal: () => void;
};

export function Hero({ openModal }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* background canvas */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.4)_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-40 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Aceptando 4 clientes · Q2 2026
            </span>
          </div>

          <h1 className="font-display mt-7 text-balance text-6xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="font-display italic text-foreground/90">Crecimiento</span>{" "}
            <span className="font-display text-foreground">predecible</span>
            <br />
            <span className="font-display">para empresas que ya</span>{" "}
            <span className="gold-text font-display italic">facturan</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Aevora diseña y opera el sistema completo de captación de clientes — prospección,
            contacto y cierre — para que tu equipo deje de perseguir leads y empieces a elegir con
            quién trabajar.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GlassButton type="button" onClick={openModal} size="lg">
              Reservar diagnóstico gratuito <span aria-hidden>→</span>
            </GlassButton>
            <a
              href="#proceso"
              className="text-sm font-light text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
            >
              Cómo trabajamos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
