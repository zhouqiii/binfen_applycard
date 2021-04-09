<template>
    <div>
        <div class="CardBox">
             <div>
                <p class="cardTitle">
                    <slot name="specialTitle"></slot>
                </p>
            </div>
             <div class="box_frame-row" :class="boxHeight">
                 <slot name="specialCard">
                 </slot>
                <div :class="box_frame_next">
                    <div v-for="(image, index) in nextCard" :key="index" class="nextcard">
                        <div style="margin:2% 0% auto 3%">
                            <p class="titleCard">{{image.title}}</p>
                            <p class="cardNumber">{{image.des}}</p>
                        </div>
                        <div style="margin:.5em .5em;text-align:right">
                            <img :src="image.imgUrl"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'SpecialCard',
    props:['cardMsg','cardShow','className','boxClassName'],
    data(){
        return{
            mainCard:{},
            nextCard:[]
        }
    },
    methods:{
        getHomeData(){
            const list=this.cardMsg
            Array.prototype.forEach.call(list, item => {
                     this.nextCard.push(item)
            }); 
        }
        },
    watch: {
        cardMsg(res){
            if(res){
                this.getHomeData()
            }
        },
        cardShow(res){
            if(res){
                this.getHomeData()
            }
        }
    },
    computed:{
        //这两个样式是为了在主题热卡中解决组件复用时样式bug
         box_frame_next(){
                if(this.className){
                    return `box_frame_next ${this.className}`
                }else{
                    return `box_frame_next`
                }
        },
        boxHeight(){
            if(this.boxClassName){
                return `${this.boxClassName}`
            }else{
                return ``
            }
        }
    }
}
</script>

<style lang="less" scoped>
.CardBox{
    display: flex;
    flex-direction: column;
}
.wrap{
  flex-wrap: wrap !important;
  flex-direction:row !important;
  width: 100% !important;
  .nextcard{
    width: 48% !important;
    margin-bottom:3%
  }
}
.box_frame_next{
    width: 45%;
    display: flex;
    justify-content: space-between;
    flex-direction:column;
    .nextcard{
        border: 1px solid #333333;
        border-radius: 5%;
        .titleCard{
            margin-top: 0%;
        }
        .cardNumber{
            margin-top: 0%;
        }
    }
    .active{
        // margin-top: 2%;
    }
}
.boxHeight{
    height: 12rem;
    .giveHeight{
        height: 100%;
    }
}


</style>