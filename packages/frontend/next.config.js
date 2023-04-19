/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/admin/dashboard',
        destination: '/admin/dashboard/users',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
