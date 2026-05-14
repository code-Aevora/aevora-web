"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClose = () => setIsOpen(false);
  const handleLinkClick = () => {
    handleMenuClose();
  };
  const handleButtonClick = () => {
    openModal();
    handleMenuClose();
  };

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

        <div className="hidden md:flex">
          <GlassButton
            type="button"
            onClick={openModal}
            size="default"
            className="h-12 text-base px-6"
          >
            Reservar diagnóstico
          </GlassButton>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={handleLinkClick}
                className="text-xl py-4 px-6 border-b border-border/20 text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="px-6 py-4">
              <GlassButton
                type="button"
                onClick={handleButtonClick}
                size="lg"
                className="w-full"
              >
                Reservar diagnóstico
              </GlassButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
