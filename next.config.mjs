/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'f.fcdn.app'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
          
         
        ]
    }
};

export default nextConfig;
