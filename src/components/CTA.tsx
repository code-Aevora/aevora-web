"use client";

import { GlassButton } from "@/components/ui/GlassButton";

export function CTA({ openModal }: { openModal: () => void }) {
  return (
    <section id="contacto" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-ink-2 via-ink to-background p-12 md:p-20">
          <div aria-hidden className="absolute inset-0 rotate-slow">
            <div className="absolute -right-32 -top-16 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
          </div>
          <div aria-hidden className="absolute inset-0 rotate-slow">
            <div className="absolute -bottom-16 -left-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold">— Próximo paso</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.0] tracking-tight md:text-7xl">
                Reserva un <span className="font-display text-foreground/80">diagnóstico</span>
                <br />
                comercial gratuito.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                30 minutos con un estratega senior. Salimos con un plan accionable — trabajemos
                juntos o no. Solo aceptamos 6 diagnósticos al mes.
              </p>
            </div>
            <div className="flex items-end lg:col-span-5 lg:justify-end">
              <GlassButton type="button" onClick={openModal} size="lg">
                Solicitar diagnóstico <span aria-hidden>→</span>
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src="/aurumlogo.png" alt="Aevora" style={{ height: "28px", width: "auto" }} />
          <div>
            <div className="text-sm font-medium tracking-[0.22em] text-foreground/90">AEVORA</div>
            <div className="text-xs text-muted-foreground">Agentic AI Company · España</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <a href="#proceso" className="hover:text-foreground">
            Método
          </a>
          <a href="#inversion" className="hover:text-foreground">
            Niveles
          </a>
          <a href="#nosotros" className="hover:text-foreground">
            Nosotros
          </a>
          <a href="mailto:hola@aevora.es" className="hover:text-foreground">
            hola@aevora.es
          </a>
          <span>© {new Date().getFullYear()} Aevora</span>
        </div>
      </div>
    </footer>
  );
}
