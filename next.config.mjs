import nextMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const withMDX = nextMDX({
  extension: /\.mdx?$/, // allow .md and .mdx files
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'], // tell Next.js to treat these as pages
};

export default withMDX(nextConfig);

