
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tuusqailanshoixlxqht.supabase.co',   
        pathname: '/storage/v1/object/public/properties-image/**', 
      },
    ],
  },
};

export default nextConfig;

