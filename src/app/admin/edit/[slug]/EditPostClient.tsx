'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function EditPostClient({ slug, initialPost }: { slug: string, initialPost: any }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialPost.title,
    summary: initialPost.summary,
    tags: initialPost.tags.join(', '),
    content: initialPost.content,
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0)

      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          tags: tagsArray,
          content: formData.content,
          password: formData.password,
          originalDate: initialPost.date
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post')
      }

      setSuccess('Post updated successfully!')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Link href="/admin" className="text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors">← Back</Link>
          Edit Post
        </h1>
        <Link href={`/blog/${slug}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold">View Live →</Link>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-xl mb-6 border border-green-200 dark:border-green-800 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title *</label>
          <input
            id="title"
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4 rounded-xl">
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-blue-800 dark:text-blue-400">Admin Password (Safekeeping) *</label>
          <input
            id="password"
            required
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-700/50 bg-white dark:bg-[#0a0a0a] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            placeholder="Required to modify"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium mb-2">Summary</label>
          <input
            id="summary"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-2">Tags (Comma Separated)</label>
          <input
            id="tags"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">Content (Markdown) *</label>
          <textarea
            id="content"
            required
            rows={20}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-mono text-sm leading-relaxed"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving Changes...' : 'Update Post'}
        </button>
      </form>
    </div>
  )
}
