import type { APIRoute } from 'astro';
import { getAllWorkflows, getWorkflowById, createWorkflow, updateWorkflow, deleteWorkflow } from '../../lib/auth';

export const prerender = false;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const id = url.searchParams.get('id');
    
    if (id) {
      const workflow = getWorkflowById(parseInt(id));
      return new Response(JSON.stringify({ success: true, data: workflow }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const workflows = getAllWorkflows();
    return new Response(JSON.stringify({ success: true, data: workflows }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log('Workflow API received:', data);
    const { name, description, icon, tags, url, action, id } = data;

    if (action === 'create') {
      const result = createWorkflow(name, description, icon, tags, url);
      return new Response(JSON.stringify({ success: true, id: result.lastInsertRowid }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'update' && id !== undefined && id !== null) {
      console.log('Updating workflow:', { id, name, description, icon, tags, url });
      updateWorkflow(Number(id), name, description, icon, tags, url);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'delete' && id !== undefined && id !== null) {
      deleteWorkflow(Number(id));
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log('Invalid action or missing id:', { action, id });
    return new Response(JSON.stringify({ error: '无效的操作或缺少ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Workflow API error:', error);
    return new Response(JSON.stringify({ error: '操作失败', details: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
