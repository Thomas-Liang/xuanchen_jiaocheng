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
  readingTime: number;
  content?: string;
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
