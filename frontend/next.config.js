/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'strapiapp.com', 'cloudinary.com'],
  },
  rewrites: async () => {
    return [
      {
        source: '/uploads/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://snobbish-soft-board.strapiapp.com/uploads/:path*'
            : 'http://localhost:1337/uploads/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
