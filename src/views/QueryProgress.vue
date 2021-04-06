<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
        </common-header>
        <div class="home">
            <hot-card :images="images" CardBoxPatent="CardBoxQuery"   
                :showApply="showApply" 
                :showProgress="showProgressGive"
                >
            </hot-card>
        </div>
        <div class="timeline">
            <div class="block">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp"
                    >
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'QueryProgress',
    data(){
        return{
            title:'进度查询',
            images:[],
            showApply:false,
            showProgressGive:false,
            iconClass:'',
            showIcon:false,
            mag:'',
            activeT:'',
            activities: [{
                content: '审批通过',
                size: 'large',
                color:'rgb(102 102 102 / 63%)'
                }, {
                content: '物流邮寄中',
                size: 'large',
                color:'rgb(102 102 102 / 63%)'
                },  {
                content: '签收卡片',
                size: 'large',
                color:'rgb(102 102 102 / 63%)'
                }, {
                content: '已激活',
                size: 'large',
                color:'rgb(102 102 102 / 63%)'
                }, {
                content: '已使用',
                size: 'large',
                color:'rgb(102 102 102 / 63%)'
                },]

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        checkData(){
            let msgGet=this.msg;
            this.images.push(msgGet)
            let step=msgGet.line
           
            if(step>=0){
                this.activities[step].color='#fff'
                this.activities[step].icon="el-icon-s-custom"
                for(let i=0;i<step;i++){
                     this.activities[i].color='#000000b3'
                }
            }
            //else if(step>=1){
            //     this.activities[step].icon='el-icon-s-custom'
            //     this.activities[step].color='#000000b3'
            //     // for(let i=0;i<=step;i++){
            //     //     this.activities[i].type='primary'
            //     // }
            // }
        }
    },
    mounted(){
         this.msg = JSON.parse(localStorage.data);
         this.checkData()
    }
}
</script>

<style lang="less">
.timeline{
    margin-top: 1em;
    padding-top: 1em;
    padding-left: 3em;
    background: #ffffff;

}
//修改时间线样式
.el-timeline-item{
    padding-bottom:80px
}
.el-timeline-item__node--large{
    height: 20px;
    width: 20px;
    left:-0.2rem
}
.el-timeline-item__icon {
    color: #000000b3;
    font-size: 24px;
}

</style>