/** @type {import('next').NextConfig} */
require("dotenv").config({
  path: `./env/.env.${process.env.SERVICES_ENV || "staging"}`,
});

const env = {};

Object.keys(process.env).forEach((key) => {
  if (key.startsWith("NEXT_PUBLIC_")) {
    env[key] = process.env[key];
  }
});

const nextConfig = {
  // reactStrictMode: true,
  env,
  basePath: "/staking",
};

module.exports = nextConfig;
