/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "https://pattern-85d1-khrbwfqay-noldor99.vercel.app" },
      { hostname: "loremflickr.com" },
    ],
  },
}

export default nextConfig
