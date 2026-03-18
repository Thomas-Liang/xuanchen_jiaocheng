import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

    const slug = formData.get('slug')?.toString();
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const author = formData.get('author')?.toString();
    const tagsStr = formData.get('tags')?.toString() || '';
    let coverImage = formData.get('coverImage')?.toString() || '';
    const videoUrl = formData.get('videoUrl')?.toString() || '';
    const content = formData.get('content')?.toString() || '';

    if (!slug || !title || !description || !author || !content) {
      return new Response(JSON.stringify({ error: '请填写所有必填字段' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (coverImage && !coverImage.startsWith('/') && !coverImage.startsWith('http')) {
      coverImage = '';
    }

    const tags = tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean);
    const lastModified = new Date().toISOString().split('T')[0];

    const tutorialsDir = path.join(process.cwd(), 'content/tutorials');
    const filePath = path.join(tutorialsDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: 'Tutorial not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const existingContent = fs.readFileSync(filePath, 'utf-8');
    const { data: existingData } = matter(existingContent);
    const publishDate = existingData.publishDate || lastModified;

    const frontmatter: Record<string, unknown> = {
      title,
      description,
      author,
      publishDate,
      lastModified,
      tags,
      isDraft: false,
    };

    if (coverImage) frontmatter.coverImage = coverImage;
    if (videoUrl) frontmatter.videoUrl = videoUrl;

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '保存失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
