const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {
    entry: {
      wwww: "./src/wwww.js",
    },
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@views', resolve('src/views'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },

  devServer: {
  proxy: 'https://localhost:3000'
    // proxy: {
    //   '/api': {
    //     target: 'https://localhost:3000/api/',
    //     ws: false,
    //     changeOrigin: true
    //   },

    // }
  },

  assetsDir: 'static',
  runtimeCompiler: true,

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server'
    },
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  }
}
