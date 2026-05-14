"use client";

export function About() {
  return (
    <section id="nosotros" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">— Nosotros</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            No somos otra agencia de <span className="italic text-foreground/70">marketing</span>.
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="space-y-6 lg:col-span-7">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Nacimos dentro de equipos comerciales reales — vendiendo, fallando, ajustando. Hoy
                ayudamos a empresas serias a construir un canal de adquisición propio, sin depender de
                la suerte ni de un becario con un CRM abierto.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Trabajamos con un máximo de 12 cuentas simultáneas. No escalamos vendiendo servicios —
                escalamos haciendo crecer a quien confía en nosotros.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end lg:col-span-5">
              <img
                src="/aurumlogo.png"
                alt="Aurum"
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
