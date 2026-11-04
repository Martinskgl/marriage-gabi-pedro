// Converte PNG com fundo branco em PNG transparente na cor verde assinatura
// Uso: node scripts/make-transparent.cjs <entrada.png> <saida.png> [left,top,width,height]
/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require(require.resolve("sharp", { paths: [process.cwd()] }));
const [src, out, crop] = process.argv.slice(2);
(async () => {
  let img = sharp(src);
  if (crop) { const [l, t, w, h] = crop.split(",").map(Number); img = img.extract({ left: l, top: t, width: w, height: h }); }
  const { data, info } = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const lum = Math.min(data[i], data[i + 1], data[i + 2]);
    px[j] = 0x48; px[j + 1] = 0x58; px[j + 2] = 0x3a;
    px[j + 3] = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.25)));
  }
  const m = await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().png().toFile(out);
  console.log(out, m.width, m.height);
})();
