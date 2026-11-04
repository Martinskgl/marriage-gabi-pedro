import localFont from "next/font/local";
import { Italiana, Pinyon_Script } from "next/font/google";

/*
 * Tipografia da identidade (atelier):
 *   - Slight       → títulos e nomes (script)
 *   - TAN Garland  → palavras curtas e títulos de apoio
 *   - CMU Serif    → textos, datas e informações
 *
 * Slight e TAN Garland são fontes pagas. Enquanto os arquivos não chegam,
 * usamos substitutas gratuitas. Para trocar pelas originais:
 *   1. coloque os arquivos em src/fonts (ex.: slight.woff2, tan-garland.woff2)
 *   2. substitua as duas declarações abaixo por:
 *        export const script = localFont({ src: "../fonts/slight.woff2", variable: "--font-script", display: "swap" });
 *        export const display = localFont({ src: "../fonts/tan-garland.woff2", variable: "--font-display", display: "swap" });
 */

// Substituta da Slight
export const script = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

// Substituta da TAN Garland
export const display = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// CMU Serif (arquivo original do atelier)
export const serif = localFont({
  src: "../fonts/cmunrm.otf",
  variable: "--font-serif",
  display: "swap",
});
