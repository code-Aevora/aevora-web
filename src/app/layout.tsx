import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aevora · Sistema Comercial Autónomo",
  description: "AEVORA despliega agentes de IA que prospectan, contactan, cualifican y cierran ventas por ti — de forma autónoma, predecible y escalable.",
  icons: {
    icon: "/aurumlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
