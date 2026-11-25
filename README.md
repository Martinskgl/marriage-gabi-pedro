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

### Vídeo da capa

`hero.video` no `site.ts` aponta para `public/video/capa.mov` (P&B, em loop, no lugar da foto). Ele abre sem som,
porque os navegadores não permitem autoplay com som; o áudio liga no primeiro clique, toque ou tecla. O botão no canto
inferior direito liga e desliga o som.

O arquivo está em HEVC (H.265), que não toca no Firefox nem em parte dos computadores Windows. Para funcionar em
todos os navegadores, converta para MP4 H.264 (por exemplo no HandBrake, preset "Fast 1080p30" com "Web Optimized"
marcado), salve em `public/video/` e troque `hero.video`.

### Seções ocultas

A semana, Em movimento, Viagem e Transporte estão fora da página nesta versão (veja `src/app/[lang]/page.tsx`).
O conteúdo continua no `site.ts` para voltar quando houver informação.

### Mensagens dos convidados (Google Sheets + Apps Script)

O formulário "Deixe sua mensagem" grava cada mensagem numa planilha do Google de vocês. É grátis e sem limite
prático de mensagens. Configuração (uma vez só):

1. Crie uma planilha no Google Sheets (por exemplo "Mensagens do casamento").
2. Na planilha, abra **Extensões > Apps Script**. Apague o que estiver no editor e cole o conteúdo de
   `scripts/google-apps-script/mensagens.gs`. Salve.
3. Clique em **Implantar > Nova implantação**. Em "Selecione o tipo", escolha **App da Web** e configure:
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e autorize o acesso com a conta Google de vocês (o Google avisa que o app não é
   verificado: clique em "Avançado" e depois em "Acessar").
5. Copie a **URL do app da Web** (termina em `/exec`) e cole em `guestbook.endpoint` no `src/data/site.ts`.

As mensagens aparecem na aba "Mensagens" da planilha, com data, nome, mensagem e idioma. Se o script for alterado,
publique de novo em **Implantar > Gerenciar implantações > Editar > Nova versão**, mantendo a mesma URL.

### Fontes

Slight e TAN Garland são pagas; hoje usamos Pinyon Script e Italiana como substitutas.
Para trocar, coloque os arquivos em `src/fonts/` e siga o comentário em `src/app/fonts.ts`.
A CMU Serif já é a original.

### Identidade visual

Os arquivos em `public/brand/` vêm do atelier (monograma, selos, letterings, save the date).
`monogram-transparent.png` e `monogram-initials.png` foram gerados a partir de `monogram.png` com
`node scripts/make-transparent.cjs`.
