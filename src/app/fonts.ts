import localFont from "next/font/local";
import { Libre_Baskerville } from "next/font/google";

/*
 * Tipografia definida pelos noivos:
 *   - Slight (arquivo original)        → nomes e algumas frases ("Nos vemos dia 26 de junho!", assinatura do recado)
 *   - Libre Baskerville Regular        → mensagem dos noivos, história, informações e todo o resto
 *
 * "De tantos lugares, aqui." continua como a imagem do lettering original.
 */

// Slight — licença web (uso em desktop proibido)
export const script = localFont({
  src: "../fonts/Slight-Regular.ttf",
  variable: "--font-script",
  display: "swap",
});

// Libre Baskerville Regular
export const serif = Libre_Baskerville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
