export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
  lastModified?: string;
  coverImage?: string;
  tags: string[];
  videoUrl?: string;
  projectUrl?: string;
  isDraft: boolean;
  isPinned?: boolean;
  readingTime: number;
  content?: string;
  rawContent?: string;
}

export interface TutorialFrontmatter {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  lastModified?: string;
  coverImage?: string;
  tags: string[];
  videoUrl?: string;
  projectUrl?: string;
  isDraft?: boolean;
}
