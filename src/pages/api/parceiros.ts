import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE_CONFIG } from '../../config/site';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Honeypot anti-spam
    const honeypot = String(formData.get('company_website_hp') || '').trim();
    if (honeypot !== '') {
      return new Response(JSON.stringify({ ok: false, error: 'Submissão inválida.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const nome = String(formData.get('nome') || '').trim();
    const empresa = String(formData.get('empresa') || '').trim();
    const profissao = String(formData.get('profissao') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const telemovel = String(formData.get('telemovel') || '').trim();
    const terrenosAno = String(formData.get('terrenos_ano') || '').trim();
    const mensagem = String(formData.get('mensagem') || '').trim();

    if (!nome || !profissao || !email || !telemovel) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Por favor, preencha o nome, profissão, e-mail e telemóvel.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const dataDir = process.env.VERCEL
      ? path.join('/tmp', '.data')
      : path.resolve(process.cwd(), '.data');
    await fs.mkdir(dataDir, { recursive: true });
    const dbPath = path.join(dataDir, 'parceiros.json');

    let parceiros: unknown[] = [];
    try {
      const raw = await fs.readFile(dbPath, 'utf-8');
      parceiros = JSON.parse(raw);
      if (!Array.isArray(parceiros)) parceiros = [];
    } catch {
      parceiros = [];
    }

    const partnerId = `PARCEIRO-${new Date().getFullYear()}-${String(parceiros.length + 1).padStart(4, '0')}`;
    const registo = {
      id: partnerId,
      data: new Date().toISOString(),
      estado: 'Novo Contacto Parceiro',
      nome,
      empresa: empresa || null,
      profissao,
      email,
      telemovel,
      terrenosAno: terrenosAno || null,
      mensagem: mensagem || null,
      destinatarioInterno: SITE_CONFIG.contact.teamEmail,
    };

    parceiros.push(registo);
    await fs.writeFile(dbPath, JSON.stringify(parceiros, null, 2), 'utf-8');

    return new Response(
      JSON.stringify({
        ok: true,
        id: partnerId,
        message: 'Pedido de parceria recebido. Entraremos em contacto brevemente.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Erro no formulário de parceiros:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Erro ao enviar o formulário. Tente novamente.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
