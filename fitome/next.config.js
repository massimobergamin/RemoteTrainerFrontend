const nextOffline = require('next-offline')
const nextConfig = {
  generateInDevMode: false,
  workboxOpts: {
    swDest: '../public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
      {
        urlPattern: /\.(json|js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'weather-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(svg|png|jpe?g)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^http:localhost:3000\/api/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60, // 1 hour
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }
    ]
  },
  webpack: (config, { isServer }) => {
            // Fixes npm packages that depend on `fs` module
            if (!isServer) {
              config.node = {
                fs: 'empty',
                net: 'empty',
              }
            }
            return config
          },
          
}

// module.exports = {
//     webpack: (config, { isServer }) => {
//         // Fixes npm packages that depend on `fs` module
//         if (!isServer) {
//           config.node = {
//             fs: 'empty',
//             net: 'empty',
//           }
//         }
    
//         return config
//       },
//     ...nextOffline(),
// }
module.exports = nextOffline(nextConfig);