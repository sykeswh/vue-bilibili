// vue.config.js
/* const path = require("path");
const webpack = require("webpack"); */
module.exports = {
    //部署应用包时的基本 URL
    publicPath:process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist', // 打包的目录
    assetsDir: '',/* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    filenameHashing:true,//文件名哈希
    lintOnSave: 'warning', // 开启每次保存都进行检测，lint 错误将显示到控制台命令行，而且编译并不会失败。
    runtimeCompiler: false,//是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
    productionSourceMap: false, /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    devServer: {
      open: true, // 启动服务后是否打开浏览器
      host: '0.0.0.0', /* 设置为0.0.0.0则所有的地址均能访问 */
      port: 8082, // 服务端口
      https: false,//启用http
      hotOnly: false,
      disableHostCheck:true,
      proxy: {
         "/api":{
           target:"http://localhost:6000",
           changeOrigin:true,
           ws:true,
           secure: false,
           pathRewrite:{
             "^/api":""
           }
         }     
      }
    }
  }