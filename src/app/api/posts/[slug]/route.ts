import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Handle POST deletion
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    // We fetch the password from the custom header since DELETE bodies can be unreliable
    const password = req.headers.get('x-admin-password')

    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()

    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password. Make sure you entered it correctly!' }, { status: 401 })
    }

    const postsDirectory = path.join(process.cwd(), 'content/posts')
    const filePath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    const commentsPath = path.join(process.cwd(), `content/comments/${slug}.json`)
    if (fs.existsSync(commentsPath)) fs.unlinkSync(commentsPath)

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
    const { title, summary, tags, content, password, originalDate } = await req.json()

    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()

    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password. Make sure you entered it correctly!' }, { status: 401 })
    }

    const postsDirectory = path.join(process.cwd(), 'content/posts')
    const filePath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Original post not found' }, { status: 404 })
    }

    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${originalDate}"
summary: "${summary ? summary.replace(/"/g, '\\"') : ''}"
tags: ${JSON.stringify(tags || [])}
---

${content}
`

    fs.writeFileSync(filePath, mdContent, 'utf8')
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Failed to update post:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}
