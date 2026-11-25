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

### Painel /admin e lista de presentes (wedding-adm)

O painel do projeto [wedding-adm](https://github.com/Martinskgl/wedding-adm) fica em `/admin` (login em `/login`).
Nele vocês cadastram os presentes e acompanham os pedidos. Os presentes **ativos** aparecem na seção
"Lista de presentes" do site; quando um convidado escolhe um presente e informa nome e e-mail, o pedido entra
no painel como **Pendente** e aparecem os botões do PayPal. Quando o PayPal confirma o pagamento, o pedido
vira **Pago** sozinho.

- Arquivos do painel: `src/app/(painel)` (layout e Tailwind próprios, sem afetar o site), `src/actions`,
  `src/services`, `src/views`, `src/components/common`, `src/components/ui`, `src/auth.config.ts`.
- Proteção: `src/proxy.ts` bloqueia `/admin` sem login de administrador e todas as ações exigem login
  (`src/lib/auth.ts`).
- Banco: `prisma/schema.prisma` e `prisma/migrations`.

**Configuração**

1. Variáveis: copie `.env.example` para `.env.local` e preencha. Na Vercel, cadastre as mesmas variáveis
   (`NEXTAUTH_URL` = endereço do site, por exemplo `https://marriage-gabi-pedro.vercel.app`).
2. Tabelas (só na primeira vez ou quando houver migration nova):
   ```bash
   node --env-file=.env.local node_modules/prisma/build/index.js migrate deploy
   ```
3. Criar o administrador (a senha é pedida no terminal):
   ```bash
   node --env-file=.env.local scripts/criar-admin.mjs email@exemplo.com "Nome"
   ```
4. No painel, ao cadastrar um presente, marque **Ativo** para ele aparecer no site.

**PayPal**

- Chaves em developer.paypal.com > Apps & Credentials: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` e
  `PAYPAL_ENV` (`sandbox` para teste, `live` para valer). Sem o Client ID, a lista funciona sem pagamento.
- O valor cobrado é sempre o do banco, em reais. O site só marca **Pago** depois de confirmar com o PayPal
  que o valor e a moeda batem (`src/app/api/presentes/paypal`).
- Na Vercel, depois de cadastrar ou trocar as variáveis, faça um novo deploy (o Client ID entra no build).

### Fontes

Slight e TAN Garland são pagas; hoje usamos Pinyon Script e Italiana como substitutas.
Para trocar, coloque os arquivos em `src/fonts/` e siga o comentário em `src/app/fonts.ts`.
A CMU Serif já é a original.

### Identidade visual

Os arquivos em `public/brand/` vêm do atelier (monograma, selos, letterings, save the date).
`monogram-transparent.png` e `monogram-initials.png` foram gerados a partir de `monogram.png` com
`node scripts/make-transparent.cjs`.
