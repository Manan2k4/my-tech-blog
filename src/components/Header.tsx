import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="py-6 mb-8 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-4xl">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Manan's Blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
            About
          </Link>
          <Link href="/admin" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Admin
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
