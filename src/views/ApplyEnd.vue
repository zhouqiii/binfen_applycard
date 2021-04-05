<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
        </common-header>
        <div>
            <div class="responsePage">
                <div class="box_frameCheck">
                    <div style="width:60%;text-align: center;margin:auto">
                         <svg-icon v-if="msgIcon" iconClass="applySec" class="stateIcon"></svg-icon>
                        <svg-icon v-if="!msgIcon" iconClass="applyErr" class="stateIcon"></svg-icon>
                        <p class="atitle">{{applyTitle}}</p>
                        <p v-show="cardNumber">{{applyNum}}</p>
                        <div class="box_frame-row">
                            <div class="backBtn" @click="goToHome">返回首页</div>
                            <div class="backList"  @click="goToList">返回卡列表</div>
                        </div>
                    </div>
                </div>
                <div class="CardBox">
                    <p class="titleCard" style="margin-top:0">服务说明</p>
                    <div class="pGoal">
                        <p class="cardNumber">• 信用卡审核结果系统将短信通知你</p>
                        <p class="cardNumber">• 数字信用卡为数字虚拟卡，不邮寄实体卡</p>
                        <p class="cardNumber">• 可通过编号用于后续查看申请进度</p>
                    </div>
                </div>
            </div>
            <div class="resHome">
                <hot-card :images="images" CardBoxPatent="CardBox" :showApply="showApply" :showProgress="showProgressGive">
                    <template v-slot:hotTitle>{{hotTitle}}</template>
                </hot-card>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../components/SvgIcon.vue'
import axios from 'axios'
export default {
  components: { SvgIcon},
    name:'ApplyEnd',
    data(){
        return{
            title:'提交页面',
            msgIcon:'',
            applyTitle:'',
            applyNum:'',
            cardNumber:true,
            hotTitle:'畅销热卡',
            images:'',
            showApply:true,
            showProgressGive:false
        }
    },
    methods:{
        goBack(){
             this.$router.go(-1)
        },
        getHomeData: function() {
            axios.get('/mock/index.json').then(this.getHomeDataSucc)
        },
        getHomeDataTest(){
            this.msgIcon = true
            this.applyTitle = '信用卡申请成功'
            this.applyNum = `申请件编号：0325363457488`
        },
        getHomeDataSucc(res) {
            res = res.data
            if(res.ret&&res.data) {
            this.images = res.data.HotList
          
        }
    },
        goToHome(){
            this.$router.push({
                name: 'MyHome',
                params:{
                    id:this.$route.params.id
                },
            })   
        },
        goToList(){
            this.$router.push({
                name: 'ApprovalList',
                params:{
                    id:this.$route.params.id
                },
            })      
        }
        

    },
    mounted () {
        this.getHomeDataTest()
        this.getHomeData()
    },
}
</script>
<style lang="less" scoped>

.responsePage{
    color: #ffffff;
    position: relative;
    .CardBox{
        // position: absolute;
        background: #ffffff;
        width: -webkit-fill-available;
        margin-top: -9%;
    }
    .box_frameCheck{
        display: flex;
        flex-direction:column;
        padding: 7% 0 15% 0;
        background: #333333b8;
        margin: auto;
        .atitle{
            font-size: 1.5em;
            margin-top: .5em;
        }
        p{
            margin-bottom: 0;
            margin-top: .8em;
        }
        .stateIcon{
            font-size: 2rem;
            margin: auto;
        }
        .box_frame-row{
            margin-top: .8em;
            .backBtn{
                height: 2.2em;
                width: 6em;
                background: rgb(211, 202, 202);
                border-radius: 2em;
                line-height: 2.2em;
            }
            .backList{
                height: 2.2em;
                width: 9em;
                background: #0c0808a1;
                border-radius: 2em;
                line-height: 2.2em;
            }
        }
    }
    .resHome{
        padding: auto 3%;
    }
}
 .pGoal{
            p{
                margin: 0;
            }
        }
</style>
