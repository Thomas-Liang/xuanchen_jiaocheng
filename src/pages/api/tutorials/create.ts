import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const author = formData.get('author')?.toString();
    const tagsStr = formData.get('tags')?.toString() || '';
    let coverImage = formData.get('coverImage')?.toString() || '';
    const videoUrl = formData.get('videoUrl')?.toString() || '';
    const projectUrl = formData.get('projectUrl')?.toString() || '';
    const content = formData.get('content')?.toString() || '';

    if (!title || !description || !author || !content) {
      return new Response(JSON.stringify({ error: '请填写所有必填字段' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (coverImage && !coverImage.startsWith('/') && !coverImage.startsWith('http')) {
      coverImage = '';
    }

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
    const now = new Date().toISOString();
    const publishDate = now.split('T')[0];
    const lastModified = publishDate;

    const tutorialsDir = path.join(process.cwd(), 'content/tutorials');
    
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
    if (projectUrl) frontmatter.projectUrl = projectUrl;

    const fileContent = matter.stringify(content, frontmatter);
    
    if (!fs.existsSync(tutorialsDir)) {
      fs.mkdirSync(tutorialsDir, { recursive: true });
    }
    
    const filePath = path.join(tutorialsDir, `${slug}.md`);
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '创建失败' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
