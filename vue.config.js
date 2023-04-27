const path = require('path')
const resolve = (...args) => path.resolve(__dirname, ...args)
const { defineConfig } = require('@vue/cli-service')

function getCurrentTime() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = date.getDate()
  day = day < 10 ? '0' + day : day
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
}
const ReleaseTime = getCurrentTime()
const ReleaseVersion = require('./package.json').version

const Timestamp = new Date()
  .getTime()
  .toString()
  .match(/.*(.{8})/)[1] // 截取时间戳后八位

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './',
  assetsDir: 'assets',
  lintOnSave: 'warning',
  transpileDependencies: true,
  devServer: {
    open: true,
    port: '9021',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'GET, POST, PUT, DELETE',
      'Access-Control-Request-Headers': '*'
    },
    proxy: {
      api1: {
        target: 'https://xxxxx:9090'
      }
    }
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  css: {
    //重点.
    extract: {
      // 打包后css文件名称添加时间戳
      filename: `css/[name].${Timestamp}.css`,
      chunkFilename: `css/[name].${Timestamp}.css`
    }
  },
  chainWebpack: (config) => {
    // 修改或新增html-webpack-plugin的值
    config.plugin('html').tap((args) => {
      args[0].title = 'vue-ts'
      args[0].releaseTime = ReleaseTime
      args[0].releaseVersion = ReleaseVersion
      return args
    })

    // 配置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
