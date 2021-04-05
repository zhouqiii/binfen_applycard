const path = require("path");
const resolve = dir => require("path").join(__dirname,dir)
module.exports = {
  publicPath: "./",
  // 后续开发直接改为生产包名
  outputDir: "dist",
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/style/common_variable.less")] // 引入全局样式变量
    }
  },
  configureWebpack:config => {
    config.name = "项目名称";
    // config.resolve.alias.comps = require("path").join(__dirname, "src/components");
  },
  chainWebpack(config){
    // 1、webpack中本来有处理svg的rule，需要过滤掉icons/svg
    config.module.rule("svg")
    .exclude.add(resolve("src/assets/icons"));
    // 2、svg-loader配置
    config.module.rule("icons")
    .test(/\.svg$/)
    .include.add(resolve("src/assets/icons")).end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId:"icon-[name]"
    })
  },
  devServer: {
    // app是一个express的实例

    before(app) {

    }
  }
}