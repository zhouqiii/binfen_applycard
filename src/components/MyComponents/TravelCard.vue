<template>
    <div>
        <div class="CardBox">
             <div>
                <p class="cardTitle">
                    <slot name="travelTitle"></slot>
                </p>
            </div>
             <div class="box_frame-row cartMark">
                <div class="box_frame_next">
                    <div v-for="(image, index) in travelCard" :key="index" class="nextcard">
                         <div style="margin:.5em .5em;text-align:center">
                            <img :src="image.imgUrl"/>
                        </div>
                        <div style="margin:2% 0% auto 3%">
                            <p class="titleCard">{{image.title}}</p>
                            <p class="cardNumber">{{image.des}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'TravelCard',
    props:['travelList'],
    data(){
        return{
            travelCard:[]
        }
    },
    methods:{
        getHomeData(){
            const list=this.travelList
            Array.prototype.forEach.call(list, item => {
                     this.travelCard.push(item)
            }); 
        }
        },
    watch: {
        travelList(res){
            if(res){
                this.getHomeData()
            }
        },
    },
}
</script>

<style lang="less" scoped>

.box_frame_next{
    width:100%;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    .nextcard{
        padding-bottom:.5em;
        border: 1px solid #333333;
        width: 48%;
        border-radius: 5%;
        .titleCard{
            margin-top: 0%;
        }
        .cardNumber{
            margin-top: 0%;
        }
    }
}

</style>