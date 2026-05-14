"use client";

import React from "react";

function useCountUp(target: number, duration: number = 600, inView: boolean = false) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

interface StepCardProps {
  step: {
    number: string;
    title: string;
    body: string;
  };
  isInView: boolean;
}

function StepCard({ step, isInView }: StepCardProps) {
  const num = parseInt(step.number);
  const count = useCountUp(num, 600, isInView);
  const display = String(count).padStart(2, "0");

  return (
    <div className="h-full overflow-hidden rounded-[26px] bg-card/60 p-6 md:p-10 transition-all duration-300">
      <span className="block text-5xl md:text-7xl font-display text-gold/20 leading-none mb-6">{display}</span>
      <h3 className="font-display text-xl md:text-2xl mb-4">{step.title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground">{step.body}</p>
    </div>
  );
}

export function Process() {

  const steps = [
    {
      number: "01",
      title: "El sistema analiza tu mercado",
      body: "AEVORA escanea tu mercado objetivo, identifica a los decisores relevantes y extrae los datos de contacto de forma automática. Sin intervención humana, sin horas perdidas.",
    },
    {
      number: "02",
      title: "La IA contacta, cualifica y hace seguimiento",
      body: "Llamadas personalizadas para cada prospecto y seguimiento completamente autónomo — voz clonada o avatar, según tu plan. Cadencias multicanal. La IA maneja objeciones, responde preguntas y agenda reuniones sin que muevas un dedo.",
    },
    {
      number: "03",
      title: "Tú recibes clientes listos para cerrar",
      body: "Cuando un prospecto está cualificado e interesado, AEVORA te lo entrega. Tú solo apareces en el momento de valor. Pipeline en tiempo real. Notificaciones automáticas cuando hay una oportunidad caliente. Cero gestión manual.",
    },
  ];

  const gridRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="proceso" className="py-20 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">— Método</p>
          <h2 className="font-display text-4xl md:text-5xl">Tres movimientos. Cero intervención humana.</h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
