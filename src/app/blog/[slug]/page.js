import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

const postsDirectory = path.join(process.cwd(), "src/posts");

export default async function PostPage({ params }) {
  const { slug } = params;
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fallbackPath = path.join(postsDirectory, `${slug}.md`);

  // Pick mdx if it exists, otherwise md
  const actualPath = fs.existsSync(fullPath) ? fullPath : fallbackPath;

  const fileContents = fs.readFileSync(actualPath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <main className="max-w-2xl mx-auto p-6 prose prose-invert">
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <MDXRemote source={content} />
    </main>
  );
}
