import extendWebpackConfig from './extend.webpack.config';

const port = process.env.NUXT_PORT || 3300;
const host = process.env.NUXT_HOST || '0.0.0.0';
const isDev = process.env.NODE_ENV === 'development';

export default {
  server: {
    host,
    port,
  },
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
  },
  srcDir: 'src',
  head: {
    title: 'nuxt.js with atomic design',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'vuetify-tsx',
          libraryDirectory: 'lib',
          camel2DashComponentName: false,
        },
      ],
    ],
  },
  loading: { color: '#3B8070' },
  build: {
    extractCSS: !isDev,
    extend: extendWebpackConfig,
    typescript: {
      ignoreNotFoundWarnings: true,
    },
  },
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/vuetify', { treeShake: true, css: true }],
  ],
  plugins: ['~/plugins/axios_cookie_proxy.ts'],
  axios: {
    host,
    port,
    prefix: '/api',
    proxy: true,
  },
  proxy: {
    '/api': {
      target: process.env.BACKEND_HOST || 'http://localhost:3301',
      pathRewrite: { '^/api': '' },
    },
  },
};
