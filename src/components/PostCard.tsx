import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { PostMeta } from '../lib/markdown'

export function PostCard({ post }: { post: PostMeta }) {
  const date = parseISO(post.date)

  return (
    <article className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all hover:border-gray-200 dark:hover:border-gray-700">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.date}>{format(date, 'LLLL d, yyyy')}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {post.summary}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}
