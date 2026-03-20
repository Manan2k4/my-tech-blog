import { getPostBySlug } from '@/lib/markdown'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { Comments } from '@/components/Comments'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return {
    title: `${post.title} | TechBlog`,
    description: post.summary,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const date = parseISO(post.date)

  return (
    <article className="max-w-3xl mx-auto py-8">
      <div className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-8 w-full max-w-lg mx-auto">
          <time dateTime={post.date} className="font-medium">
            {format(date, 'MMMM d, yyyy')}
          </time>
          <span className="hidden sm:inline">•</span>
          <span className="font-medium">{post.readingTime}</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-full uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Comments slug={slug} />
    </article>
  )
}
