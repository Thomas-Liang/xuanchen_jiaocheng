import type { APIRoute } from 'astro';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../../lib/auth';

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
      const project = getProjectById(parseInt(id));
      return new Response(JSON.stringify({ success: true, data: project }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const projects = getAllProjects();
    return new Response(JSON.stringify({ success: true, data: projects }), {
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
    const { name, description, url, icon, action, id } = data;

    if (action === 'create') {
      const result = createProject(name, description, url, icon);
      return new Response(JSON.stringify({ success: true, id: result.lastInsertRowid }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'update' && id) {
      updateProject(id, name, description, url, icon);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'delete' && id) {
      deleteProject(id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: '无效的操作' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '操作失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
