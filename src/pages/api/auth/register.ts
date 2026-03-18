import type { APIRoute } from 'astro';
import { createUser, getUserByUsername } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: '请填写用户名和密码' }), { status: 400 });
    }

    const existing = getUserByUsername(username);
    if (existing) {
      return new Response(JSON.stringify({ error: '用户名已存在' }), { status: 400 });
    }

    createUser(username, password);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '注册失败' }), { status: 500 });
  }
};
