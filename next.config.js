/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use basePath and assetPrefix in production
  ...(process.env.GITHUB_ACTIONS ? {
    basePath: '/esdra-futuristic-site',
    assetPrefix: '/esdra-futuristic-site'
  } : {}),
  trailingSlash: true,
}

module.exports = nextConfig
