import type { APIRoute } from 'astro';
import { addComment, getComments } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const tutorialSlug = formData.get('slug')?.toString();
    const username = formData.get('username')?.toString();
    const content = formData.get('content')?.toString();

    if (!tutorialSlug || !username || !content) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { status: 400 });
    }

    addComment(tutorialSlug, username, content);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '评论失败' }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: '缺少 slug 参数' }), { status: 400 });
    }

    const comments = getComments(slug);
    return new Response(JSON.stringify({ comments }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取评论失败' }), { status: 500 });
  }
};
