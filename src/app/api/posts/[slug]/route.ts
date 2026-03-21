import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Handle POST deletion
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    const password = req.headers.get('x-admin-password')
    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()

    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: `Debug Vercel DELETE: You provided '${providedPassword}' but server expects '${expectedPassword}'` }, { status: 401 })
    }

    const { error } = await supabase.from('posts').delete().eq('slug', slug)

    if (error) {
       return NextResponse.json({ error: 'Post not found or could not delete' }, { status: 404 })
    }

    // Since comments have ON DELETE CASCADE in the database, they are automatically deleted!

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Failed to delete post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}

// Handle POST updating (Editing)
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const { title, summary, tags, content, password } = await req.json()

    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()

    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: `Debug Vercel EDIT: You provided '${providedPassword}' but server expects '${expectedPassword}'` }, { status: 401 })
    }

    const { error } = await supabase.from('posts').update({
       title, summary, tags, content
    }).eq('slug', slug)

    if (error) {
      return NextResponse.json({ error: 'Original post not found or could not update' }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Failed to update post:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}
