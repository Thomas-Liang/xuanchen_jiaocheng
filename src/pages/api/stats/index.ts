import type { APIRoute } from 'astro';
import { getAllPageviews } from '../../../lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const GET: APIRoute = async () => {
  try {
    const pageviews = getAllPageviews();
    const totalViews = pageviews.reduce((sum, p) => sum + p.count, 0);
    const topPages = pageviews.slice(0, 10);
    
    return new Response(JSON.stringify({
      totalViews,
      pageCount: pageviews.length,
      topPages,
      data: pageviews
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '获取统计失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
