<template>
  <div class="dialog">
    <div class="dialog_box">
      <div class="dialog_title" v-show="title">{{ title }}</div>
      <div class="dialog_content">{{ content }}</div>
      <div class="dialog_btn_group">
        <div
          class="btn cancel_btn"
          v-show="cancelText"
          @click="
            cancelCallback();
            hide();
          "
        >
          {{ cancelText }}
        </div>
        <div
          class="btn confirm_btn" :class="{warnText:type === 'warn'}"
          @click="
            confirmCallback();
            hide();
          "
        >
          {{ confirmText || "确定" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      type:"",
      title: "",
      content: "",
      cancelText: "",
      confirmText: "",
    };
  },
  methods: {
    cancelCallback() {},
    confirmCallback() {},
    hide() {
      this.remove();
    },
  },
  // props: {
  //   dialogTitle: {
  //     type: String,
  //     default: "",
  //   },
  //   dialogContent: {
  //     type: String,
  //     default: "",
  //   },
  //   cancelText: {
  //     type: String,
  //     default: "",
  //   },
  //   confirmText: {
  //     type: String,
  //     default: "确定",
  //   },
  // },
};
</script>

<style lang="less" scoped>
.warnText{
  color: #F44336;
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background: rgba(0, 0, 0, 0.6);
  .flex_center;
  .dialog_box {
    width: 560px;
    height: auto;
    padding-top: 60px;
    background: #fff;
    border-radius: 10px;
    .dialog_title {
      height: 36px;
      max-height: 100%;
      font-size: 18px;
      font-weight: bold;
      .flex_center;
    }
    .dialog_content {
      min-height: 30px;
      margin-top: 30px;
      padding: 0 32px;
      max-height: 100%;
      font-size: 14px;
      word-break: break-all;
      .flex_center;
    }
    .dialog_btn_group {
      height: 90px;
      margin-top: 50px;
      border-top: 1px solid #e5e5e5;
      .flex_center;
      .cancel_btn,
      .confirm_btn {
        .flex_center;
        flex: 1 1 50%;
        height: 100%;
        font-size: 16px;
      }
      .cancel_btn{
        border-right: 1px solid #e5e5e5;
      }
      .confirm_btn {
        color: #f72539;
        // border-left: 1px solid #e5e5e5;
      }
    }
  }
}
</style>