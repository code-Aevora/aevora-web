"use client";

import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { ContactModal } from "@/components/Modal/ContactModal";
import { AevoraBackground } from "@/components/AevoraBackground";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SiteNav openModal={openModal} />
      <main>
        <Hero openModal={openModal} />

        <div style={{ position: 'relative' }}>
          <AevoraBackground />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Process />
            <Pricing openModal={openModal} />
            <About />
            <CTA openModal={openModal} />
          </div>
        </div>
      </main>
      <footer className="border-t border-border/60 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src="/aurumlogo.png" alt="Aevora" style={{ height: '32px', width: 'auto' }} />
            <div>
              <div style={{ fontFamily: 'Astera, sans-serif' }} className="text-sm font-medium tracking-[0.22em] text-foreground/90">AEVORA</div>
              <div className="text-xs text-muted-foreground">Agentic AI Company · España</div>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <a href="#proceso" className="hover:text-foreground transition-colors">Método</a>
            <a href="#inversion" className="hover:text-foreground transition-colors">Niveles</a>
            <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
            <a href="mailto:support@aevora.es" className="hover:text-foreground transition-colors">support@aevora.es</a>
            <span>© 2026 Aevora</span>
          </nav>
        </div>
      </footer>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
