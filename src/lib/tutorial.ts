import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Tutorial, TutorialFrontmatter } from './types';
import type { APIRoute } from 'astro';
import { getPinnedTutorials } from './auth';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

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
    
    // Parse markdown to HTML
    const htmlContent = marked.parse(content) as string;
    
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
      content: htmlContent,
      rawContent: content,
    };
  });
}

export function getPublishedTutorials(): Tutorial[] {
  const all = getAllTutorials();
  const pinnedSlugs = getPinnedTutorials();
  
  return all
    .filter(t => !t.isDraft)
    .map(t => ({ ...t, isPinned: pinnedSlugs.includes(t.slug) }))
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const dateA = a.lastModified || a.publishDate;
      const dateB = b.lastModified || b.publishDate;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  const all = getAllTutorials();
  return all.find(t => t.slug === slug) || null;
}

export interface TagCount {
  tag: string;
  count: number;
}

let tagCountsCache: { data: TagCount[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function getTagCounts(maxTags: number = 20): TagCount[] {
  const now = Date.now();
  
  if (tagCountsCache && (now - tagCountsCache.timestamp) < CACHE_TTL) {
    return tagCountsCache.data.slice(0, maxTags);
  }
  
  const tutorials = getPublishedTutorials();
  const tagMap = new Map<string, number>();
  
  tutorials.forEach(tutorial => {
    tutorial.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  const sortedTags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
  
  tagCountsCache = {
    data: sortedTags,
    timestamp: now
  };
  
  return sortedTags.slice(0, maxTags);
}

export function invalidateTagCountsCache(): void {
  tagCountsCache = null;
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
