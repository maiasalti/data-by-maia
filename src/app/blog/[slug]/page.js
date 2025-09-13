import { getPostData } from "@/lib/posts";

export default async function PostPage({ params }) {
  const post = await getPostData(params.slug);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
