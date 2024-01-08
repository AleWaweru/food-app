/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'alex-food-ordering.s3.amazonaws.com',
      },
    ]
  }
}

module.exports = {
  ...nextConfig,
  // experimental: {
  //   isr: false,
  // },
}
