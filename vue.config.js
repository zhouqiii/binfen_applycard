const path = require("path");
const resolve = dir => require("path").join(__dirname,dir)
module.exports = {
  publicPath: "./",
  // 后续开发直接改为生产包名
  outputDir: "ColorFulLife",
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/style/common_variable.less")] // 引入全局样式变量
    }
  },
  configureWebpack:config => {
    config.name = "ColorFulLife";
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
    //解决跨域
    //最终的访问路径是 target+pathRewrite+ url里写的axios请求时url的部分 
    //比如这里
    //this.requestAxios({
    //url:'/api/cgi.do?txnId=2APO200004&dns=628&gtype=9&attest=-339418059&imei=124545',
    //method: "post",
      //})
      //所以请求时url：https://alex188.cn/AppPrj1/cgi.do?txnId=2APO200004&dns=628&gtype=9&attest=-339418059&imei=124545
    proxy: {
      '/api': {
          target: 'https://alex188.cn/AppPrj1',// 你要请求的后端接口ip+port
          changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          ws: true,// 开启webSocket
          pathRewrite: {
            '^/api': ''// 替换成target中的地址,也就是说axios里的url部分的/api会被换成https://alex188.cn/AppPrj1
          }
      }
  },
    // app是一个express的实例
    before(app) {

    }
  }
}