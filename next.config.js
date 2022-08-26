/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    return config;
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "content-type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

module.exports = nextConfig;
