import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { title, summary, tags, content, password } = await req.json()

    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()
    
    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password. Make sure you entered it correctly.' }, { status: 401 })
    }

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Insert into supabase
    const { error } = await supabase.from('posts').insert({
      slug,
      title,
      summary,
      tags: tags || [],
      content,
    })

    if (error) {
      if (error.code === '23505') { // Postgres unique violation code
        return NextResponse.json({ error: 'A post with a similar title already exists' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json({ success: true, slug }, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
