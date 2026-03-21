import type { APIRoute } from 'astro';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../lib/auth';

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
      const product = getProductById(parseInt(id));
      return new Response(JSON.stringify({ success: true, data: product }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    const products = getAllProducts();
    return new Response(JSON.stringify({ success: true, data: products }), {
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
    const { name, description, url, icon, image, action, id } = data;

    if (action === 'create') {
      const result = createProduct(name, description, url, icon, image);
      return new Response(JSON.stringify({ success: true, id: result.lastInsertRowid }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'update' && id) {
      updateProduct(id, name, description, url, icon, image);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (action === 'delete' && id) {
      deleteProduct(id);
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
