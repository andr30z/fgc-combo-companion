/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  experimental: {
    appDir: true,
  },

  reactStrictMode: false,
  webpack(config) {
    // config.resolve.alias[package.name] = path.resolve(__dirname, 'src');
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    console.log(config.resolve.alias)
    return config;
  },
};

module.exports = nextConfig;
