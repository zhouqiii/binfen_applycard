<template>
  <!-- <div class="loading" v-show="loadingShow"> -->
  <div class="loading">
    <div class="loading_bg">
      <img src="../assets/icons/icon_loading.png" alt="" class="loading_img" />
    </div>
  </div>
</template>

<script>
export default {
  name:"Loading",
  data(){
    return{
      // loadingShow:false
    }
  },
  methods: {
    show() {
      // this.loadingShow = true;
    },
    hide(){
      // this.loadingShow = false;
      this.remove();
    }
  },
};
</script>

<style lang="less" scoped>
.loading{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .loading_bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.1);
        display:flex;
        justify-content: center;
        align-items: center;
        img.loading_img{
            width: 40px;
            height: 40px;
            -webkit-animation: loading 2s steps(9,end) infinite;
            -moz-animation: loading 2s steps(9,end) infinite;
            -o-animation: loading 2s steps(9,end) infinite;
            animation: loading 2s steps(9,end) infinite;
        }
    }
}
@keyframes loading {
    0%{
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}
</style>