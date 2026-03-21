export const dynamic = 'force-dynamic'

import { getAllPosts } from '@/lib/markdown'
import { HomePageClient } from '@/app/HomePageClient'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="flex flex-col">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Latest Writings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thoughts on software engineering, web development, and tech.
        </p>
      </div>

      <HomePageClient initialPosts={posts} />
    </div>
  )
}
