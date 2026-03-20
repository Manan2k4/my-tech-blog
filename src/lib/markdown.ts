import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const htmlContent = marked.parse(content) as string;
  const time = readingTime(content);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    tags: data.tags || [],
    readingTime: time.text,
    content: htmlContent,
  };
}

export function getRawPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const time = readingTime(content);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    tags: data.tags || [],
    readingTime: time.text,
    content: content // UNCOMPILED RAW MARKDOWN!
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  // We don't need to return full content for all posts
  return posts.map(({ content, ...meta }) => meta);
}
