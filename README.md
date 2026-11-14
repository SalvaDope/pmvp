# PMVP — Terrenos & Urbanismo (Website v1)

Website institucional e de captação de clientes para a **PMVP — Terrenos & Urbanismo** (Grande Lisboa), desenvolvido de acordo com a especificação `PMVP-website-spec.md`.

## Como executar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (http://localhost:4321)
npm run dev

# Gerar build de produção
npm run build
```

## Configuração Centralizada (`/src/config/site.ts`)

Todos os preços, prazos, contactos, concelhos-piloto, dados dos sócios, FAQs, artigos do blog, textos legais e IDs de analytics encontram-se num único ficheiro:
- [`src/config/site.ts`](./src/config/site.ts)

## Marcadores a substituir antes de publicar

Procure no ficheiro `src/config/site.ts` pelos marcadores entre parênteses retos:
- `[DOMÍNIO]`
- `[EMAIL_EQUIPA]`
- `[EMAIL_PRIVACIDADE]`
- `[TELEFONE]`
- `[NIF]`
- `[MORADA]`
- `[ENTIDADE]`
- `[CONCELHOS_PILOTO]`
- `[BIO]` / `[BIO: experiência em gestão fundiária, condicionantes e licenciamento]`
- `[a confirmar]` (preços)
- `[IMG: ...]` (fotografias dos sócios e cartografia real)
- `[TEXTO MARCADOR — A VALIDAR POR UM ADVOGADO ANTES DE PUBLICAR]`

## Submissões de Terrenos e Armazenamento Privado

- O endpoint `/api/submeter-terreno` valida os campos, gera um ID sequencial (`PMVP-AAAA-0001`), guarda os ficheiros enviados (PDF/JPG/PNG até 10 MB, máx. 3) na pasta privada `.data/uploads/<ID>/` (fora de `public/`), regista o pedido em `.data/pedidos.json` e prepara os e-mails interno e de confirmação em `.data/emails-outbox.json`.
- Para ligar a uma base externa (Google Sheets, Airtable, Supabase ou Make/Zapier), basta definir a variável de ambiente `PMVP_WEBHOOK_URL`.
