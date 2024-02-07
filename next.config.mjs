/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images:{
    domains:["media.licdn.com",
    "lh3.googleusercontent.com",
    "suraj-twitter-bucket.s3.ap-south-1.amazonaws.com"]
  }
};

export default nextConfig;
