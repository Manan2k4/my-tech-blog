import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { title, summary, tags, content, password } = await req.json()

    const providedPassword = password?.trim() || ''
    const expectedPassword = (process.env.ADMIN_PWD || 'manan123').trim()
    
    if (providedPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password. Make sure you entered it correctly.' }, { status: 401 })
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Create a URL-friendly slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const date = new Date().toISOString()
    
    // Create the markdown file content with frontmatter
    const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
summary: "${summary ? summary.replace(/"/g, '\\"') : ''}"
tags: ${JSON.stringify(tags || [])}
---

${content}
`

    // Ensure directory exists
    const postsDirectory = path.join(process.cwd(), 'content/posts')
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    // Prevent overwriting existing posts with the exact same title
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A post with a similar title already exists' },
        { status: 409 }
      )
    }

    fs.writeFileSync(filePath, mdContent, 'utf8')

    return NextResponse.json({ success: true, slug }, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
