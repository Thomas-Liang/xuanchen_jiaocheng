import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Tutorial, TutorialFrontmatter } from './types';
import type { APIRoute } from 'astro';

const tutorialsDir = path.join(process.cwd(), 'content/tutorials');

export function getAllTutorials(): Tutorial[] {
  if (!fs.existsSync(tutorialsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(tutorialsDir).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(tutorialsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    const frontmatter = data as TutorialFrontmatter;
    const slug = file.replace('.md', '');
    
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return {
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      author: frontmatter.author || '',
      publishDate: frontmatter.publishDate || '',
      lastModified: frontmatter.lastModified,
      coverImage: frontmatter.coverImage,
      tags: frontmatter.tags || [],
      videoUrl: frontmatter.videoUrl,
      projectUrl: frontmatter.projectUrl,
      isDraft: frontmatter.isDraft || false,
      readingTime,
      content,
    };
  });
}

export function getPublishedTutorials(): Tutorial[] {
  const all = getAllTutorials();
  return all
    .filter(t => !t.isDraft)
    .sort((a, b) => {
      const dateA = a.lastModified || a.publishDate;
      const dateB = b.lastModified || b.publishDate;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  const all = getAllTutorials();
  return all.find(t => t.slug === slug) || null;
}

export function serializeTutorial(tutorial: Tutorial): string {
  const frontmatter: Record<string, unknown> = {
    title: tutorial.title,
    description: tutorial.description,
    author: tutorial.author,
    publishDate: tutorial.publishDate,
    lastModified: tutorial.lastModified || tutorial.publishDate,
    tags: tutorial.tags,
    isDraft: tutorial.isDraft,
  };
  
  if (tutorial.coverImage) frontmatter.coverImage = tutorial.coverImage;
  if (tutorial.videoUrl) frontmatter.videoUrl = tutorial.videoUrl;
  if (tutorial.projectUrl) frontmatter.projectUrl = tutorial.projectUrl;
  
  return matter.stringify(tutorial.content || '', frontmatter);
}
