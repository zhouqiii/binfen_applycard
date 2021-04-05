import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 使用require.context(webpack的api)自动化读取modules文件夹下所有的js文件
// 把modules文件夹下的所有模块添加到modules对象中，避免一个模块一个模块的添加代码比较繁琐
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
export default new Vuex.Store({
  // modules文件夹下所有拆分的模块
  modules,
  // 全局公用的四个对象可以写在这里，也可以拆分成一个专门存放公用状态的module
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
