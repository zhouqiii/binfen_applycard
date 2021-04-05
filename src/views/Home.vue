<template>
  <div class="home">
    <div class="main">home页面</div>
    <svg-icon-test></svg-icon-test>
    <svg-icon icon-class="cart"></svg-icon>
    <div @click="getInfo" class="testBtn btn_big btn_red">测试和后台交互</div>
    <div @click="showDialog" class="testBtn btn_big btn_red">测试弹框</div>
    <div @click="showToast" class="testBtn btn_big btn_red">测试toast</div>
    <div class="bottom">home页面的底部</div>
    <router-link :to="{name:'Page1',params:{flag:'1'}}">去往Page1</router-link>

    <br />
    <div class="formssi-btn formssi-btn_red">普通按钮</div>
    <br />
    <div class="testBtn formssi-btn formssi-btn-sm formssi-btn_red">
      普通按钮small
    </div>
    <div class="testBtn formssi-btn formssi-btn-lg formssi-btn_red ">
      普通按钮large
    </div>
    <div class="testBtn formssi-btn formssi-btn-lg formssi-btn_white ">
      普通按钮large white
    </div>
    <div class="testBtn formssi-btn formssi-btn-lg formssi-btn_disabled ">
      普通按钮large disabled
    </div>
    <div class="testBtn formssi-btn formssi-btn-lg formssi-btn_delete ">
      普通按钮large delete
    </div>
    <img/>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Toast from "@/components/Toast";
import createDom from "@/utils/createDom";
import { callAppMethod } from "@/utils/commonFn";
import svgIconTest from '@/views/test/svg_icon_test.vue';
console.log(callAppMethod);
export default {
  name: "Home",
  components:{
svgIconTest
  },
  methods: {
    // 测试与后台的交互
    getInfo() {
      this.request({
        // url: "https://www.alex188.cn/AppPrj/test.do",
        url: "http://i.baidu.com/calendars/calendars/listInfo",
        data: {
          name: "lisong",
        },
        params: {
          age: 18,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 测试弹框
    showDialog() {
      createDom(
        Dialog,
        {},
        {
          title: "测试的标题",
          content: "测试的内容",
          cancelText: "取消",
          confirmText: "确定",
          confirmCallback() {
            console.log("这是成功的回调");
          },
          cancelCallback() {
            console.log("这是失败的回调");
          },
        }
      );
    },
    // 测试toast
    showToast() {
      const toast = this.createDom(Toast, {
        showToast: true,
        toastText: "绑卡失败",
      });
      console.log(toast);
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.home {
  .testBtn {
    margin: 20px auto;
  }
}
</style>
