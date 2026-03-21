import { marked } from 'marked';
import readingTime from 'reading-time';
import { supabase } from '@/lib/supabase';

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

export async function getPostSlugs() {
  const { data, error } = await supabase.from('posts').select('slug');
  if (error) return [];
  return data.map((row) => row.slug);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    throw new Error('Post not found');
  }

  const htmlContent = marked.parse(data.content || '') as string;
  const time = readingTime(data.content || '');

  return {
    slug: data.slug,
    title: data.title,
    date: data.created_at,
    summary: data.summary || '',
    tags: data.tags || [],
    readingTime: data.reading_time || time.text,
    content: htmlContent,
  };
}

export async function getRawPostBySlug(slug: string): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    throw new Error('Post not found');
  }

  const time = readingTime(data.content || '');

  return {
    slug: data.slug,
    title: data.title,
    date: data.created_at,
    summary: data.summary || '',
    tags: data.tags || [],
    readingTime: data.reading_time || time.text,
    content: data.content,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const time = readingTime(row.content || '');
    return {
      slug: row.slug,
      title: row.title,
      date: row.created_at,
      summary: row.summary || '',
      tags: row.tags || [],
      readingTime: row.reading_time || time.text,
    };
  });
}
