'use client'

import { useState } from 'react'
import { PostMeta } from '@/lib/markdown'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function AdminManagerClient({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [password, setPassword] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (slug: string) => {
    if (!password) {
      alert("Please provide the Admin Password at the top of the dashboard to safely delete this.")
      return
    }

    if (!confirm('Are you absolutely sure you want to delete this post? This cannot be undone.')) {
      return
    }

    setDeleting(slug)

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password
        }
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete post.')
      }

      setPosts(posts.filter(p => p.slug !== slug))
    } catch (error: any) {
      alert(error.message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4">
        <div>
          <h2 className="font-semibold text-lg">Safekeeping Mode</h2>
          <p className="text-sm text-gray-500">Provide the Admin Password to enable deletion.</p>
        </div>
        <input 
          type="password"
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-[#0a0a0a] outline-none transition-all"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center px-2 py-4">
        <span className="font-semibold text-xl">{posts.length} Published Posts</span>
        <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 shadow-sm shadow-blue-600/20 rounded-lg transition-all">
          + Draft New Post
        </Link>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        {posts.map(post => (
          <div key={post.slug} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white dark:bg-[#0a0a0a] transition-colors hover:bg-gray-50 dark:hover:bg-[#111]">
            <div className="flex-grow mb-4 sm:mb-0">
              <Link href={`/blog/${post.slug}`} className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300">Live</span>
                {format(parseISO(post.date), 'MMMM d, yyyy')} • {post.readingTime}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/edit/${post.slug}`}
                className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                title="Edit this post"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                disabled={deleting === post.slug}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                title="Delete this post permanently"
              >
                {deleting === post.slug ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No active posts found.
          </div>
        )}
      </div>
    </div>
  )
}
