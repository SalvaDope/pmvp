# PMVP — Especificação do Website v1
_Spec para desenvolvimento no Antigravity. Versão 1.0 · 14/11/2026_

---

## 0. Instruções para o agente de desenvolvimento
- Constrói um website institucional e de captação de clientes para a **PMVP**, uma consultora de terrenos e urbanismo na Grande Lisboa.
- Todo o conteúdo é em **português europeu (PT-PT)**. Não usar português do Brasil ("terreno" sim, "lote" só quando correto; "telemóvel", não "celular"; "registo", não "registro").
- Tudo o que está entre `[PARÊNTESES RETOS]` é um marcador a substituir mais tarde. Deixa-o visível e fácil de encontrar.
- Preços, contactos, concelhos e textos legais ficam num **ficheiro de configuração único** (`/src/config/site.ts` ou equivalente), para se mudarem sem mexer no código.
- Prioridades, por ordem: **(1) formulário "Submeter terreno" a funcionar**, (2) páginas Home e Raio-X, (3) restantes páginas, (4) blog.
- Mobile-first. A maioria do tráfego virá de anúncios Google e Meta no telemóvel.

---

## 1. Objetivo do website
1. **Gerar pedidos de Raio-X do Terreno** (produto de entrada pago). É o objetivo principal.
2. Gerar pedidos de **Estudo de Viabilidade**.
3. Captar **parceiros profissionais** (mediadores, advogados, solicitadores, contabilistas).
4. Dar credibilidade técnica: independência, rigor e conhecimento da legislação.

**KPI principal:** número de formulários "Submeter terreno" enviados.

---

## 2. Marca
- **Nome:** PMVP
- **Descritor:** Terrenos & Urbanismo _(alternativa: "Consultoria de Terrenos e Urbanismo")_
  - Evitar "imobiliária" no descritor. O público associa a palavra a mediação, e a PMVP não faz mediação nesta fase.
- **Slogan:** "Descobrimos o potencial. Desenvolvemos o valor."
- **Tom:** sóbrio, claro, técnico sem jargão, confiante sem prometer resultados. Tratar o visitante por "você" ou de forma impessoal; nunca por "tu".

### Paleta (provisória, até haver logo)
| Uso | Cor | Hex |
|---|---|---|
| Primária (verde-pinho) | texto forte, botões, cabeçalho | `#1F3B2D` |
| Fundo claro (pedra) | secções alternadas | `#F2EEE6` |
| Neutro escuro (grafite) | texto corrido | `#2B2B2B` |
| Acento (terracota) | CTAs secundários, destaques | `#B5653A` |
| Linha/borda | divisores | `#D9D3C7` |

### Tipografia (Google Fonts)
- Títulos: **Source Serif 4** (600)
- Texto e interface: **Inter** (400/500/600)

### Imagens
- Fotografia aérea de terrenos rústicos, curvas de nível, excertos de cartografia (ortofotos, plantas de ordenamento estilizadas) e linhas de cadastro.
- Evitar fotos genéricas de "aperto de mão" ou de "casa de sonho".
- Marcadores de imagem: `[IMG: descrição]`.

---

## 3. Stack técnica (recomendada)
- **Framework:** Astro (ou Next.js com exportação estática) + Tailwind CSS.
- **Alojamento:** Vercel ou Netlify; domínio `[DOMÍNIO]`.
- **Formulário:** função serverless que (a) envia e-mail para `[EMAIL_EQUIPA]`, (b) envia e-mail de confirmação ao cliente e (c) grava o pedido numa base simples (Google Sheets via API, Airtable ou Supabase).
- **Mapa no formulário:** Leaflet + OpenStreetMap, com a opção de mudar para a camada de ortofoto (serviço WMS público da DGT). O utilizador larga um pin no terreno e as coordenadas são guardadas.
- **Uploads:** PDF/JPG/PNG, até 10 MB por ficheiro e 3 ficheiros por pedido, em armazenamento privado. Nunca em pasta pública.
- **Pagamentos (fase 2, não construir já):** links de pagamento com Multibanco e MB WAY, enviados depois de validarmos o pedido.
- **Analytics:** GA4 + etiqueta de conversão Google Ads + Meta Pixel. Só disparam depois de consentimento.
- **Consentimento de cookies:** banner conforme o RGPD (aceitar / rejeitar / configurar).
- **Desempenho:** Lighthouse ≥ 90 em todas as categorias no telemóvel. Imagens em WebP/AVIF com lazy loading.
- **Acessibilidade:** WCAG 2.1 AA (contraste, labels nos formulários, navegação por teclado).

---

## 4. Mapa do site
```
/                         Home
/raio-x                   Raio-X do Terreno (produto de entrada)
/estudo-de-viabilidade    Estudo de Viabilidade
/servicos                 Visão geral (Raio-X, Estudo, Estimativa de valor, PIP)
/para-quem/comprar        Vai comprar um terreno
/para-quem/heranca        Herdou um terreno
/para-quem/vender         Quer vender um terreno
/parceiros                Para mediadores, advogados, solicitadores, contabilistas
/como-funciona            Processo passo a passo
/sobre                    Quem somos
/recursos                 Blog / artigos
/recursos/[slug]          Artigo
/submeter-terreno         Formulário principal
/obrigado                 Página de confirmação (conversão)
/privacidade              Política de privacidade
/cookies                  Política de cookies
/termos                   Termos e condições do serviço
```
- **Cabeçalho:** logo · Serviços · Para quem · Como funciona · Recursos · Sobre · botão **"Analisar o meu terreno"** (sempre visível, também no telemóvel).
- **Rodapé:** contactos, links legais, link para o Livro de Reclamações Eletrónico, informação sobre entidades de Resolução Alternativa de Litígios (RAL), `[NIF]`, `[MORADA]`, © PMVP.

---

## 5. Produtos e preços (no ficheiro de configuração)
> Preços para consumidores mostrados **com IVA incluído**. Valores a confirmar.

| ID | Produto | Preço apresentado | Prazo | Notas |
|---|---|---|---|---|
| `raio-x` | Raio-X do Terreno | **190 €** (IVA incl.) `[a confirmar]` | 5 dias úteis | O valor desconta no Estudo de Viabilidade se o cliente avançar em 90 dias |
| `estudo` | Estudo de Viabilidade | **desde 1.190 €** (IVA incl.) `[a confirmar]` | 2–3 semanas | Inclui reunião de entrega |
| `valor` | Estimativa de valor por cenário | **+ 690 €** (IVA incl.) `[a confirmar]` | +1 semana | Extra ao Estudo |
| `pip` | Pedido de Informação Prévia (PIP) | **Sob proposta** | — | Só depois do Estudo |

---

## 6. Conteúdo por página

### 6.1 Home `/`

**Hero**
- H1: **Tem um terreno? Saiba o que pode fazer com ele.**
- Subtítulo: Analisamos o PDM, as condicionantes e o mercado para lhe dizer, com fundamento, se pode construir, para que usos e quanto pode valer o seu terreno.
- CTA principal: **Analisar o meu terreno** → `/submeter-terreno`
- CTA secundário: Ver como funciona → `/como-funciona`
- Linha de confiança: _Grande Lisboa · Análise independente · Relatório técnico com cartografia_
- `[IMG: vista aérea de terreno rústico com linhas de parcela sobrepostas]`

**Secção "As perguntas a que respondemos"** (5 cartões com ícone)
1. É possível construir?
2. Há potencial industrial ou logístico?
3. Que outros usos são permitidos?
4. Se não der para construir, qual o melhor uso agrícola?
5. Qual a melhor estratégia para valorizar o terreno?

**Secção "Comece pelo Raio-X"** (destaque do produto de entrada)
- Título: Raio-X do Terreno — a primeira leitura, em 5 dias úteis
- Texto: Uma análise objetiva da classificação do solo no PDM e das principais condicionantes (RAN, REN, linhas elétricas, servidões, linhas de água), com um semáforo de viabilidade e a nossa recomendação sobre o passo seguinte.
- Preço: **190 €** · _valor descontado no Estudo de Viabilidade_
- CTA: Pedir Raio-X → `/submeter-terreno?produto=raio-x`

**Secção "O que analisamos"** (grelha de 8 itens)
Classificação e qualificação do solo (PDM) · Reserva Agrícola Nacional (RAN) · Reserva Ecológica Nacional (REN) · Linhas elétricas e servidões · Linhas de água e domínio hídrico · Património cultural e marcos geodésicos · Sobreiros, azinheiras e montado · Orografia, declives e exposição solar

**Secção "Para quem"** (4 cartões → páginas de segmento)
- Vai comprar um terreno → "Saiba o que pode construir antes de assinar o CPCV."
- Herdou um terreno → "Perceba o que vale e o que permite antes de partilhar ou vender."
- Quer vender → "Mostre aos compradores o potencial do seu terreno, com fundamento."
- É profissional → "Mediadores, advogados e solicitadores: análises para os seus clientes."

**Secção "Como funciona"** (4 passos)
1. **Submete o terreno** — localização, artigo matricial ou caderneta, e o seu objetivo.
2. **Confirmamos em 24 h úteis** — verificamos se temos a informação necessária e enviamos a proposta.
3. **Analisamos** — PDM, condicionantes, cadastro e, se pedir, o mercado.
4. **Recebe o relatório** — com cartografia, conclusões claras e recomendação do passo seguinte.

**Secção "Porquê a PMVP"** (3 colunas)
- **Independência:** não prometemos potencial construtivo sem fundamento. Se não der, dizemos.
- **Conhecimento técnico:** experiência em gestão fundiária, licenciamento e legislação urbanística atualizada (RJUE, Simplex Urbanístico, regime dos solos).
- **Do estudo à concretização:** se houver viabilidade, acompanhamos o PIP junto da Câmara Municipal.

**Secção FAQ** (5 perguntas, ver 6.10) + CTA final: **Analisar o meu terreno**

---

### 6.2 Raio-X do Terreno `/raio-x`
- H1: **Raio-X do Terreno**
- Subtítulo: A primeira leitura técnica do seu terreno, em 5 dias úteis, por 190 €.
- **O que inclui:**
  - Identificação e localização do terreno (com base nos dados que nos envia)
  - Classificação e qualificação do solo no PDM em vigor
  - Verificação das principais condicionantes: RAN, REN, linhas elétricas, servidões, domínio hídrico, património
  - Semáforo de viabilidade por uso: habitação · indústria/logística · agrícola
  - Recomendação do passo seguinte
  - Relatório PDF de 4–5 páginas com mapa
- **O que não inclui:** leitura detalhada do regulamento do PDM, cálculo de áreas de construção, estimativa de valor e contacto com a Câmara. Estes estão no Estudo de Viabilidade.
- **Bloco de preço:** 190 € (IVA incluído) · Prazo: 5 dias úteis após confirmação e pagamento · O valor é descontado no Estudo de Viabilidade, se avançar em 90 dias.
- CTA: **Pedir Raio-X**
- Aviso (texto pequeno): O Raio-X é uma análise preliminar baseada em informação pública oficial e não substitui a informação prévia ou decisão da Câmara Municipal.

---

### 6.3 Estudo de Viabilidade `/estudo-de-viabilidade`
- H1: **Estudo de Viabilidade**
- Subtítulo: A análise completa para decidir com segurança o que fazer com o terreno.
- **O que inclui:**
  - Tudo o que está no Raio-X
  - Análise do regulamento do PDM e dos parâmetros urbanísticos aplicáveis
  - Sobreposição cartográfica completa de condicionantes (cartas de ordenamento e de condicionantes)
  - Verificação documental: cadastro / BUPi, artigo matricial, registo predial e divergências
  - Cenários possíveis de utilização, com limitações e riscos
  - Recomendação estratégica (PIP, venda, exploração agrícola, outra)
  - Relatório técnico completo + reunião de entrega (presencial ou vídeo)
- **Extra:** Estimativa de valor por cenário (+690 €) — quanto vale hoje o terreno, e quanto pode valer com cada uso viável.
- **Bloco de preço:** desde 1.190 € (IVA incluído) · Prazo: 2–3 semanas · O preço final depende da área, do número de artigos e da complexidade; recebe proposta fechada antes de avançar.
- CTA: **Pedir Estudo de Viabilidade**
- Secção "E depois?": Se o estudo confirmar viabilidade construtiva, preparamos e acompanhamos o **Pedido de Informação Prévia (PIP)** junto da Câmara Municipal, com arquitetos parceiros.

---

### 6.4 Serviços `/servicos`
Grelha com os 4 produtos (Raio-X, Estudo, Estimativa de valor, PIP), cada um com 2 linhas de descrição, preço ou "sob proposta" e link.
- **PIP:** Preparação, submissão e acompanhamento do Pedido de Informação Prévia, com arquitetos parceiros, até à decisão municipal. Disponível depois do Estudo de Viabilidade.

---

### 6.5 Páginas de segmento `/para-quem/*`
Mesma estrutura em todas: H1 orientado ao problema → 3 dores → como ajudamos → produto recomendado → CTA (com `?perfil=` preenchido no formulário).

**Comprar** — H1: **Antes de comprar um terreno, saiba o que pode construir.**
- Dores: anúncios que prometem "viabilidade" sem fundamento · condicionantes descobertas depois da escritura · pagar preço de urbano por um terreno rústico
- Recomendado: Raio-X antes da visita, Estudo antes do CPCV

**Herança** — H1: **Herdou um terreno? Perceba o que tem antes de decidir.**
- Dores: documentação desatualizada ou divergente · herdeiros com opiniões diferentes sobre o valor · não saber se vale a pena vender, construir ou manter
- Recomendado: Estudo de Viabilidade + Estimativa de valor

**Vender** — H1: **Mostre o verdadeiro potencial do seu terreno.**
- Dores: compradores que desvalorizam por falta de informação · negociação sem argumentos técnicos · terreno parado no mercado
- Recomendado: Estudo de Viabilidade (pode ser apresentado aos compradores)

---

### 6.6 Parceiros `/parceiros`
- H1: **Para profissionais: análises de terrenos para os seus clientes.**
- Para quem: mediadores imobiliários, advogados, solicitadores, contabilistas, gestores de património.
- Benefícios: condições de parceiro em packs de análises · relatórios com linguagem clara para o cliente final · resposta rápida
- Formulário curto: nome, empresa, profissão, e-mail, telemóvel, n.º estimado de terrenos/ano, mensagem.
- Os valores de parceiro **não** aparecem no site: "Condições sob contacto".

---

### 6.7 Como funciona `/como-funciona`
Versão longa dos 4 passos da Home, mais:
- **Que documentos devo ter?** Caderneta predial, certidão do registo predial (ou código da certidão permanente), localização no mapa. "Se não tiver, ajudamos a obter."
- **De onde vem a informação?** Fontes oficiais: PDM e cartas municipais, Direção-Geral do Território (cadastro, cartas de uso do solo), BUPi, entidades da RAN e da REN, entre outras.
- **Prazos e pagamento:** pagamento antes do início; prazos contam após a confirmação.

---

### 6.8 Sobre `/sobre`
- H1: **Quem somos**
- Texto: A PMVP nasceu para responder a uma pergunta simples que tem respostas complexas: o que se pode fazer com um terreno? Juntamos conhecimento técnico de gestão fundiária e licenciamento com uma abordagem clara e independente.
- Sócios (2 cartões com foto, nome, papel e bio curta):
  - **Francisco Monteiro** — Direção técnica. `[BIO: experiência em gestão fundiária, condicionantes e licenciamento]`
  - **Salvador Vaz Pinto** — Direção comercial e operações. `[BIO]`
- Valores: Independência · Rigor · Clareza · Concretização

---

### 6.9 Submeter terreno `/submeter-terreno` ⭐ (componente principal)
Formulário em **passos** (barra de progresso), com rascunho guardado em memória até ao envio.

**Passo 1 — Quem é**
- Perfil (obrigatório, opção única): Proprietário · Vou comprar · Herdeiro · Profissional (mediador/advogado/solicitador/outro)
- Pré-preenchido a partir de `?perfil=`

**Passo 2 — O terreno**
- Concelho (obrigatório, lista): `[CONCELHOS_PILOTO]` + "Outro" (campo de texto)
- Freguesia (texto)
- Localização (obrigatório pelo menos um): pin no mapa (Leaflet, com alternância rua/ortofoto) **ou** morada/descrição **ou** coordenadas
- Artigo matricial (opcional) · Área aproximada em m² ou ha (opcional)
- Upload de documentos (opcional): caderneta, certidão, plantas — PDF/JPG/PNG, até 10 MB cada, máx. 3

**Passo 3 — O objetivo**
- O que pretende (escolha múltipla): Construir habitação · Indústria/logística · Uso agrícola · Vender · Comprar · Ainda não sei
- Serviço pretendido (opção única): Raio-X (190 €) · Estudo de Viabilidade (desde 1.190 €) · Não sei, quero aconselhamento
- Pré-preenchido a partir de `?produto=`
- Observações (texto livre, máx. 1.000 caracteres)

**Passo 4 — Contactos**
- Nome* · E-mail* · Telemóvel* · Preferência de contacto (e-mail/telefone/WhatsApp)
- Checkbox obrigatória: "Li e aceito a Política de Privacidade" (link)
- Checkbox opcional: "Aceito receber comunicações da PMVP"
- Botão: **Enviar pedido**

**Depois do envio**
1. Redireciona para `/obrigado` (dispara as conversões GA4/Ads/Meta).
2. E-mail interno para `[EMAIL_EQUIPA]` com todos os dados, link do pin no mapa (Google Maps + coordenadas) e anexos.
3. E-mail automático ao cliente: "Recebemos o seu pedido. Vamos confirmar em até 24 horas úteis se temos a informação necessária e enviar a proposta e os dados de pagamento."
4. Linha nova na base de pedidos, com ID (`PMVP-AAAA-0001`), data, estado = "Novo".

**Validações:** e-mail válido; telemóvel PT (+351, 9 dígitos) ou internacional; tipos e tamanhos de ficheiro; proteção anti-spam (honeypot + Cloudflare Turnstile ou reCAPTCHA v3).

---

### 6.10 FAQ (Home + página própria opcional, com schema FAQPage)
1. **O Raio-X diz-me se posso construir?** Dá-lhe uma primeira leitura fundamentada: em que solo está o terreno, que condicionantes tem e se a viabilidade parece favorável, condicionada ou desfavorável. A confirmação formal só a Câmara a pode dar, através de um PIP.
2. **Os vossos estudos substituem a Câmara Municipal?** Não. Baseiam-se em informação oficial e na legislação em vigor, mas não são uma decisão vinculativa. Servem para decidir com conhecimento e preparar bem o passo seguinte.
3. **E se o terreno não tiver cadastro?** Trabalhamos com o BUPi e com a documentação que tiver. Se for preciso levantamento topográfico, indicamos o custo antes de avançar.
4. **Trabalham fora da Grande Lisboa?** O nosso foco são `[CONCELHOS_PILOTO]`, mas analisamos pedidos de outras zonas caso a caso.
5. **O que acontece se o terreno for viável?** Recomendamos o passo seguinte, normalmente um PIP, e podemos acompanhá-lo com arquitetos parceiros.
6. **Fazem avaliações para o banco?** Não. A nossa estimativa de valor é um estudo de mercado para apoio à decisão, não uma avaliação bancária.

---

### 6.11 Recursos `/recursos` (blog)
Listagem com categoria, data e tempo de leitura. Artigos iniciais (a escrever; criar com texto marcador):
1. Posso construir num terreno rústico? O que diz a lei
2. RAN e REN explicadas: o que são e como afetam o seu terreno
3. O que é um PIP e quando vale a pena pedi-lo
4. Lei dos solos: reclassificação de rústico para urbano, em linguagem simples
5. Como consultar o PDM do seu concelho
6. Terreno sem cadastro? O que é o BUPi e como funciona
7. Comprar um terreno: 7 verificações antes do CPCV
8. Herdei um terreno: por onde começar

Cada artigo termina com um CTA para o Raio-X.

---

### 6.12 Páginas legais
- `/privacidade`: responsável pelo tratamento `[ENTIDADE, NIF, MORADA]`; finalidades (resposta a pedidos, prestação do serviço, marketing com consentimento); prazos de conservação; direitos dos titulares; contacto `[EMAIL_PRIVACIDADE]`; subcontratantes (alojamento, e-mail, analytics).
- `/cookies`: lista de cookies por categoria; gestão do consentimento.
- `/termos`: natureza informativa dos estudos (não vinculativos); prazos; pagamento antecipado; política de crédito do Raio-X; limitação de responsabilidade; foro.
- **Marcadores de texto, a validar por um advogado antes de publicar.**

---

## 7. SEO
- `<title>` e meta description únicos por página. Exemplos:
  - Home: "PMVP | Viabilidade de terrenos e urbanismo na Grande Lisboa"
  - Raio-X: "Raio-X do Terreno — saiba o que pode construir | PMVP"
- Schema.org: `ProfessionalService` (área servida = concelhos-piloto), `Service` para cada produto, `FAQPage`, `Article` no blog.
- `sitemap.xml`, `robots.txt`, URLs canónicos, Open Graph e Twitter cards (imagem 1200×630 por página).
- Palavras-chave a cobrir: viabilidade de terreno, construir em terreno rústico, terreno RAN, terreno REN, PIP câmara, consultar PDM, terreno para construir + [concelho].

## 8. Eventos de analytics
`cta_click` (local, produto) · `form_start` · `form_step` (n.º) · `form_submit` (produto, perfil, concelho) · `partner_form_submit` · `file_upload`

## 9. Critérios de aceitação (v1)
- [ ] Formulário de 4 passos funciona no telemóvel e no desktop, com pin no mapa e upload
- [ ] E-mail interno e e-mail de confirmação chegam corretamente
- [ ] Pedido gravado na base com ID único
- [ ] Parâmetros `?perfil=` e `?produto=` preenchem o formulário
- [ ] Banner de cookies bloqueia analytics até haver consentimento
- [ ] Preços e contactos editáveis apenas no ficheiro de configuração
- [ ] Lighthouse mobile ≥ 90; sem erros de acessibilidade críticos
- [ ] Rodapé com links legais, Livro de Reclamações e informação RAL
- [ ] Todos os textos em PT-PT

## 10. Marcadores a preencher
`[DOMÍNIO]` · `[EMAIL_EQUIPA]` · `[EMAIL_PRIVACIDADE]` · `[TELEFONE]` · `[NIF]` · `[MORADA]` · `[ENTIDADE]` · `[CONCELHOS_PILOTO]` · `[BIO]` · fotos dos sócios · logo (SVG)
