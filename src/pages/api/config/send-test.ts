import type { APIRoute } from 'astro';
import { sendEmail } from '../../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return new Response(JSON.stringify({ error: '缺少参数' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const success = await sendEmail({ to, subject, html });

    if (success) {
      return new Response(JSON.stringify({ success: true }));
    } else {
      return new Response(JSON.stringify({ error: 'SMTP 未配置或配置错误' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Send test email error:', error);
    return new Response(JSON.stringify({ error: '发送失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
