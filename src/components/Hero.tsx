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

      <div className="mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-28 sm:pt-32 lg:pt-40 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-6 text-center sm:text-left">
          <h1 className="font-display mt-7 text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
            <span className="text-foreground/90">Crecimiento</span>{" "}
            <span className="text-foreground">predecible</span>
            <br />
            <span>para empresas que ya</span>{" "}
            <span className="gold-text">facturan</span>.
          </h1>

          <p className="mt-7 max-w-full sm:max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Aevora diseña y opera el sistema completo de captación de clientes — prospección,
            contacto y cierre — para que tu equipo deje de perseguir leads y empieces a elegir con
            quién trabajar.
          </p>

          <div className="mt-10 flex flex-wrap justify-center sm:justify-start items-center gap-4">
            <GlassButton type="button" onClick={openModal} size="lg">
              Reservar diagnóstico gratuito
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
