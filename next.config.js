/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  async rewrites() {
    return [
      {
        source: "/api/counter",
        destination: "http://65.0.207.184:4001/api/counter",
      },
    ];
  },
};

module.exports = nextConfig;
