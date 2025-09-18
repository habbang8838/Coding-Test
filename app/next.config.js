/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  swcMinify: true,
  experimental: {
    // Next 15 이상에서 lightningcss 사용을 명시적으로 끄기
    disableLightningcss: true,
    // (기존 legacyCss 같은 옵션이 있으면 제거/주석 처리)
  },
};

module.exports = nextConfig;