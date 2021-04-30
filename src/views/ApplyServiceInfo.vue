<template>
    <div>
        <common-header :title="title"></common-header>
        <div>
            <div class="box_frame cartMark">
                <div class="card">
                    <div class="imgPos">
                        <img :src="cardMsg.defaultPic"/>
                    </div>
                    <div style="margin:auto 0% auto 3%">
                        <p class="titleCard">{{cardMsg.cardName}}</p>
                        <p class="cardNumber">{{cardMsg.cardIntro}}</p>
                    </div>
                </div>
            </div>
            <van-form class="formBox">
                <div>
                     <!--补充紧急联系人-->
                    <div><p class="titleCard">紧急联系人</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field v-model="formData.emergencyContact" 
                                label="*紧急联系人" 
                                @blur="checkName" 
                                :error-message="errMsg.name"  
                                placeholder="请输入姓名" 
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
                    <!--补充服务功能选择-->
                    <div><p class="titleCard">服务功能选择</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                             <van-field
                                v-model="formData.sendType"
                                is-link
                                readonly
                                label="*账单发送方式"
                                @click="showsendType = true"
                            />
                            <van-popup v-model="showsendType" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionssendType"
                                    @cancel="showsendType = false"
                                    @confirm="onConfirmsendType"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                             <van-field
                                v-model="formData.sendAddress"
                                is-link
                                readonly
                                label="*卡函寄送地址"
                                @click="showsendAddress = true"
                            />
                            <van-popup v-model="showsendAddress" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsAdress"
                                    @cancel="showsendAddress = false"
                                    @confirm="onConfirmsendAddress"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-cell center title="*是否需要刷卡密码？">
                                <template #right-icon>
                                    <van-switch v-model="checked" size="15"/>
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
import { Form,Toast } from 'vant';
import { callAppMethod } from '@/utils/commonFn';
export default {
    name:'ApplyServiceInfo',
    components: {
        [Form.name]: Form,
        [Toast.name]: Toast,
    },
    data(){
        return{
            title:'我要申请-第3步',
            titleCard:'中银数字信用卡白金卡',
            desCard:'副标题，精简文案，突出卖点',
            picture:pic,
            formData:{
                emergencyContact:'',//紧急联系人姓名
                relationship:'',//紧急联系人关系
                emergencyConPhone:'',//紧急联系人电话
                sendType:'',//发送方式
                sendAddress:'',//发送地址
            },
            flag:{
                emergencyContact:false,
                relationship:false,
                emergencyConPhone:false,
                sendType:false,
                sendAddress:false,
            },
            errMsg: {
                mobilePhone: '',
                name:'',
            },
            cardMsg:'',
            checked: true,
            btnAgree:true,
            thisStyle:'',
            showRelation:false,
            showsendType:false,
            showsendAddress:false,
            optionsRelation:['父女','母女','兄弟姐妹'],
            optionssendType:['E-mail','phone'],
            optionsAdress:['北京市西二旗','外星球']

        }
    },
    methods:{
        //电话号码校验
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
            } else if(this.formData.emergencyConPhone.length>11){//限制电话号码在7-11位
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
         //姓名校验
        checkName(){
            const chinese = new RegExp("[\u4E00-\u9FA5]+");
            if (!this.formData.emergencyContact) { //不能为空
                this.errMsg.name = '请填写姓名！'
                this.flag.emergencyContact= false
                return false
            }else if(!chinese.test(this.formData.emergencyContact)){ //姓名只能为汉字
                this.errMsg.name = '请填汉字！'
                this.flag.emergencyContact=false
                return false
            }else {
                this.errMsg.name = ''
                 this.flag.emergencyContact= true
                return true
            }
        },
         //与紧急联系人的关系确定按钮
        onConfirmRelation(value){
            this.formData.relationship = value;
            this.showRelation = false;
            this.flag.relationship=true
        },
         //发送方式确定按钮
        onConfirmsendType(value){
            this.formData.sendType = value;
            this.showsendType = false;
            this.flag.sendType=true
        },
        //邮寄地址确定按钮
        onConfirmsendAddress(value){
            this.formData.sendAddress = value;
            this.showsendAddress = false;
            this.flag.sendAddress=true
        },
       //提交所有信息
        sendData(data){
            const timestamp = encodeURI(Date.parse(new Date()))
            let dataGet;
            let state;
            let result = '';
            this.requestAxios({
                //url: "/mock/index.json",
                url:'/api/cgi.do?txnId=2APO200013&dns=628&gtype=9&attest=-339418059&imei=124545',
                params: {
                    ecoType: data.ecoType,//经济类型
                    companyName:data.companyName,//公司名称
                    companyYears:data.companyYears,//公司年限
                    comProAndCity:data.comProAndCity,//公司省市
                    companyDetails:data.companyDetails,//公司地址
                    companyNumber:data.companyNumber,//公司电话
                    incomeYear:data.incomeYear,//年收入
                    contactUrgent:data.contactUrgent,//紧急联系人
                    relation:data.relation,//紧急联系人关系
                    phone:data.phone,//ta的电话
                    sendType:data.sendType,//账单发送方式
                    sendAddress:data.sendAddress,//寄送地址
                    passwordUse:data.passwordUse,//是否使用密码
                    checkResult:'ll',//审核结果
                    // applyTime:'2021-4-14',//申请时间
                    idCard:data.idCard,//身份证号
                    eduGrade:data.eduGrade,//教育程度
                    marriage:data.marriage,//婚姻
                    homeProAndCity:data.homeProAndCity,//家庭省市
                    homeDetails:data.homeDetails,//家庭地址
                    business:data.business,//行业性质
                    busInfo:data.busInfo,//职业信息
                    busGrade:data.busGrade,//职位或职级
                    userId:123456,//用户id
                    cardId:parseInt(this.$route.query.cardId),//信用卡id
                    chineseName:data.chineseName,//中文姓名
                    chinesePinyin:data.chinesePinyin,//中文拼音
                    applyTime:timestamp,
                },
                method: "post",
            })
                .then((res) => {
                    dataGet = JSON.parse(res.data);
                    state = JSON.parse(res.data).stat;
                    if (res.code === '00') {
                        if (state === '00') {
                            if (dataGet) {
                                result = JSON.stringify(dataGet.result);
                            }
                        }
                        this.$router.push({
                            path: '/ApplyEnd',
                            query: {
                                data: result,
                            },
                        });
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
        //同意协议提交下一步，对每个输入信息去空格键
         submitMsg(){
            const objOld=this.formData
            let allData={}//把所有信息都存在allData对象里，在allData里和后台对应字段，并把allData传给后台
            Object.keys(objOld).forEach(item =>{//对本页的输入信息做去空格键校验
                let data=objOld[item]
                data=data.toString()
                data = data.split(" ").join("");
                allData[item]=data//把当前页的信息填入allData
            })
            let basicData=JSON.parse(sessionStorage.getItem('basicData'))//把申请第一步的基本信息取出
            let otherData=JSON.parse(sessionStorage.getItem('otherData'))//把申请第二步的补充信息取出并转为对象
            if(!basicData||!otherData){
                this.$toast('有其他信息未填！');
            }else{
                Object.keys(basicData).forEach(item =>{//把基本信息放入allData
                    allData[item]=basicData[item]
                })
                Object.keys(otherData).forEach(item =>{//把补充信息放入allData
                    allData[item]=otherData[item]
                })
                //是否需要刷卡密码
                if(this.checked){
                    allData.passwordUse='1'
                }else{
                    allData.passwordUse='0'
                }
                if(allData.marriage){
                    allData.marriage='1'
                }else{
                    allData.marriage='0'
                }
                console.log(allData)
                Object.keys(allData).forEach(item =>{
                allData[item]=encodeURI(allData[item])//解决url里传参乱码
                })
                this.sendData(allData)
            }
        },
    },
    mounted(){
        this.cardMsg=JSON.parse(this.$route.query.data)
    },
    watch:{
        //监听flag变化，这里flag里的每一个属性对应一个输入框的校验
        //一个输入框校验正确，其对应的flag属性改为true，
        //所有的输入框值校验正确，那么flag所有属性为true，此时可以点击同意按钮
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
    },
    beforeDestory() {
        sessionStorage.removeItem('basicData')
        sessionStorage.removeItem('otherData')
    }
}
</script>

<style lang="less">

.cartMark{
    background: #a6a6a6;
    padding-left: 3%;
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
            width: 20%;
        }
        .cardNumber{
            margin-top: .5rem;
        }
    }
}
.formBox{
        padding: 5rem 3% 0 3%;
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
            margin-bottom: 1rem;
            p{
                margin-bottom: 0;
                margin-top: 0;
                color: #db4b4b;
            }
        }
    }
</style>