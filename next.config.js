/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
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
        output: 'export',
        trailingSlash: true,
        basePath: '/esdra-futuristic-site',
        assetPrefix: '/esdra-futuristic-site',
      }
    : {}),
}

module.exports = nextConfig
