'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  name: string
  content: string
  date: string
}

export function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data)
      })
      .catch(console.error)
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, content })
      })

      if (!res.ok) throw new Error('Failed to post comment')

      const newComment = await res.json()
      setComments([...comments, newComment])
      setName('')
      setContent('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      <div className="space-y-6 mb-12">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 dark:bg-[#111] p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">{comment.name}</span>
                <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <h4 className="font-semibold text-lg mb-4">Leave a Reply</h4>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name *</label>
            <input
              id="name"
              required
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111] outline-none focus:border-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Comment *</label>
            <textarea
              id="content"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111] outline-none focus:border-blue-500"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Join the discussion..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting || !name || !content}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  )
}
