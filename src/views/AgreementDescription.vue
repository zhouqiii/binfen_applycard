<template>
  <div>
    <common-header :title="title">
        <template v-slot:back>
            <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
        </template>
    </common-header>
    <div>
        <div class="descText">
          <p class="descTitle">中国银行股份有限公司信用卡领用合约</p>
          <div class="descContent">
            <p>甲方：中国银行股份有限公司信用卡主卡申请人/主卡持卡人/附属卡申请人/附属卡持卡人（如无特别说明，甲方指上述主体中的全部或任何一方）</p>
            <p>乙方：中国银行股份有限公司</p>
            <p>
               基于甲方知悉、理解并遵守《中国银行股份有限公司信用卡章程》（以下简称“《章程》”）、本合约，甲方自愿向乙方申请使用中国银行股份有限公司信用卡（以下称“信用卡”），就信用卡的申领和使用等相关事宜，甲乙双方签订如下合约：
            </p>
            <p> 第一条 申领</p>
            </br>
            <p> 1.甲方保证向乙方提供的所有申请资料真实、完整、准确、合法、有效，其中手机号码应与甲方一一对应，如有因甲方办理附属卡等使用同一手机号的合理情形，甲方应出具相关说明。无论申请成功与否，甲方同意乙方可以保留相关申请资料，无须退还。申请资料须由甲方本人亲自签名确认。</p>
            </br>
            <p> 甲方同意并授权，乙方有权出于相关信用卡业务（包括但不限于信用卡审批、用卡管理及风险评估与管理、为甲方提供服务）的需要，向个人信用信息基础数据库、公安部全国公民身份证号码查询服务中心、中国银联股份有限公司。</p>
             <p> 第二条 申领</p>
            </br>
            <p> 1.甲方保证向乙方提供的所有申请资料真实、完整、准确、合法、有效，其中手机号码应与甲方一一对应，如有因甲方办理附属卡等使用同一手机号的合理情形，甲方应出具相关说明。无论申请成功与否，甲方同意乙方可以保留相关申请资料，无须退还。申请资料须由甲方本人亲自签名确认。</p>
            </br>
            <p> 甲方同意并授权，乙方有权出于相关信用卡业务（包括但不限于信用卡审批、用卡管理及风险评估与管理、为甲方提供服务）的需要，向个人信用信息基础数据库、公安部全国公民身份证号码查询服务中心、中国银联股份有限公司。</p>
          </div>
        </div>
        <div class="agreeBottom" @click="agreeContract">
            <p>同意</p>
        </div>
    </div>
  </div>
</template>


<script>
import CommonHeader from '../components/CommonHeader.vue';
export default {
  components: {CommonHeader  },
  name: "AgreementDescription",
  props:[],
  data() {
    return {
      title: "用户服务协议",
      check:'',
    };
  },
  methods: {
    goBack(){//如果直接返回，则保持之前的checkbox状态
       this.$router.push({
            name: 'ApplyBasicInfo',
            //这里因为我还没有完全解决页面跳转使用vuex+路由守卫使页面数据保存，所以我把数据保存在params里，先达到一样的功能
            // params:{
            //     dataKeep:this.$route.params.dataKeep,
            //     dataFlag:this.$route.params.dataFlag
            // }
           
        })
    },
   agreeContract(){
     this.check=true//如果点击了同意，将this.check变为true并修改state
     this.$store.state.module3.check=this.check
     this.$router.push({
            name: 'ApplyBasicInfo',
            // params:{//同上
            //     dataKeep:this.$route.params.dataKeep,
            //     dataFlag:this.$route.params.dataFlag
            // }
        })
   }

  },
  mounted(){
   
  },
  beforeRouteLeave(to, from, next) {
    if(to.name=='ApplyBasicInfo'){
        to.meta.keepAlive = true
    }
    next()
  }
}
</script>

<style lang="less" scoped>
.descText{
  padding: 0 3% 80px 3%;
  .descTitle{
    font-weight: bold;
    text-align: center;
    margin: 1em 0;
  }
  .descContent{
    p{
      text-indent: 2em;
      margin-top: 0;
      margin-bottom: 0;
      line-height: 1.5em;
    }
  }
}

.agreeBottom{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 150px;
    text-align: center;
    color: rgb(238, 68, 68);
    font-size: 16px;
    border-top: 1px solid #8080801f;
    width: 100%;
    background: #ffffff;
}
</style>