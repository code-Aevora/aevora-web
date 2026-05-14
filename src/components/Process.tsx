"use client";

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

  return (
    <section id="proceso" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">— Método</p>
          <h2 className="font-display text-4xl md:text-5xl">Tres movimientos. Cero intervención humana.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-border/50 bg-card/30 p-10 transition-all duration-300 hover:border-gold/40"
            >
              <span className="block text-7xl font-display text-gold/20 leading-none mb-6">{step.number}</span>
              <h3 className="font-display text-2xl mb-4">{step.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
