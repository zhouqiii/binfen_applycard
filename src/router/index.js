import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import("@/views/Home")
  },
  {
    path: '/Page1/:flag',
    name: 'Page1',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page1')
  },
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
    component: () => import(/* webpackChunkName: "applyPage1" */ '@/views/ApplyBasicInfo')
  },
  {
    path: '/ApplyAnoInfo',
    name: 'ApplyAnoInfo',
    component: () => import(/* webpackChunkName: "applyPage2" */ '@/views/ApplyAnoInfo')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
