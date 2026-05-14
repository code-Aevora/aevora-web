"use client";

import { useState, useEffect } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    personas: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.empresa.trim()) newErrors.empresa = true;
    if (!formData.personas) newErrors.personas = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg px-4 py-3 text-sm bg-white/5 border transition-all outline-none text-foreground placeholder:text-muted-foreground/50 ${
      errors[field]
        ? "border-red-500 focus:border-red-400"
        : "border-border/40 focus:border-gold/60"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-10 border border-border/40"
        style={{ backgroundColor: "oklch(0.17 0.013 65)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-muted-foreground hover:text-gold text-xl transition-colors"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl mb-3">Recibido.</h3>
            <p className="text-muted-foreground text-sm">Te contactaremos en menos de 24 horas.</p>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.22em] text-gold mb-2">— Próximo paso</p>
            <h3 className="text-2xl mb-1">Reserva un diagnóstico comercial gratuito.</h3>
            <p className="text-sm text-muted-foreground mb-8">30 minutos. Un plan accionable. Trabajemos juntos o no.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Nombre *</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className={inputClass("nombre")}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Email corporativo *</label>
                <input
                  type="email"
                  placeholder="tu@empresa.com"
                  className={inputClass("email")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Empresa *</label>
                <input
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className={inputClass("empresa")}
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Personas en ventas *</label>
                <select
                  className={inputClass("personas")}
                  value={formData.personas}
                  onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="solo">Solo yo</option>
                  <option value="2-5">2-5 personas</option>
                  <option value="6-15">6-15 personas</option>
                  <option value="+15">+15 personas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Mensaje (opcional)</label>
                <textarea
                  placeholder="Cuéntanos qué problema quieres resolver"
                  rows={3}
                  className={inputClass("mensaje") + " resize-none"}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full rounded-full py-4 text-sm font-medium uppercase tracking-[0.1em] bg-gradient-to-r from-gold-soft to-gold text-primary-foreground transition-all hover:shadow-[0_15px_40px_-10px_oklch(0.78_0.13_78/0.6)] mt-2"
              >
                Solicitar acceso a AEVORA →
              </button>
              <p className="text-center text-xs text-muted-foreground">Sin permanencia. Sin compromiso. Respuesta en 24h.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
