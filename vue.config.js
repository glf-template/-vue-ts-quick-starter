const { defineConfig } = require('@vue/cli-service')

const ReleaseVersion = require('./package.json').version

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

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './',
  assetsDir: 'assets',
  lintOnSave: 'warning',
  transpileDependencies: true,
  devServer: {
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
  chainWebpack: (config) => {
    // 修改或新增html-webpack-plugin的值
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE
      args[0].releaseTime = ReleaseTime
      args[0].releaseVersion = ReleaseVersion
      return args
    })
  }
})
