import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const DELETE: APIRoute = async ({ url }) => {
  try {
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return new Response(JSON.stringify({ error: '缺少 slug 参数' }), { status: 400 });
    }

    const tutorialsDir = path.join(process.cwd(), 'content/tutorials');
    const filePath = path.join(tutorialsDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: '教程不存在' }), { status: 404 });
    }

    fs.unlinkSync(filePath);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '删除失败' }), { status: 500 });
  }
};
