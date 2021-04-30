<template>
  <div class="commonHeader">
    <div class="main">
      <div class="left" @click="goBack">
        <slot name="back" >
          <img
            src="../assets/icons/icon_back@2x.png"
            alt="图片加载失败"
            class="back back_btn"
          />
        </slot>
      </div>
      <div class="middle title">{{ title }}</div>
      <div class="right">
        <slot name="custom"></slot>
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>
 
<script>
import { callAppMethod } from "@/utils/commonFn";
import DialogMessage from '../components/MyComponents/DialogMessage.vue'
import createDom from '../utils/createDom.js'
export default {
  name: "commonHeader",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "综合账单",
    },
    // type的值：
    // "0":调用客户端的lastGoBack方法，关闭加载H5的webview
    // "1":返回当前项目的上级页面
    // "3":跳转到当前项目的指定页面
    type: {
      type: String,
      default: "1",
    },
    ifDialog:{
      type:String,
      default:'-1'
    }
  },
  methods: {
    goBack() {
      if(this.type==='1' && this.ifDialog==='1'){//因为申请第一步的返回按钮有一个弹框，所以这里用ifDialog==1是弹框
         createDom(
                DialogMessage,
                {},
                {
                    title: '不要走哦，就差一点就申请好了',
                    content: '1、先消费后付款，可以分期可以提现金</br>2、生成良好的个人信用记录</br>3、累计积分，可以免费兑换礼物哦',
                    classAno:'',//绑定一个动态class，修改弹框的标题居中或者靠左
                    show:true
                }
            );
      }else{
        if(this.type==='1'){
          this.$router.go(-1);
        }else if(this.type==='0'){
            callAppMethod({
              callName: "lastGoBack",
            });
        }else{
          return 
        }
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
.commonHeader {
  .main,
  .blank {
    height: 88px;
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }
  .main {
    width: 686px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: content-box;
    background: #fff;
    .left,
    .right {
      flex: 0 0 180px;
      height: 100%;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .back_btn {
        width: 20px;
        height: 32px;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .blank {
  }
}
</style>