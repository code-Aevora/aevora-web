"use client";

import { GlassButton } from "@/components/ui/GlassButton";

const links = [
  { href: "#proceso", label: "Método" },
  { href: "#inversion", label: "Niveles" },
  { href: "#nosotros", label: "Nosotros" },
];

type SiteNavProps = {
  openModal: () => void;
};

export function SiteNav({ openModal }: SiteNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-border/30 shadow-sm shadow-black/10">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8 px-5 py-2.5">
          <a href="/" className="flex items-center gap-3">
            <img src="/aurumlogo.png" alt="Aevora" style={{ height: '40px', width: 'auto' }} />
            <span style={{ fontFamily: 'Astera, sans-serif' }} className="text-base font-medium tracking-[0.22em] text-foreground/90">AEVORA</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-lg font-light text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <GlassButton
          type="button"
          onClick={openModal}
          size="sm"
          className="hidden md:inline-block text-base px-6 py-3"
        >
          Reservar diagnóstico
        </GlassButton>
      </div>
    </header>
  );
}
