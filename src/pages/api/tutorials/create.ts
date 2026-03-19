import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
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
      return redirect('/xuanchen_content/tutorials/new?error=missing_fields', 303);
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

    return redirect('/xuanchen_content/admin?success=1', 303);
  } catch (error) {
    console.error(error);
    return redirect('/xuanchen_content/tutorials/new?error=create_failed', 303);
  }
};
