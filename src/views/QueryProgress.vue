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
            mag:{},
            activities: [{
                content: '审批通过',
                size: 'large',
                }, {
                content: '物流邮寄中',
                size: 'large',
                }, {
                content: '已激活',
                size: 'large',
                },]

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        checkData(){
            let str = JSON.stringify(this.$route.params.data)//把对象转化为字符串（stringify）存放进sessionStorage
            localStorage.setItem('msg',str)
            let msgGet=JSON.parse(localStorage.getItem("msg"));
            this.images.push(msgGet)
            console.log(this.images)
            let step=msgGet.line
            console.log(step)
            if(step==0){
                 this.activities[step].type='primary'
            //    this.activities[0].icon="el-icon-s-custom"
            }else if(step>=1){
               // this.activities[step].icon='el-icon-s-custom'
                for(let i=0;i<=step;i++){
                    this.activities[i].type='primary'
                }
            }
            
        }
    },
    mounted(){
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
}
.el-timeline-item__node{
}

</style>