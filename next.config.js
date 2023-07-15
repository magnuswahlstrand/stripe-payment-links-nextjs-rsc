/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {hostname: 'via.placeholder.com'},
            {hostname: 'placekitten.com'},
        ],
    }
}

module.exports = nextConfig
