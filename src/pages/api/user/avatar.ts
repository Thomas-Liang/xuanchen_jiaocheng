import type { APIRoute } from 'astro';
import { getUserAvatar } from '../../../lib/auth';
import { getAvatarUrl } from '../../../lib/avatar';

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: '缺少用户名参数' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const avatar = getUserAvatar(username);
    const avatarUrl = getAvatarUrl(username, avatar);

    return new Response(JSON.stringify({ 
      username,
      avatar: avatarUrl,
      hasCustomAvatar: !!avatar
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get avatar error:', error);
    return new Response(JSON.stringify({ error: '获取头像失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
