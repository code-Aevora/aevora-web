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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-8 px-5 py-2.5">
          <a href="/" className="flex items-center gap-3">
            <img src="/aurumlogo.png" alt="Aevora" style={{ height: '32px', width: 'auto' }} />
            <span style={{ fontFamily: 'Astera, sans-serif' }} className="text-sm font-medium tracking-[0.22em] text-foreground/90">AEVORA</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base font-light text-muted-foreground transition hover:text-foreground"
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
          className="hidden md:inline-block"
        >
          Reservar diagnóstico <span aria-hidden>→</span>
        </GlassButton>
      </div>
    </header>
  );
}
