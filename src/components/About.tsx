"use client";

export function About() {
  return (
    <section id="nosotros" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">— Nosotros</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
            No somos otra agencia de <span className="italic text-foreground/70">marketing</span>.
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-12">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Nacimos dentro de equipos comerciales reales — vendiendo, fallando, ajustando. Hoy
                ayudamos a empresas serias a construir un canal de adquisición propio, sin depender de
                la suerte ni de un becario con un CRM abierto.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Trabajamos con un máximo de 12 cuentas simultáneas. No escalamos vendiendo servicios —
                escalamos haciendo crecer a quien confía en nosotros.
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full blur-3xl bg-[radial-gradient(circle,_rgba(249,222,144,0.35),_transparent_55%)]" />
              <img src="/aurumlogo.png" alt="Aurum" className="relative h-36 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
