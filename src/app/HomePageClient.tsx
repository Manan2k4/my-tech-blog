'use client'

import { useState } from 'react'
import { PostCard } from '@/components/PostCard'
import { SearchBar } from '@/components/SearchBar'
import { PostMeta } from '@/lib/markdown'

export function HomePageClient({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [posts, setPosts] = useState(initialPosts)

  const handleSearch = (query: string) => {
    const term = query.toLowerCase()
    const filtered = initialPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.summary.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
    )
    setPosts(filtered)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">
          No matching posts found.
        </div>
      )}
    </>
  )
}
