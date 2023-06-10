/** @type {import('next').NextConfig} */
const apiConfig = require("./api.config");
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_API_URL: apiConfig.BASE_API_URL,
  },
  async headers() {
    return [
      {
        source: apiConfig.requestReceiver,
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: apiConfig.requestOrigin,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ]
      }
    ];
  }
}

module.exports = nextConfig
