import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 })

  const commentsPath = path.join(process.cwd(), `content/comments/${slug}.json`)
  
  if (!fs.existsSync(commentsPath)) {
    return NextResponse.json([]) // No comments yet
  }

  const fileContents = fs.readFileSync(commentsPath, 'utf8')
  return NextResponse.json(JSON.parse(fileContents))
}

export async function POST(req: Request) {
  try {
    const { slug, name, content } = await req.json()

    if (!slug || !name || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const commentsDir = path.join(process.cwd(), 'content/comments')
    if (!fs.existsSync(commentsDir)) {
      fs.mkdirSync(commentsDir, { recursive: true })
    }

    const commentsPath = path.join(commentsDir, `${slug}.json`)
    let comments = []
    
    if (fs.existsSync(commentsPath)) {
      comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'))
    }

    const newComment = {
      id: Date.now().toString(),
      name: name.replace(/</g, "&lt;"), // Basic XSS prevention
      content: content.replace(/</g, "&lt;"),
      date: new Date().toISOString()
    }

    comments.push(newComment)
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2))

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Failed to add comment:', error)
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 })
  }
}
