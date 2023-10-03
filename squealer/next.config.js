/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: [
            'hdbbawymijzsmrjqnlrc.supabase.co',
            'lh3.googleusercontent.com',
            'cdn.studenti.stbm.it',
            'localhost',
            'shorturl.at',
            'e1.pngegg.com',
            'localhost:3000',
        ],
    },
}

module.exports = nextConfig
