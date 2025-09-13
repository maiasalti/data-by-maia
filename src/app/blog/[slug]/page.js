import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

const postsDirectory = path.join(process.cwd(), "src/posts");

export default async function PostPage({ params }) {
  const { slug } = params;

  // Look for .mdx first, then .md
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  // Read file
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Parse metadata (frontmatter) + content
  const { data, content } = matter(fileContents);

  return (
    <main className="max-w-2xl mx-auto p-6 prose prose-invert">
      <h1>{data.title}</h1>
      <p>{data.date}</p>

      {/* Render Markdown or MDX content */}
      <MDXRemote source={content} />
    </main>
  );
}
