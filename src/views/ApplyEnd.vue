<template>
    <div>
        <common-header :title="title">
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
            <div style="position:fixed;width:100%;margin:auto;bottom:.35rem">
              <div class="bottomText">*更多便捷服务体验，尽在缤纷生活</div>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../components/SvgIcon.vue'
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
       
        getHomeData() {
            //在这里应该对申请的信息提交状态判断
            //如果信息提交成功，那么返回申请成功的样式，否则申请失败的样式
            if(this.$route.query.data){
                let data=JSON.parse(this.$route.query.data)
                this.msgIcon = true
                this.applyTitle = '信用卡申请成功'
                this.applyNum = `申请证件件编号：${data}`
            }
           else{
                this.msgIcon = false
                this.applyTitle = '信用卡申请失败'
                this.applyNum = `无编号`
            }
            this.images = JSON.parse(sessionStorage.getItem('hotcard'))
        },
    //返回信用卡申请首页
        goToHome(){
            this.$router.push({
                name: 'MyHome',
            })   
        },
        //返回该用户申请列表
        goToList(){
            this.$router.push({
                name: 'ApprovalList',
            })      
        }
        

    },
    mounted () {
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
        margin-top: -11%;
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
            margin-top: .5rem;
        }
        .box_frame-row{
            margin-top: .8em;
            .backBtn{
                height: 2.2em;
                width: 6em;
                background: #c9c7c7ad;
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
