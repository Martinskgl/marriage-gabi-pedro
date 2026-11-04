# marriage-gabi-pedro

Site do casamento de Gabi & Pedro — 26.06.2027, Rio de Janeiro.
Feito em Next.js (App Router), em português (`/pt`) e inglês (`/en`).

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000 (redireciona para `/pt`).

## Onde editar

| O quê | Onde |
| --- | --- |
| Todos os textos, links, fotos, vídeo e música | `src/data/site.ts` |
| Cores, espaçamentos e estilos | `src/app/globals.css` (tokens em `:root`) |
| Fontes | `src/app/fonts.ts` |
| Seções | `src/components/Sections.tsx` |

### Fotos

Toda imagem no `site.ts` tem `width` e `height`. Sem `src`, ela aparece como placeholder com esse tamanho.
Para usar uma foto real, coloque o arquivo em `public/photos/` e preencha `src: "/photos/nome.jpg"`.

### Vídeo

Coloque o arquivo em `public/video/` e preencha `video.src` no `site.ts`. A música pausa quando o vídeo começa.

O vídeo atual (`public/video/nosso-video.mov`) está em HEVC (H.265), que não toca no Firefox nem em parte dos
computadores Windows. Para funcionar em todos os navegadores, converta para MP4 H.264 (por exemplo no HandBrake,
preset "Fast 1080p30" com "Web Optimized" marcado), salve como `public/video/nosso-video.mp4` e troque `video.src`.
`video.posterTime` define o segundo mostrado antes do play.

### Música

Coloque o arquivo em `public/music/nossa-musica.mp3` (ou altere `music.src`). Enquanto o arquivo não existir,
o botão do player fica desabilitado.

### Fontes

Slight e TAN Garland são pagas; hoje usamos Pinyon Script e Italiana como substitutas.
Para trocar, coloque os arquivos em `src/fonts/` e siga o comentário em `src/app/fonts.ts`.
A CMU Serif já é a original.

### Identidade visual

Os arquivos em `public/brand/` vêm do atelier (monograma, selos, letterings, save the date).
`monogram-transparent.png` e `monogram-initials.png` foram gerados a partir de `monogram.png` com
`node scripts/make-transparent.cjs`.
