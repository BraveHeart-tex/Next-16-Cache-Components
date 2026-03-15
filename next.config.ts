import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    demo_short: {
      stale: 10,       // 10 seconds client cache
      revalidate: 15,  // revalidate after 15 seconds
      expire: 30,      // hard expire after 30 seconds
    },
    demo_medium: {
      stale: 30,
      revalidate: 60,
      expire: 120,
    },
    demo_long: {
      stale: 120,
      revalidate: 300,
      expire: 600,
    },
  },
}

export default nextConfig
