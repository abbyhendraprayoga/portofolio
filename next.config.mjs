/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ['cdn.discordapp.com'], // Remove the trailing slash from the domain
  },
};

export default nextConfig;
