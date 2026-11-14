import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE_CONFIG } from '../../config/site';

export const prerender = false;

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
]);

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png']);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 3;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s().-]/g, '');
  // Telemóvel/telefone PT (+351 opcional + 9 dígitos começando por 2, 3 ou 9) ou internacional (+ seguido de 7 a 15 dígitos)
  const ptRegex = /^(\+351|00351)?[239]\d{8}$/;
  const intlRegex = /^\+[1-9]\d{6,14}$/;
  return ptRegex.test(cleaned) || intlRegex.test(cleaned);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
}

async function getNextOrderId(dataDir: string): Promise<string> {
  const year = new Date().getFullYear();
  const dbPath = path.join(dataDir, 'pedidos.json');
  let existing: Array<{ id?: string }> = [];
  try {
    const raw = await fs.readFile(dbPath, 'utf-8');
    existing = JSON.parse(raw);
    if (!Array.isArray(existing)) existing = [];
  } catch {
    existing = [];
  }
  const nextNumber = existing.length + 1;
  return `PMVP-${year}-${String(nextNumber).padStart(4, '0')}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // 1. Proteção Anti-Spam (Honeypot)
    const honeypot = String(formData.get('website_url_hp') || '').trim();
    if (honeypot !== '') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Submissão bloqueada pelo filtro anti-spam.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Extração de campos
    const perfil = String(formData.get('perfil') || '').trim();
    const concelhoSelect = String(formData.get('concelho') || '').trim();
    const concelhoOutro = String(formData.get('concelho_outro') || '').trim();
    const concelho = concelhoSelect === 'Outro' ? concelhoOutro || 'Outro' : concelhoSelect;
    const freguesia = String(formData.get('freguesia') || '').trim();
    const coordenadas = String(formData.get('coordenadas') || '').trim();
    const morada = String(formData.get('morada') || '').trim();
    const artigoMatricial = String(formData.get('artigo_matricial') || '').trim();
    const areaValor = String(formData.get('area_valor') || '').trim();
    const areaUnidade = String(formData.get('area_unidade') || 'm2').trim();
    const objetivos = formData.getAll('objetivos').map((v) => String(v).trim()).filter(Boolean);
    const servico = String(formData.get('servico') || '').trim();
    const observacoes = String(formData.get('observacoes') || '').trim().slice(0, 1000);
    const nome = String(formData.get('nome') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const telemovel = String(formData.get('telemovel') || '').trim();
    const preferenciaContacto = String(formData.get('preferencia_contacto') || 'email').trim();
    const aceitaPrivacidade = formData.get('aceita_privacidade') === 'on' || formData.get('aceita_privacidade') === 'true';
    const aceitaMarketing = formData.get('aceita_marketing') === 'on' || formData.get('aceita_marketing') === 'true';

    // 3. Validações obrigatórias
    if (!perfil) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor, selecione o seu perfil no Passo 1.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!concelho) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor, indique o concelho do terreno no Passo 2.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!coordenadas && !morada) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Por favor, indique a localização do terreno (pin no mapa, coordenadas ou morada/descrição).',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!servico) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor, selecione o serviço pretendido no Passo 3.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!nome || !email || !telemovel) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor, preencha o seu nome, e-mail e telemóvel.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Por favor, introduza um endereço de e-mail válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidPhone(telemovel)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Por favor, introduza um número de telemóvel português válido (9 dígitos) ou internacional (+...).',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!aceitaPrivacidade) {
      return new Response(
        JSON.stringify({ ok: false, error: 'É necessário aceitar a Política de Privacidade para enviar o pedido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Validação de ficheiros (PDF/JPG/PNG, máx. 10 MB por ficheiro, máx. 3 ficheiros)
    const rawFiles = formData.getAll('documentos');
    const validFiles: File[] = [];

    for (const item of rawFiles) {
      if (item instanceof File && item.size > 0) {
        validFiles.push(item);
      }
    }

    if (validFiles.length > MAX_FILES) {
      return new Response(
        JSON.stringify({ ok: false, error: `Pode anexar no máximo ${MAX_FILES} ficheiros por pedido.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    for (const file of validFiles) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(file.type) && !ALLOWED_EXTENSIONS.has(ext)) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: `O ficheiro "${file.name}" tem um formato não suportado. Apenas são aceites ficheiros PDF, JPG ou PNG.`,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: `O ficheiro "${file.name}" excede o tamanho máximo de 10 MB.`,
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 5. Criação de ID único e armazenamento privado (.data/ fora da pasta public/, ou /tmp/.data em serverless Vercel)
    const dataDir = process.env.VERCEL
      ? path.join('/tmp', '.data')
      : path.resolve(process.cwd(), '.data');
    await fs.mkdir(dataDir, { recursive: true });

    const orderId = await getNextOrderId(dataDir);
    const uploadDir = path.join(dataDir, 'uploads', orderId);

    const savedAttachments: Array<{
      originalName: string;
      storedName: string;
      privatePath: string;
      sizeBytes: number;
      mimeType: string;
    }> = [];

    if (validFiles.length > 0) {
      await fs.mkdir(uploadDir, { recursive: true });
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const safeName = `${i + 1}_${sanitizeFilename(file.name)}`;
        const destPath = path.join(uploadDir, safeName);
        const arrayBuffer = await file.arrayBuffer();
        await fs.writeFile(destPath, Buffer.from(arrayBuffer));
        savedAttachments.push({
          originalName: file.name,
          storedName: safeName,
          privatePath: `.data/uploads/${orderId}/${safeName}`,
          sizeBytes: file.size,
          mimeType: file.type || 'application/octet-stream',
        });
      }
    }

    // 6. Construção do link Google Maps a partir das coordenadas
    const googleMapsUrl = coordenadas
      ? `https://www.google.com/maps?q=${encodeURIComponent(coordenadas.replace(/\s+/g, ''))}`
      : null;

    const createdAt = new Date().toISOString();

    const novoPedido = {
      id: orderId,
      data: createdAt,
      estado: 'Novo',
      perfil,
      terreno: {
        concelho,
        freguesia: freguesia || null,
        coordenadas: coordenadas || null,
        googleMapsUrl,
        morada: morada || null,
        artigoMatricial: artigoMatricial || null,
        area: areaValor ? `${areaValor} ${areaUnidade}` : null,
      },
      objetivo: {
        pretende: objetivos,
        servicoPretendido: servico,
        observacoes: observacoes || null,
      },
      contacto: {
        nome,
        email,
        telemovel,
        preferenciaContacto,
        aceitaPrivacidade,
        aceitaMarketing,
      },
      anexosPrivados: savedAttachments,
    };

    // 7. Gravação na base de pedidos (.data/pedidos.json)
    const dbPath = path.join(dataDir, 'pedidos.json');
    let pedidos: unknown[] = [];
    try {
      const existingRaw = await fs.readFile(dbPath, 'utf-8');
      pedidos = JSON.parse(existingRaw);
      if (!Array.isArray(pedidos)) pedidos = [];
    } catch {
      pedidos = [];
    }
    pedidos.push(novoPedido);
    await fs.writeFile(dbPath, JSON.stringify(pedidos, null, 2), 'utf-8');

    // 8. Preparação e envio dos 2 e-mails (Interno para [EMAIL_EQUIPA] + Confirmação ao Cliente)
    const internalEmail = {
      to: SITE_CONFIG.contact.teamEmail,
      subject: `[Novo Pedido ${orderId}] ${servico.toUpperCase()} — ${concelho} (${nome})`,
      bodyText: [
        `Novo pedido submetido no website PMVP`,
        `----------------------------------------`,
        `ID do Pedido: ${orderId}`,
        `Data: ${createdAt}`,
        `Estado: Novo`,
        ``,
        `1. QUEM É`,
        `- Perfil: ${perfil}`,
        ``,
        `2. O TERRENO`,
        `- Concelho: ${concelho}`,
        `- Freguesia: ${freguesia || 'Não indicada'}`,
        `- Coordenadas (Pin): ${coordenadas || 'Não indicadas'}`,
        `- Link Google Maps: ${googleMapsUrl || 'Não aplicável'}`,
        `- Morada / Descrição: ${morada || 'Não indicada'}`,
        `- Artigo Matricial: ${artigoMatricial || 'Não indicado'}`,
        `- Área Aproximada: ${areaValor ? `${areaValor} ${areaUnidade}` : 'Não indicada'}`,
        `- Anexos (${savedAttachments.length}): ${
          savedAttachments.map((a) => `${a.originalName} (${Math.round(a.sizeBytes / 1024)} KB)`).join(', ') || 'Nenhum'
        }`,
        ``,
        `3. OBJETIVO`,
        `- O que pretende: ${objetivos.join(', ') || 'Não especificado'}`,
        `- Serviço pretendido: ${servico}`,
        `- Observações: ${observacoes || 'Sem observações'}`,
        ``,
        `4. CONTACTOS DO CLIENTE`,
        `- Nome: ${nome}`,
        `- E-mail: ${email}`,
        `- Telemóvel: ${telemovel}`,
        `- Preferência de contacto: ${preferenciaContacto}`,
        `- Marketing aceite: ${aceitaMarketing ? 'Sim' : 'Não'}`,
      ].join('\n'),
    };

    const clientConfirmationEmail = {
      to: email,
      subject: `Recebemos o seu pedido (${orderId}) — PMVP Terrenos & Urbanismo`,
      bodyText: [
        `Olá ${nome},`,
        ``,
        `Recebemos o seu pedido. Vamos confirmar em até 24 horas úteis se temos a informação necessária e enviar a proposta e os dados de pagamento.`,
        ``,
        `Resumo do seu pedido:`,
        `- Referência: ${orderId}`,
        `- Concelho: ${concelho}`,
        `- Serviço selecionado: ${servico}`,
        ``,
        `Melhores cumprimentos,`,
        `Equipa PMVP — Terrenos & Urbanismo`,
        `${SITE_CONFIG.contact.teamEmail} · ${SITE_CONFIG.contact.domain}`,
      ].join('\n'),
    };

    // Regista os e-mails na outbox privada (.data/emails-outbox.json) e envia por API caso RESEND_API_KEY esteja definida
    const outboxPath = path.join(dataDir, 'emails-outbox.json');
    let outbox: unknown[] = [];
    try {
      const rawOutbox = await fs.readFile(outboxPath, 'utf-8');
      outbox = JSON.parse(rawOutbox);
      if (!Array.isArray(outbox)) outbox = [];
    } catch {
      outbox = [];
    }
    outbox.push({
      orderId,
      sentAt: createdAt,
      internalEmail,
      clientConfirmationEmail,
    });
    await fs.writeFile(outboxPath, JSON.stringify(outbox, null, 2), 'utf-8');

    // Webhook opcional (Google Sheets / Airtable / Supabase / Make / Zapier)
    const webhookUrl = process.env.PMVP_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoPedido),
        });
      } catch (err) {
        console.error('Erro ao enviar para webhook externo:', err);
      }
    }

    const redirectUrl = `/obrigado?id=${encodeURIComponent(orderId)}&produto=${encodeURIComponent(
      servico
    )}&perfil=${encodeURIComponent(perfil)}&concelho=${encodeURIComponent(concelho)}`;

    const acceptHeader = request.headers.get('accept') || '';
    if (acceptHeader.includes('application/json')) {
      return new Response(
        JSON.stringify({
          ok: true,
          id: orderId,
          redirectUrl,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return Response.redirect(new URL(redirectUrl, request.url), 303);
  } catch (error) {
    console.error('Erro ao processar submissão de terreno:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Ocorreu um erro técnico ao processar o seu pedido. Por favor, tente novamente.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
