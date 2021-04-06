<template>
    <div>
        <div :class="CardBox">
            <div>
                <p class="cardTitle" :class="{ active: isActive }" >
                    <slot name="hotTitle"></slot>
                </p>
            </div>
            <div class="box_frame cart" :class="{activeBox: borActive}" v-for="(image, index) in images" :key="index">
                <p v-if="showTime" class="cardNumber" style="margin-bottom:.8em">申请时间： {{image.time}}</p>
                <div class="card" >
                    <div>
                        <img :src="image.imgUrl"/>
                    </div>
                    <div style="width:62%;margin:auto 0% auto 3%">
                        <p class="titleCard">{{image.title}}</p>
                        <p class="cardNumber">{{image.des}}</p>
                    </div>
                    <div style="margin:auto" v-if="showApplyGet">
                        <div class="applyCard" @click="gotoApplyPage(image.id)">
                            申请
                        </div>
                    </div>
                     <div style="margin:auto"  v-if="showProgressGet">
                        <div class="applyProgress" @click="gotoProgress(image.id)">
                            {{image.progress}}
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
    props: ['images','CardBoxPatent','padActive','borderActive','showApply','showProgress'],
    data(){
        return{
            CardBox:this.CardBoxPatent,
            isActive:this.padActive,
            showTime:true,
            borActive:this.borderActive,
            showApplyGet:this.showApply,
            showProgressGet:this.showProgress
        }
    },
    computed: {
    },
    methods:{
        gotoApplyPage(id){
             this.$router.push({
                name: 'ApplyBasicInfo',
                params: {
                        id: id
                }
            })
        },
        gotoProgress(id){
            let getShowData={}
            Array.prototype.forEach.call(this.images, item => {
                if(item.id==id){
                    getShowData=item
                }
            }); 
            this.$router.push({
                name: 'QueryProgress',
            })
            localStorage.setItem('data',JSON.stringify(getShowData));
        },
    },
    watch:{
        images(){
            Array.prototype.forEach.call(this.images, item => {
                  if(!item.time){
                      this.showTime=false
                  }
          }); 
        },
    }

}
</script>

<style lang="less" scoped>
    .cart{
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
                border-radius: 1em;
                text-align: center;
                line-height: 1.6em;
                color: #ffffff;
            }
        }
    }
    //在查看卡片列表时使用该组件的样式变化
    .CardBoxList{
        width: -webkit-fill-available;
        margin: .5em;
        .active{
            padding-left: 24px;
            margin-top: 1em;
            margin-bottom: 1%;
        }
        .activeBox{
            padding: 0 24px;
            border: 1px solid #83757569;
            border-radius: 16px;
            background: #ffffff;
            margin-bottom: 2%;
            .applyProgress{
                height: 1.6em;
                width: 6em;
                background-color: #c16930;
                border-radius: 1em;
                text-align: center;
                line-height: 1.6em;
                color: #ffffff;
            }
        }
    }
    //进度查询样式
    .CardBoxQuery{
        padding: 0 1.25em;
        background: #ffffff;
    }

</style>