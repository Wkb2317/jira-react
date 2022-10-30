const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
