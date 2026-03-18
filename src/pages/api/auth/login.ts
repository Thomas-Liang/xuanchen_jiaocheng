import type { APIRoute } from 'astro';
import { getUserByUsername } from '../../../lib/auth';

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

    console.log('Login attempt:', username);

    if (!username || !password) {
      return new Response(JSON.stringify({ error: '请填写用户名和密码' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const user = getUserByUsername(username);
    console.log('User found:', user);
    
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: '用户名或密码错误' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      user: { id: user.id, username: user.username, email: user.email }
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: '登录失败: ' + String(error) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
