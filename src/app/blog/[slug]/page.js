import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Graph from "../../../components/GraphWrapper";
import { ValenceComparisonChart, AudioFeaturesRadar, SeasonalTrendLine } from "../../../components/SeasonalMusicChart";

const postsDirectory = path.join(process.cwd(), "src/posts");

export default async function PostPage({ params }) {
  const { slug } = params;

  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

return (
  <main className="max-w-4xl mx-auto p-8">
    <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
    <p className="text-gray-400 text-lg mb-8">{data.date}</p>
    
<article className="prose prose-lg prose-invert max-w-none">
<style dangerouslySetInnerHTML={{
  __html: `
    .prose h2 {
      font-size: 1.875rem !important;
      font-weight: 700 !important;
      color: white !important;
      margin-top: 3rem !important;
      margin-bottom: 1.5rem !important;
    }
  `
}} />
  <div className="space-y-8">
    <MDXRemote 
      source={content} 
      components={{ 
        Graph,
        ValenceComparisonChart,
        AudioFeaturesRadar,
        SeasonalTrendLine 
      }} 
    />
  </div>
</article>
  </main>
);
}
