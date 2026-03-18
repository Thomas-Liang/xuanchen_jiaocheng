import type { APIRoute } from 'astro';
import { addFavorite, removeFavorite, isFavorited, getUserFavorites } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const tutorialSlug = formData.get('slug')?.toString();
    const username = formData.get('username')?.toString();
    const action = formData.get('action')?.toString();

    if (!tutorialSlug || !username) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    if (action === 'remove') {
      removeFavorite(tutorialSlug, username);
    } else {
      addFavorite(tutorialSlug, username);
    }

    const favorited = isFavorited(tutorialSlug, username);
    return new Response(JSON.stringify({ success: true, favorited }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '操作失败' }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const username = url.searchParams.get('username');
    if (!username) {
      return new Response(JSON.stringify({ error: '缺少 username 参数' }), { status: 400 });
    }

    const favorites = getUserFavorites(username);
    return new Response(JSON.stringify({ favorites }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取收藏失败' }), { status: 500 });
  }
};
