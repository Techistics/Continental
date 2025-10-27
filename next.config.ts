/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ allow Unsplash
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", // ✅ allow Google thumbnail images
      },
    ],
  },
};

export default nextConfig;
