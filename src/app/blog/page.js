import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* Grid of blog cards instead of a list */}
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
