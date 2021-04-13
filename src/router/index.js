import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"*",
    name:"NotFound",
    component:() => import(/* webpackChunkName: "notFound" */ '@/components/NotFound')
  },
  {
    path: '/',
    name: 'MyHome',
    component: () => import("@/views/MyHome")
  },
  {
    path: '/ApplyBasicInfo',
    name: 'ApplyBasicInfo',
    component: () => import(/* webpackChunkName: "applyPage1" */ '@/views/ApplyBasicInfo'),
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/ApplyAnoInfo',
    name: 'ApplyAnoInfo',
    component: () => import(/* webpackChunkName: "applyPage2" */ '@/views/ApplyAnoInfo')
  },
  {
    path: '/ApplyServiceInfo',
    name: 'ApplyServiceInfo',
    component: () => import(/* webpackChunkName: "applyPage3" */ '@/views/ApplyServiceInfo')
  },
  {
    path: '/ApplyEnd',
    name: 'ApplyEnd',
    component: () => import(/* webpackChunkName: "applyPageEnd" */ '@/views/ApplyEnd')
  },
  {
    path: '/ApprovalList',
    name: 'ApprovalList',
    component: () => import(/* webpackChunkName: "progressList" */ '@/views/ApprovalList')
  },
  {
    path: '/QueryProgress',
    name: 'QueryProgress',
    component: () => import(/* webpackChunkName: "progress" */ '@/views/QueryProgress')
  },
  {
    path: '/AgreementDescription',
    name: 'AgreementDescription',
    component: () => import(/* webpackChunkName: "agreement" */ '@/views/AgreementDescription')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
