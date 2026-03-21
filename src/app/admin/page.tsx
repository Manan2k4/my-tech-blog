import { getAllPosts } from '@/lib/markdown'
import { AdminManagerClient } from '@/app/admin/AdminManagerClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold mb-8">Admin Dashboard</h1>
      <AdminManagerClient initialPosts={posts} />
    </div>
  )
}
