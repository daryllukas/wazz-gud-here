/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  rewrites: async () => {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:1337/uploads/:path*',
      },
    ]
  },
}

module.exports = nextConfig
