var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var glob = require('glob')
var CopyWebpackPlugin = require('copy-webpack-plugin') //add 2018-7-31
var relative = require('relative') //add 2018-7-31

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// function getEntry (rootSrc, pattern) {
//   var files = glob.sync(path.resolve(rootSrc, pattern))
//   return files.reduce((res, file) => {
//     var info = path.parse(file)
//     var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
//     res[key] = path.resolve(file)
//     return res
//   }, {})
// }

function getEntry (rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/pages/**/**.js').forEach(file => {
    var key = relative(rootSrc, file).replace('.js', '');
    map[key] = file;
  })
  return map;
}

 

function getEntryPageB (rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/order/**/**.js').forEach(file => {
    var key = relative(rootSrc, file).replace('.js', '');
    map[key] = file;
  })
  return map;
}

function getEntryPageA (rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/mine/**/**.js').forEach(file => {
    var key = relative(rootSrc, file).replace('.js', '');
    map[key] = file;
  })
  return map;
}
function getEntryPageC (rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/mingxi/**/**.js').forEach(file => {
    var key = relative(rootSrc, file).replace('.js', '');
    map[key] = file;
  })
  return map;
}
function getEntryPageD (rootSrc) {
  var map = {};
  glob.sync(rootSrc + '/other/**/**.js').forEach(file => {
    var key = relative(rootSrc, file).replace('.js', '');
    map[key] = file;
  })
  return map;
}
const appEntry = { app: resolve('./src/main.js') }
const pagesEntry = getEntry(resolve('./src'))
const packageAEntryA = getEntryPageA(resolve('./src'))
const packageAEntryB = getEntryPageB(resolve('./src'))
const packageAEntryC = getEntryPageC(resolve('./src'))
const packageAEntryD = getEntryPageD(resolve('./src'))
const entry = Object.assign({}, appEntry, pagesEntry, packageAEntryA,packageAEntryB,packageAEntryC,packageAEntryD)

module.exports = {
  // 如果要自定义生成的 dist 目录里面的文件路径，
  // 可以将 entry 写成 {'toPath': 'fromPath'} 的形式，
  // toPath 为相对于 dist 的路径, 例：index/demo，则生成的文件地址为 dist/index/demo.js
  entry,
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      'staticA': resolve('static')
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MpvuePlugin(),
    new CopyWebpackPlugin(
      [{
        from: '**/*.json',
        to: ''
      }], 
      {
        context: 'src/'
      }
    ),
    new CopyWebpackPlugin(
      [{
        from: 'project.config.json',
        to: ''
      }], 
      {
        context: './'
      }
    ),
    new CopyWebpackPlugin([ // 处理 main.json 里面引用的图片，不要放代码中引用的图片
     {
      from: path.resolve(__dirname, '../static'),
      to: path.resolve(__dirname, '../dist/static'),
      ignore: ['.*']
     }
    ])
  ]
}
