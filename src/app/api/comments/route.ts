import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 })

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_slug', slug)
    .order('created_at', { ascending: true })
    
  if (error || !data) {
    return NextResponse.json([]) // No comments yet or error
  }

  // Map to the object shape the frontend expects
  const formattedComments = data.map((comment: any) => ({
    id: comment.id,
    name: comment.name,
    content: comment.content,
    date: comment.created_at
  }))

  return NextResponse.json(formattedComments)
}

export async function POST(req: Request) {
  try {
    const { slug, name, content } = await req.json()

    if (!slug || !name || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const safeName = name.replace(/</g, "&lt;")
    const safeContent = content.replace(/</g, "&lt;")

    const { data, error } = await supabase.from('comments').insert({
      post_slug: slug,
      name: safeName,
      content: safeContent
    }).select().single()

    if (error) {
      throw error
    }

    const newComment = {
      id: data.id,
      name: data.name,
      content: data.content,
      date: data.created_at
    }

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Failed to add comment:', error)
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 })
  }
}
