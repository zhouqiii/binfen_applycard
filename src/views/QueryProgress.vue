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
            activities: [{//这里应该定义所有的审批状态，然后通过这张卡的状态改变其步骤样式
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
            let step=msgGet.line//这里line是申请状态字段之后可以改成后台传过来的，比如约定0—审批通过，1-邮寄中，。。。
            if(step>=0){
                this.activities[step].color='#fff'
                this.activities[step].icon="el-icon-s-custom"
                for(let i=0;i<step;i++){
                     this.activities[i].color='#000000b3'
                }
            }
        }
    },
    mounted(){
         this.msg = JSON.parse(sessionStorage.data);//在页面渲染时，把申请列表里存的对应卡信息取出，这样在进度查询时可以直接展示对应的哪一张卡
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