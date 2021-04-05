<template>
  <div>
    <div class="toast_bg" :class="{ showToast: showToast }">
      <div class="toast">{{ toastText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      //   toastText: "",
      //   showToast:false
    };
  },
  props: {
    showToast: {
      type: Boolean,
      default: false,
    },
    toastText: {
      type: String,
      default: "服务出错",
    },
  },
  methods: {
    hide() {
      this.remove();
    },
  },
  created() {
    
  },
  mounted () {
    setTimeout(() => {
      this.hide();
    }, 2000);
  },
};
</script>

<style lang="less" scoped>
.showToast {
  animation: showToast linear 2s forwards;
}
.toast_bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  .toast {
    position: absolute;
    top: 35%;
    left: 150px;
    width: 350px;
    padding: 45px;
    text-align: center;
    margin-top: 200px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    color: #fefefe;
    line-height: 1;
    border-radius: 8px;
    transition: all 1s ease-in-out;
  }
}

@keyframes showToast {
  0% {
    display: none;
    opacity: 0;
  }
  25% {
    display: block;
    opacity: 1;
  }
  50% {
    display: block;
    opacity: 1;
  }
  75% {
    display: block;
    opacity: 0.5;
  }
  100% {
    display: none;
    opacity: 0;
  }
}
</style>