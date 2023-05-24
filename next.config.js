/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['source.unsplash.com','images.unsplash.com'],
  },

  i18n: {
    locales: ['tr-TR'],
    
    defaultLocale: 'tr-TR',
    domains: [
      {
        domain: process.env.NEXT_PUBLIC_URL,
        defaultLocale: 'tr-TR',

        http: true,
      }
    ],
  },
  
}

module.exports = nextConfig
