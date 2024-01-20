const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FGC_API_URL: process.env.FGC_API_URL,
  },
  webpack(config) {
    // config.resolve.alias[package.name] = path.resolve(__dirname, 'src');
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
