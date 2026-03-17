/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  ...(isGithubActions
    ? {
        basePath: '/esdra-futuristic-site',
        assetPrefix: '/esdra-futuristic-site',
      }
    : {}),
}

module.exports = nextConfig
