<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
        </common-header>
        <div>
            <div class="box_frame cartMark">
                <div class="card">
                    <div class="imgPos">
                        <img :src="picture"/>
                    </div>
                    <div style="margin:auto 0% auto 3%">
                        <p class="titleCard">{{titleCard}}</p>
                        <p class="cardNumber">{{desCard}}</p>
                    </div>
                </div>
            </div>
            <van-form class="formBox">
                <div>
                    <div><p class="titleCard">紧急联系人</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field v-model="formData.emergencyContact" 
                                label="*紧急联系人" 
                                @blur="checkName" 
                                :error-message="errMsg.name"  
                                placeholder="请输入紧急联系人姓名" 
                            />
                        </div>
                        <div class="formItem">
                             <van-field
                                v-model="formData.relationship"
                                is-link
                                readonly
                                label="*与你的关系"
                                @click="showRelation = true"
                            />
                            <van-popup v-model="showRelation" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsRelation"
                                    @cancel="showRelation = false"
                                    @confirm="onConfirmRelation"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field v-model="formData.emergencyConPhone" 
                                label="*ta的电话"
                                placeholder="请输入电话"
                                @blur="checkPhone" 
                                :error-message="errMsg.mobilePhone"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div><p class="titleCard">服务功能选择</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                             <van-field
                                v-model="formData.sendWay"
                                is-link
                                readonly
                                label="*账单发送方式"
                                @click="showSendWay = true"
                            />
                            <van-popup v-model="showSendWay" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsSendWay"
                                    @cancel="showSendWay = false"
                                    @confirm="onConfirmSendWay"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                             <van-field
                                v-model="formData.sendAdress"
                                is-link
                                readonly
                                label="*卡函寄送地址"
                                @click="showSendAdress = true"
                            />
                            <van-popup v-model="showSendAdress" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsAdress"
                                    @cancel="showSendAdress = false"
                                    @confirm="onConfirmSendAdress"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-cell center title="*是否需要刷卡密码？">
                                <template #right-icon>
                                    <van-switch v-model="checked" size="15" />
                                </template>
                            </van-cell>
                        </div>
                    </div>
                    <div class="tips">
                        <p>*温馨提示:</p>
                        <p>如果您申请金卡的要求未能审核通过，我们将为您寄送同一品牌的普卡。</p>
                    </div>
                </div>
            </van-form>
             <div class="agreeCheck">
                    <button class="submitBtn" :disabled="btnAgree" :style="thisStyle" @click="submitMsg">
                        <span>提交审核</span>
                    </button>
                </div>
        </div>
    </div>
</template>
<script>
import pic from '@/assets/img/card3.png'
import { Form } from 'vant';
export default {
    name:'ApplyServiceInfo',
    components: {
        [Form.name]: Form,
    },
    data(){
        return{
            title:'我要申请-第3步',
            titleCard:'中银数字信用卡白金卡',
            desCard:'副标题，精简文案，突出卖点',
            picture:pic,
            formData:{
                emergencyContact:'',
                relationship:'',
                emergencyConPhone:'',
                sendWay:'',
                sendAdress:'',
            },
            flag:{
                emergencyContact:false,
                relationship:false,
                emergencyConPhone:false,
                sendWay:false,
                sendAdress:false,
            },
            errMsg: {
                mobilePhone: '',
                name:'',
            },
            checked: true,
            btnAgree:true,
            thisStyle:'',
            showRelation:false,
            showSendWay:false,
            showSendAdress:false,
            optionsRelation:['父女','母女','兄弟姐妹'],
            optionsSendWay:['E-mail','phone'],
            optionsAdress:['北京市西二旗','外星球']

        }
    },
    methods:{
        checkPhone(){
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!this.formData.emergencyConPhone) {
                this.errMsg.mobilePhone = '请填写电话！'
                this.flag.emergencyConPhone = false
                return false
            } else if (!re.test(this.formData.emergencyConPhone)) {
                this.errMsg.mobilePhone = '格式错误！'
                this.flag.emergencyConPhone = false
                return false
            } else if(this.formData.emergencyConPhone.length>11){
                this.errMsg.mobilePhone = '号码最多11位！'
                this.flag.emergencyConPhone = false
            }else if(this.formData.emergencyConPhone.length<7){
                this.errMsg.mobilePhone = '号码最少7位！'
                this.flag.emergencyConPhone = false
            }
            else {
                this.errMsg.mobilePhone = ''
                this.flag.emergencyConPhone = true
                return true
            }
        },
        checkName(){
            const chinese = new RegExp("[\u4E00-\u9FA5]+");
            if (!this.formData.emergencyContact) {
                this.errMsg.name = '请填写姓名！'
                this.flag.emergencyContact= false
                return false
            }else if(!chinese.test(this.formData.emergencyContact)){
                this.errMsg.name = '请填汉字！'
                this.flag.emergencyContact=false
                return false
            }else {
                this.errMsg.name = ''
                 this.flag.emergencyContact= true
                return true
            }
        },
        onConfirmRelation(value){
            this.formData.relationship = value;
            this.showRelation = false;
            this.flag.relationship=true
        },
        onConfirmSendWay(value){
            this.formData.sendWay = value;
            this.showSendWay = false;
            this.flag.sendWay=true
        },
        onConfirmSendAdress(value){
            this.formData.sendAdress = value;
            this.showSendAdress = false;
            this.flag.sendAdress=true
        },
        goBack(){
             this.$router.go(-1)
        },
         submitMsg(){
            const objOld=this.formData
            let allData={}
            Object.keys(objOld).forEach(item =>{
                let data=objOld[item]
                data=data.toString()
                data = data.split(" ").join("");
                allData[item]=data
            })
            let basicData=JSON.parse(sessionStorage.getItem('data'))
            let otherData=JSON.parse(sessionStorage.getItem('otherData'))
            Object.keys(basicData).forEach(item =>{
               allData[item]=basicData[item]
            })
            Object.keys(otherData).forEach(item =>{
               allData[item]=otherData[item]
            })
            console.log(allData)
            this.$router.push({
                name: 'ApplyEnd',
                params:{
                    id:this.$route.params.id
                },
            })
        },
    },
        watch:{
            flag:{
                handler(newVal) {
                    console.log(this.formData)
                    let flag=true
                    Object.keys(newVal).forEach(item => {
                        if(newVal[item]==false){
                            flag=false
                        }
                    })
                    if(flag){
                        this.thisStyle = "background: rgb(165 29 29 / 93%);"
                        this.btnAgree = false
                    }else{
                        this.thisStyle = "background: #33333391"
                        this.btnAgree = true
                    }
                },
                deep:true
            }
    }
}
</script>

<style lang="less">

.cartMark{
    background: #999999;
    padding: 3%;
    position: fixed;
    width: 100%;
    z-index: 1000;
    .card{
        display: flex;
        flex-direction:row;
        p{
            margin-top: 0;
        }
        .imgPos{
            margin: auto 0;
        }
    }
}
.formBox{
        padding: 4rem 3% 0 3%;
        .van-cell-group{
            background-color:inherit
        }
        .van-cell{
            padding:inherit;
            line-height: inherit;
            background-color:inherit;
        }
        .van-cell__right-icon{
            height: 2.5rem;
            line-height: 2.5rem;
        }
        .van-field__control{
            text-align: right;
        }
        .van-field__label{
            width: 10em;
        }
        .van-field__control{
            text-align: initial;
        }
        .van-field__label{
            width: 7em;
        }
        .van-field__value{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .van-field__body{
                width: 50%;
            }
        }
        .tips{
            margin-top: 5rem;
            padding: 0 1em;
            p{
                margin-bottom: 0;
                margin-top: 0;
                color: #db4b4b;
            }
        }
    }
</style>