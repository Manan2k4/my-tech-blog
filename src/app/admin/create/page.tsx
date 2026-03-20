'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    tags: '',
    content: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Convert comma-separated string to Array of strings
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          tags: tagsArray,
          content: formData.content,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish post')
      }

      // Success, redirect to the new post
      router.push(`/blog/${data.slug}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold mb-8">Create New Blog Post</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title *</label>
          <input
            id="title"
            required
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            placeholder="E.g., My First Amazing Post"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl">
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-yellow-800 dark:text-yellow-500">Admin Password (Safekeeping) *</label>
          <input
            id="password"
            required
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-yellow-300 dark:border-yellow-700/50 bg-white dark:bg-[#0a0a0a] focus:ring-2 focus:ring-yellow-500 outline-none transition-shadow"
            placeholder="Required to publish"
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
            placeholder="A short snippet to display on the Home Page"
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
            placeholder="React, Next.js, Tutorial"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">Content (Markdown) *</label>
          <textarea
            id="content"
            required
            rows={15}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-mono text-sm"
            placeholder="Write your markdown here..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  )
}
