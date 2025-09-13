import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
};

export default withMDX(nextConfig);

