import type { APIRoute } from 'astro';
import { addComment, getComments, deleteComment, editComment, getUserByUsername } from '../../../lib/auth';
import { getTutorialBySlug } from '../../../lib/tutorial';
import { sendCommentNotification } from '../../../lib/email';

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
    const tutorialSlug = formData.get('slug')?.toString();
    const username = formData.get('username')?.toString();
    const content = formData.get('content')?.toString();

    if (!tutorialSlug || !username || !content) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    addComment(tutorialSlug, username, content);

    const tutorial = getTutorialBySlug(tutorialSlug);
    const commenter = getUserByUsername(username);
    const adminUser = getUserByUsername('admin');

    if (tutorial && commenter) {
      sendCommentNotification({
        authorEmail: null,
        authorName: tutorial.author,
        tutorialTitle: tutorial.title,
        tutorialSlug,
        commenterName: commenter.username,
        commentContent: content,
        adminEmail: adminUser?.email || undefined,
      }).catch(err => console.error('Failed to send comment notification:', err));
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '评论失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return new Response(JSON.stringify({ error: '缺少 slug 参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const comments = getComments(slug);
    return new Response(JSON.stringify({ comments }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取评论失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const commentId = formData.get('id')?.toString();
    const username = formData.get('username')?.toString();

    if (!commentId || !username) {
      return new Response(JSON.stringify({ error: '缺少必要参数' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const result = deleteComment(parseInt(commentId), username);
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: '评论不存在或无权限删除' }), { 
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
    return new Response(JSON.stringify({ error: '删除评论失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
