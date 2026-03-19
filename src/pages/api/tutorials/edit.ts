import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
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
      return redirect('/xuanchen_content/admin?error=missing_fields', 303);
    }

    if (coverImage && !coverImage.startsWith('/') && !coverImage.startsWith('http')) {
      coverImage = '';
    }

    const tags = tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean);
    const lastModified = new Date().toISOString().split('T')[0];

    const tutorialsDir = path.join(process.cwd(), 'content/tutorials');
    const filePath = path.join(tutorialsDir, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return redirect('/xuanchen_content/admin?error=not_found', 303);
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

    return redirect('/xuanchen_content/admin?success=1', 303);
  } catch (error) {
    console.error(error);
    return redirect('/xuanchen_content/admin?error=save_failed', 303);
  }
};
