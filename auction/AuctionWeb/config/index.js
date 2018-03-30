
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 81,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/auction': {
            target : 'http://localhost:4000'
        },
        '/information': {
            target : 'http://localhost:4000'
        },
        '/users': {
            target : 'http://localhost:4000'
        },
        '/register': {
            target : 'http://localhost:4000'
        },
        '/login': {
            target : 'http://localhost:4000'
        },
        '/logout': {
            target : 'http://localhost:4000'
        },
        '/infos': {
            target : 'http://localhost:4000'
        },
        '/laws': {
            target : 'http://localhost:4000'
        },
        '/previews': {
            target : 'http://localhost:4000'
        },
        '/knowledges': {
            target : 'http://localhost:4000'
        },
        '/infodetail': {
            target : 'http://localhost:4000'
        },
        '/userdetails': {
            target : 'http://localhost:4000'
        },
        '/addinfo': {
            target : 'http://localhost:4000'
        },
        '/addpreview': {
            target : 'http://localhost:4000'
        },
        '/allpreviews': {
            target : 'http://localhost:4000'
        },
        '/previewlist': {
            target : 'http://localhost:4000'
        },
        '/previewdetail': {
            target : 'http://localhost:4000'
        },
        '/previewCount': {
            target : 'http://localhost:4000'
        },
        '/ChangePwd': {
            target : 'http://localhost:4000'
        },
        '/edit': {
            target : 'http://localhost:4000'
        },
        '/uploads': {
            target : 'http://localhost:4000'
        },
        '/userinfo': {
            target : 'http://localhost:4000'
        },
        '/userpreview': {
            target : 'http://localhost:4000'
        },
        '/infodel': {
            target : 'http://localhost:4000'
        },
        '/infomodify': {
            target : 'http://localhost:4000'
        },
        '/searchfor': {
            target : 'http://localhost:4000'
        },
        '/pv': {
            target : 'http://localhost:4000'
        },
        '/knowledge': {
            target : 'http://localhost:4000'
        },
        '/law': {
            target : 'http://localhost:4000'
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
