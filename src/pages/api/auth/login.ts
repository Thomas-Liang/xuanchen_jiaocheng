import type { APIRoute } from 'astro';
import { getUserByUsername } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: '请填写用户名和密码' }), { status: 400 });
    }

    const user = getUserByUsername(username);
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: '用户名或密码错误' }), { status: 401 });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      user: { id: user.id, username: user.username, email: user.email }
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '登录失败' }), { status: 500 });
  }
};
