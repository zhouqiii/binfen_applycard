<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
        </common-header>
        <div class="home">
            <hot-card :images="images" CardBoxPatent="CardBoxList" 
                :padActive="padActive" 
                :borderActive='borderActive' 
                :showApply="showApply" 
                :showProgress="showProgressGive"
            >
                <template v-slot:hotTitle>{{cartList}}</template>
            </hot-card>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'ApprovalList',
    data(){
        return{
            title:'查看审批进度',
            images:'',
            cartList:'办卡列表',
            padActive:true,
            borderActive:true,
            showApply:false,
            showProgressGive:true
        }
    },
    methods:{
        goBack(){
             this.$router.go(-1)
        },
        getHomeData(){
            axios.get('/mock/index.json').then(this.getHomeDataSucc)
        },
        getHomeDataSucc(res) {
            res = res.data
            if(res.ret&&res.data) {
            this.images = res.data.ApprovalList
            }
        }
    },
     mounted () {
        this.getHomeData()
    },
}
</script>

<style lang="less" scoped>

</style>