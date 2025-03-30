// next.config.ts - ES module syntax
import { NextConfig } from 'next';

const config: NextConfig = {
  // Your Next.js configuration
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
  // Add any other configuration options here
};

export default config;