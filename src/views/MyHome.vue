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
          <swiper-card  :images="imagesSwip"></swiper-card>
          <div class="boxHomeHot">
             <hot-card :images="images" :showApply="showApply" :showProgress="showProgressGive">
                <template v-slot:hotTitle>{{hotTitle}}</template>
            </hot-card>
          </div>
        </div>
        <special-card :cardMsg="cardMsgT">
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
         <special-card :cardMsg="cardShow" :className="flexWrap">
           <template v-slot:specialTitle>{{studyTitle}}</template>
        </special-card>
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
    sendMeg(){
       this.requestAxios({
        url: "http://i.baidu.com/calendars/calendars/listInfo",
        data: {
          name: "xiaoming",
        },
        params: {
          age: 18,
        },
         method: "post",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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