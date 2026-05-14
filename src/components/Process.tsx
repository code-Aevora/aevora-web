"use client";

import { type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type AnimationMode = "auto-rotate" | "rotate-on-hover" | "stop-rotate-on-hover";

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  children: ReactNode;
  className?: string;

  // Animation customization
  animationMode?: AnimationMode;
  animationSpeed?: number;

  // Color customization
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;

  // Border customization
  borderWidth?: number;
  borderRadius?: number;

  // Container styling
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: "#584827",
  secondary: "#c7a03c",
  accent: "#f9de90",
};

const BorderRotate = ({
  children,
  className = "",
  animationMode = "auto-rotate",
  animationSpeed = 12,
  gradientColors = defaultGradientColors,
  backgroundColor = "#2d230f",
  borderWidth = 2,
  borderRadius = 24,
  style = {},
  ...props
}: BorderRotateProps) => {
  const getAnimationClass = () => {
    switch (animationMode) {
      case "auto-rotate":
        return "gradient-border-auto";
      case "rotate-on-hover":
        return "gradient-border-hover";
      case "stop-rotate-on-hover":
        return "gradient-border-stop-hover";
      default:
        return "";
    }
  };

  const combinedStyle: CSSProperties = {
    "--gradient-primary": gradientColors.primary,
    "--gradient-secondary": gradientColors.secondary,
    "--gradient-accent": gradientColors.accent,
    "--bg-color": backgroundColor,
    "--border-width": `${borderWidth}px`,
    "--border-radius": `${borderRadius}px`,
    "--animation-duration": `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 30%,
        ${gradientColors.secondary} 33%,
        ${gradientColors.primary} 40%,
        ${gradientColors.primary} 50%,
        ${gradientColors.secondary} 77%,
        ${gradientColors.accent} 80%,
        ${gradientColors.secondary} 83%,
        ${gradientColors.primary} 90%
      )
    `,
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
    ...style,
  } as CSSProperties;

  return (
    <div
      className={`gradient-border-component ${getAnimationClass()} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

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
            <BorderRotate
              key={step.number}
              className="h-full"
              animationMode="auto-rotate"
              animationSpeed={30}
              borderWidth={2}
              borderRadius={28}
            >
              <div className="relative h-full overflow-hidden rounded-[26px] bg-card/30 p-10 transition-all duration-300 hover:border-gold/40">
                <span className="block text-7xl font-display text-gold/20 leading-none mb-6">{step.number}</span>
                <h3 className="font-display text-2xl mb-4">{step.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </BorderRotate>
          ))}
        </div>
      </div>
    </section>
  );
}
