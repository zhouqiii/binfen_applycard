<template>
  <div class="dialog">
    <div class="dialog_box">
      <div id="dialog_title" v-show="title" :class="classNext">{{ title }}</div>
      <div class="dialog_content" >
        <pre>{{ content }}</pre>
        </div>
      <!-- <div class="dialog_btn_group">
      </div> -->
    </div>
    <div class="dialog_icon" @click="dialogHide">
      <svg-icon iconClass="cancelDialog"></svg-icon>
    </div>
  </div>
</template>


<script>
import SvgIcon from '../SvgIcon.vue';
export default {
  components: { SvgIcon },
  name: "DialogMessage",
  props:['classAno'],
  data() {
    return {
      title: "",
      content: "",
      classNext:''
    };
  },
  methods: {
    dialogHide() {
      // let body = document.body;
      // body.style.position = '';
      // let top = body.style.top;
      // document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
      // body.style.top = '';
      this.remove();
    },

  },
  watch:{
    classAno(){
      this.classNext=this.classAno
    }
  }
  
};
</script>

<style lang="less" scoped>
div  pre{
        white-space: pre-wrap; /*css-3*/
	white-space: -moz-pre-wrap; /*Mozilla,since1999*/
	white-space: -pre-wrap; /*Opera4-6*/
	white-space: -o-pre-wrap; /*Opera7*/
	word-wrap: break-word; /*InternetExplorer5.5+*/
  }
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
  flex-direction:column;
  top: 0;
  left: 0;
  z-index: 11;
  background: rgba(0, 0, 0, 0.6);
  .flex_center;
  .dialog_box {
    width: 560px;
    padding: 40px 32px;
    background: #fff;
    border-radius: 10px;
    overflow-y: hidden;
    #dialog_title {
      height: 36px;
      margin-bottom: 32px;
      max-height: 100%;
      font-size: 14px;
      font-weight: bold;
      color: #f72539;
      .flex_center;
    }
    .dialog_content {
      min-height: 30px;
      // margin-top: 30px;
      overflow-y: auto;
      height: 90%;
      font-size: 14px;
      word-break: break-all;
      display: inline-block;
      width: 100%;
	    white-space: normal
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
  .dialog_icon{
    font-size: 32px;
    margin: 1em;
  }
}
</style>