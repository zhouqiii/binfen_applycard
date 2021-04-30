<template>
    <div>
        <common-header :title="title">
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
            images:[],
            cartList:'办卡列表',
            padActive:true,
            borderActive:true,
            showApply:false,
            showProgressGive:true,
        }
    },
    methods:{
        getHomeData(){
            this.requestAxios({
                url:'/api/cgi.do?txnId=2APO200014&dns=628&gtype=9&attest=-339418059&imei=124545',
                params: {
                    usersId: 123456,
                },
                method: "post",
            })
                .then((res) => {
                    const data = JSON.parse(res.data).body;
                    const state = JSON.parse(res.data).stat;
                    if (res.code === '00') {
                        if (state === '00') {
                        if (data) {
                            const timelist = [];
                            const steplistText = [];
                            const steplist = [];
                            Array.prototype.forEach.call(data, (item) => {
                            this.images.push(item.card);
                            timelist.push(item.applyTime);
                            if (parseInt(item.sendStep, 10) > 4) {
                                this.$set(item, 'sendStep', '0');
                            }
                            steplist.push(item.sendStep);
                            if (item.sendStep === '0') {
                                this.$set(item, 'sendStep', '审批中');
                            } if (item.sendStep === '1') {
                                this.$set(item, 'sendStep', '物流邮寄中');
                            } if (item.sendStep === '2') {
                                this.$set(item, 'sendStep', '签收卡片');
                            } if (item.sendStep === '3') {
                                this.$set(item, 'sendStep', '已激活');
                            } if (item.sendStep === '4') {
                                this.$set(item, 'sendStep', '已使用');
                            }
                            steplistText.push(item.sendStep);
                            });
                            for (let i = 0; i < this.images.length; i++) {
                            this.images[i].applyTime = timelist[i];
                            this.images[i].progress = steplistText[i];
                            this.images[i].line = steplist[i];
                            }
                        } else {
                            this.$toast('暂无数据！');
                        }
                        } else {
                        this.$toast('数据加载失败！');
                        }
                    } else if (res.code === '-501' || res.code === '-505') {
                        // 登录超时，需要调用客户端方法，进行登录
                        callAppMethod({
                        callName: 'toLogin',
                        });
                    } else {
                        this.$toast('信息异常！');
                    }
                })
                .catch((err) => {
                });
        },
    },
     mounted () {
        this.getHomeData()
    },
}
</script>

<style lang="less" scoped>

</style>