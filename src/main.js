import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);
// 引入reset.css
import "normalize.css"
import CalendarT from 'vant';
import 'vant/lib/index.css';

Vue.use(CalendarT);

// 引入公共样式
import "@/style/common-style.less"
import  "@/style/common-style.css" 
import "@/style/common-box.less"
// 引入判断操作系统及app版本的函数并且添加到prototype上
import { APPSYS } from "@/utils/commonFn";
Vue.prototype.APPSYS = APPSYS;
// 引入request并添加到prototype上
import { request } from "@/utils/request"
Vue.prototype.request = request;
// 引入创建dom的函数并且添加到prototype上

import { requestAxios } from "@/utils/axios"
Vue.prototype.requestAxios = requestAxios;
import createDom from "@/utils/createDom"
Vue.prototype.createDom = createDom;

// 引入自动化引入icons/svg文件夹下所有svg的js文件
import "@/assets/icons"

// 查看ajax的插件，提交生产包的时候记得注释掉
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(ElementUI);
Vue.config.productionTip = false
//全局引入header
import CommonHeader from './components/CommonHeader.vue'
Vue.component('common-header',CommonHeader)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

