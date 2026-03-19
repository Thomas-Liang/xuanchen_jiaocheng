import type { APIRoute } from 'astro';
import { addFavorite, removeFavorite, isFavorited, getUserFavorites } from '../../../lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let tutorialSlug = '';
    let username = '';
    let action = '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      tutorialSlug = formData.get('slug')?.toString() || '';
      username = formData.get('username')?.toString() || '';
      action = formData.get('action')?.toString() || '';
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      tutorialSlug = body.slug || '';
      username = body.username || '';
      action = body.action || '';
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      tutorialSlug = formData.get('slug')?.toString() || '';
      username = formData.get('username')?.toString() || '';
      action = formData.get('action')?.toString() || '';
    } else {
      return new Response(JSON.stringify({ error: '不支持的Content-Type' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (!tutorialSlug || !username) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'remove') {
      removeFavorite(tutorialSlug, username);
    } else {
      addFavorite(tutorialSlug, username);
    }

    const favorited = isFavorited(tutorialSlug, username);
    return new Response(JSON.stringify({ success: true, favorited }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Favorite error:', error);
    return new Response(JSON.stringify({ error: '操作失败: ' + String(error) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const username = url.searchParams.get('username');
    if (!username) {
      return new Response(JSON.stringify({ error: '缺少 username 参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const favorites = getUserFavorites(username);
    return new Response(JSON.stringify({ favorites }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取收藏失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
