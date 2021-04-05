
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

// 自动化加载svg目录下所有svg文件，不需要用户手工导入
const  req = require.context("./svg",false,/\.svg$/);
console.log(req);
req.keys().map(req);
// 注册svg-icon组件
Vue.component("svg-icon",SvgIcon);