import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center">
        <p>© {new Date().getFullYear()} Manan Ghoniya. Built with Next.js & Tailwind CSS.</p>
        <div className="flex gap-4 mt-4">
          <Link href="https://x.com/MananGhoniya" target="_blank" className="hover:text-blue-500 transition-colors">X (Twitter)</Link>
          <Link href="https://github.com/Manan2k4" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</Link>
          <Link href="https://www.linkedin.com/in/manan-ghoniya/" target="_blank" className="hover:text-blue-700 transition-colors">LinkedIn</Link>
        </div>
      </div>
    </footer>
  )
}
