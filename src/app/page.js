import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const dynamic = "force-static";

export default function HomePage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-5xl mx-auto p-6">
  <h1 className={`${lato.className} text-6xl font-bold text-blue-400 mb-6`}>
  Data By Maia
  </h1>
  <p className={`${lato.className} text-lg mb-10`}>
  Welcome to my blog where I share data stories, analysis, and visuals.
  </p>

      <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>

      {/* Grid of blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block bg-gray-800 hover:bg-gray-700 rounded-xl p-6 shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
            <p className="text-gray-300">
              {post.description || "Click to read more →"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
