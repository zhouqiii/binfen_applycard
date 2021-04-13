<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive' :include="keepAliveList"/>
    </keep-alive>
    <!-- :include="keepAliveList"v-if='!$route.meta.keepAlive'想在ApplyBasicInfo(A)和AgreementDescription(B)页面中，从A到B在返回A时保存A页面已经填写的信息，测试已可以实现，但是会出现携带上次数据的问题还没解决-->
      <router-view v-if='!$route.meta.keepAlive'/>
  </div>
</template>
<script>

export default {
  data(){
    return{
      keepAliveList:this.$store.state.module3.keepAliveList//include的绑定的是要缓存的组件
    }
  }
}
</script>

<style lang="less">
#app{
  padding-bottom: env(safe-area-inset-bottom)!important;//iphoneX用constant无效，单ios11用contant
  padding-bottom: constant(safe-area-inset-bottom)!important;
}
</style>
