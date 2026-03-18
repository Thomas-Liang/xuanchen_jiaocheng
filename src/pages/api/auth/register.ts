import type { APIRoute } from 'astro';
import { createUser, getUserByUsername } from '../../../lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
      return new Response(JSON.stringify({ error: '请填写用户名和密码' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const existing = getUserByUsername(username);
    if (existing) {
      return new Response(JSON.stringify({ error: '用户名已存在' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    createUser(username, password);
    return new Response(JSON.stringify({ success: true }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '注册失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
