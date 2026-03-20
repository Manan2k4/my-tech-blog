import { getRawPostBySlug } from '@/lib/markdown'
import { EditPostClient } from '@/app/admin/edit/[slug]/EditPostClient'

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let post
  try {
    post = getRawPostBySlug(slug)
  } catch (error) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-red-500 font-bold">
        <h1>404: Post Not Found</h1>
      </div>
    )
  }

  return <EditPostClient slug={slug} initialPost={post} />
}
