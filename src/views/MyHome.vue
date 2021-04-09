<template>
    <div>
        <common-header :title="title">
           <template v-slot:back>
            <svg-icon iconClass="fanhuijiantou"></svg-icon>
          </template>
          <template v-slot:custom>
            <svg-icon iconClass="shareBold"></svg-icon>
          </template>
        </common-header>

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
                      <p class="titleCard">{{mainCard.title}}</p>
                      <p class="cardNumber">{{mainCard.des}}</p>
                  </div>
                  <div style="margin:1em auto;">
                      <img :src="mainCard.imgUrl"/>
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
        <div class="bottomText">
          <p>中国信用信用卡伴你随行，让你的生活更美好</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import SwiperCard from '../components/MyComponents/SwiperCard.vue'
import HotCard from '../components/MyComponents/HotCard.vue'
import SpecialCard from '../components/MyComponents/SpecialCard.vue'
import TravelCard from '../components/MyComponents/TravelCard.vue'

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
        images:'',
        imagesSwip:'',
        hotTitle:'畅销热卡',
        specialTitle:'主题特色',
        studyTitle:'留学必备',
        travelTitle:'旅游出行',
        flexWrap:'wrap',
        mainCard:{},
        cardMsgT:[],
        cardShow:'',
        travelListT:'',
        showApply:true,
        showProgressGive:false

    }
},
methods:{
  //加载所有信用卡信息，与数据对应
    sendMeg(){
        // let proxy = {
        //     host: "192.168.50.1", //代理服务器地址
        //     port: 8888,//端口
        //     auth: { // auth认证信息，阿布云那边有，squid 的话不需要
        //         username: '',password: ''
        //     }
        // };
      this.requestAxios({
        url: "http://192.168.50.1:8888/cardlist",
        // proxy:proxy,
        data: {
          name: "xiaoming",
        },
        params: {
        },
         method: "post",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          //console.log(err);
        });
},
    getHomeData: function() {
        axios.get('/mock/index.json').then(this.getHomeDataSucc)
    },
    getHomeDataSucc: function(res) {
        res = res.data
        if(res.ret&&res.data) {
          this.imagesSwip=res.data.SwipeList
          this.images = res.data.HotList
          this.cardShow = res.data.showList
          this.travelListT = res.data.TravelList
          //this.cardMsgT = res.data.SpecialList
          Array.prototype.forEach.call(res.data.SpecialList, item => {
                    if(item.id==1){
                          this.mainCard=item
                  }else{
                          this.cardMsgT.push(item)
                  }
          }); 
        }
        console.log(this.cardMsgT)
    }
},
mounted () {
  this.getHomeData()
  // this.sendMeg()
},
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
    border: 1px solid #333333;
    border-radius: 5%;
    width: 50%;
}
.bottomText{
  margin: .5em;
  text-align: center;
}

</style>