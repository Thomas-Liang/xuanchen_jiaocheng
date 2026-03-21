import type { APIRoute } from 'astro';
import { editComment } from '../../../lib/auth';

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
    const formData = await request.formData();
    const commentId = formData.get('id')?.toString();
    const username = formData.get('username')?.toString();
    const content = formData.get('content')?.toString();

    if (!commentId || !username || !content) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const result = editComment(parseInt(commentId), username, content);
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: '评论不存在或无权限编辑' }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '编辑评论失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
