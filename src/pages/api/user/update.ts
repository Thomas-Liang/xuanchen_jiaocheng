import type { APIRoute } from 'astro';
import { getUserByUsername } from '../../../lib/auth';
import db from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, email, oldPassword, newPassword } = body;

    if (email !== undefined) {
      if (!username) {
        return new Response(JSON.stringify({ error: '缺少用户名' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      db.prepare('UPDATE users SET email = ? WHERE username = ?').run(email || null, username);
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (oldPassword && newPassword) {
      if (!username) {
        return new Response(JSON.stringify({ error: '缺少用户名' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const user = getUserByUsername(username);
      if (!user) {
        return new Response(JSON.stringify({ error: '用户不存在' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (user.password !== oldPassword) {
        return new Response(JSON.stringify({ error: '当前密码错误' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      db.prepare('UPDATE users SET password = ? WHERE username = ?').run(newPassword, username);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: '无效的请求' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update user error:', error);
    return new Response(JSON.stringify({ error: '更新失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
