<template>
    <div>
        <div class="CardBox">
            <div>
                <p class="cardTitle">
                    <slot name="hotTitle"></slot>
                </p>
            </div>
            <div class="box_frame cartMark">
                <div class="card" v-for="(image, index) in images" :key="index">
                    <div>
                        <img :src="image.imgUrl"/>
                    </div>
                    <div style="width:62%;margin:auto 0% auto 3%">
                        <p class="titleCard">{{image.title}}</p>
                        <p class="cardNumber">{{image.des}}</p>
                    </div>
                    <div style="margin:auto">
                        <div class="applyCard" @click="gotoApplyPage(image.id)">
                            申请
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'HotCard',
    props: ['images','cardTitle'],
    computed: {
        imgUrlT(){
            return this.imgUrl
        }
    },
    methods:{
        gotoApplyPage(id){
             this.$router.push({
                name: 'ApplyBasicInfo',
                params: {
                    id: id
            }
        })
        }
    }
}
</script>

<style lang="less" scoped>
.CardBox{
    .cartMark{
        .card{
            display: flex;
            flex-direction:row;
            margin-bottom: 3%;
            p{
                margin-top: 0;
            }
            .applyCard{
                height: 1.6em;
                width: 5em;
                background-color: gray;
                border-radius: 40%;
                text-align: center;
                line-height: 1.6em;
                color: #ffffff;

            }
        }
    }
}

</style>