/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['jspdf', 'canvg'], 
};

export default nextConfig;
