const withTM = require('next-transpile-modules')([
  '@ant-design/icons',
  'rc-util',
  'rc-pagination',
  'rc-picker',
]);
module.exports = withTM({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: [
  //       {
  //         loader: '@svgr/webpack',
  //         options: {
  //           typescript: true,
  //           icon: true,
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
});
