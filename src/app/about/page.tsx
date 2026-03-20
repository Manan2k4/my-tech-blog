import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About | Manan's Blog",
  description: 'Learn more about Manan Ghoniya.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">About Me</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Hello! I'm <strong>Manan Ghoniya</strong>, an enthusiastic software engineer and developer building modern web applications. 
          Welcome to my digital garden where I share topics on frontend, backend, and everything in between.
        </p>
        
        <p className="text-lg leading-relaxed">
          I started this blog to document my learning journey and to share technical insights that 
          might help out other developers. My primary stack includes Next.js, React, Node.js, and TypeScript.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Contact & Links</h2>
        <p className="text-lg leading-relaxed mb-4">
          The best way to get in touch is via my socials below. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>

        <ul className="flex flex-col gap-2 mt-4 text-lg">
          <li>
            <a href="https://github.com/Manan2k4" target="_blank" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center">
              GitHub (@Manan2k4)
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/manan-ghoniya/" target="_blank" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://x.com/MananGhoniya" target="_blank" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center">
              X (Twitter)
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
