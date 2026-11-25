import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./painel.css";

// Layout raiz só do painel (/admin e /login): o Tailwind do painel não chega ao site dos convidados
export const metadata: Metadata = {
  title: "Painel · Gabi & Pedro",
  robots: { index: false, follow: false },
};

export default function PainelLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
