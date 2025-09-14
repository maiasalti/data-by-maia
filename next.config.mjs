import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
};

export default withMDX(nextConfig);


