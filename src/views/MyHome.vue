<template>
    <div>
        <common-header :title="title" :type="applyBack">
          <template v-slot:custom>
            <svg-icon iconClass="shareBold"></svg-icon>
          </template>
        </common-header>
        <div v-show="show">
            <div class="boxHomeSwip">
                <!--轮播图-->
                <swiper-card  :images="imagesSwip"></swiper-card>
                <!--畅销热卡-->
                <div class="boxHomeHot">
                  <hot-card :images="images" :showApply="showApply" :showProgress="showProgressGive">
                      <template v-slot:hotTitle>{{hotTitle}}</template>
                  </hot-card>
                </div>
            </div>
            <!--主题卡-->
            <special-card :cardMsg="cardMsgT" className="giveHeight" boxClassName="boxHeight">
              <template v-slot:specialTitle>{{specialTitle}}</template>
              <template v-slot:specialCard>
                  <div class="box_frame">
                      <div style="margin:auto 2%">
                          <p class="titleCard">{{mainCard.cardName}}</p>
                          <p class="cardNumber">{{mainCard.cardIntro}}</p>
                      </div>
                      <div style="margin:1em auto;">
                          <img :src="mainCard.defaultPic"/>
                      </div>
                  </div>
              </template>
            </special-card>
            <!--留学卡-->
            <special-card :cardMsg="cardShow" :className="flexWrap">
              <template v-slot:specialTitle>{{studyTitle}}</template>
            </special-card>
            <!--旅游卡-->
            <travel-card :travelList="travelListT">
                <template v-slot:travelTitle>{{travelTitle}}</template>
            </travel-card>
            <div>
              <p  class="bottomText">中国信用信用卡伴你随行，让你的生活更美好</p>
            </div>
        </div>
    </div>
</template>
<script>
import SwiperCard from '../components/MyComponents/SwiperCard.vue'
import HotCard from '../components/MyComponents/HotCard.vue'
import SpecialCard from '../components/MyComponents/SpecialCard.vue'
import TravelCard from '../components/MyComponents/TravelCard.vue'
import { callAppMethod } from '@/utils/commonFn';
export default {
  components: { 
   SwiperCard,
   HotCard,
   SpecialCard,
   TravelCard
   },
data(){
    return{
        title:'信用卡全部卡片',
        images:[],
        show:false,
        imagesSwip:'',
        hotTitle:'畅销热卡',
        specialTitle:'主题特色',
        studyTitle:'留学必备',
        travelTitle:'旅游出行',
        flexWrap:'wrap',
        mainCard:{},
        cardMsgT:[],
        cardShow:[],
        travelListT:[],
        showApply:true,
        showProgressGive:false,
        applyBack:'0',
    // type的值：
    // "0":调用客户端的lastGoBack方法，关闭加载H5的webview
    // "1":返回当前项目的上级页面
    // "3":跳转到当前项目的指定页面

    }
},
methods:{
  //加载所有信用卡信息，与数据对应
    getHomeData(){  
      this.requestAxios({
        url:'/api/cgi.do?txnId=2APO200011&dns=628&gtype=9&attest=-339418059&imei=124545',
        method: "post",
      })
        .then((res) => {
          const data = JSON.parse(res.data).body;
          const state = JSON.parse(res.data).stat;
          if (res.code === '00') {
            if (state === '00') {
              this.getHomeDataSucc(data);
            } else {
              this.$toast('数据加载失败！');
            }
          } else if (res.code === '-501' || res.code === '-505') {
            // 登录超时，需要调用客户端方法，进行登录
            callAppMethod({
              callName: 'toLogin',
            });
          } else {
            this.$toast('信息异常！');
          }
        })
        .catch((err) => {
        });
    },
    //在接口拿到数据后，在getHomeDataSucc给信用卡首页每个列表赋值
    getHomeDataSucc: function(data) {
      this.show=true
      let arr=[]
      if(data.list){
        for (let item of data.list){
            if(item.type==='0'){//畅销热卡
              this.images.push(item)
            }else if(item.type==='2'){//留学卡
              this.cardShow.push(item)
            }else if(item.type==='1'){//主题卡
              arr.push(item)
            }else if(item.type==='3'){//旅行卡
              this.travelListT.push(item)
            }
        }
        sessionStorage.setItem('hotcard',JSON.stringify(this.images))//因为申请结果页面还有一个场营销热卡
        for(let [key,value] of arr.entries()){
          if(key===0){//主题卡分了两个，左边是maincard
            this.mainCard=value
          }else{
            this.cardMsgT.push(value)
          }
        }
      }if(data.pics){
        this.imagesSwip=data.pics//轮播图
      }
    },
},
mounted () {
  this.getHomeData()
}
}
</script>
<style lang="less" scoped>
.boxHomeSwip{
    margin: 1em;
    border-bottom: 1px solid #83757569;
    border-radius: 16px;
    background: #ffffff;
    .boxHomeHot{
      padding: 0 24px;
    }
}
.box_frame{
    border: 1px solid #83757569;
    border-radius: 5%;
    width: 48%;
}


</style>