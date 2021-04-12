<template>
    <div class="home">
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
                    <!--补充其他信息-->
                    <div><p class="titleCard">补充其他信息</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                             <van-field class="idBox"
                                v-model="formData.date"
                                is-link
                                readonly
                                label="身份证有效期"
                                @click="show = true"
                            />
                            <van-calendar v-model="show" :min-date="minDate" type="range" @confirm="onConfirmTime" />
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="formData.marry"
                                is-link
                                readonly
                                label="*婚姻状况"
                                @click="showPickerMarry = true"
                            />
                            <van-popup v-model="showPickerMarry" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="marrySelects"
                                @cancel="showPickerMarry = false"
                                @confirm="onConfirmMarry"
                            />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="formData.study"
                                is-link
                                readonly
                                label="*教育程度"
                                @click="showPickerStudy = true"
                            />
                            <van-popup v-model="showPickerStudy" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="studySelects"
                                @cancel="showPickerStudy = false"
                                @confirm="onConfirmStudy"
                            />
                            </van-popup>
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.fieldValue"
                                is-link
                                readonly
                                label="*家庭省市"
                                @click="showCity = true"
                            />
                           <van-popup v-model="showCity" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="options"
                                @cancel="showCity = false"
                                @confirm="onFinish"
                            />
                            </van-popup>
                        </div>
                        <div>
                            <van-field v-model="formData.message" 
                                label="*家庭地址" 
                                placeholder="请输入家庭住址" 
                                @blur="checkAdress" 
                                :error-message="errMsg.adress"     
                            />
                            <!-- <van-field class="textAreaDiv"
                                v-model="formData.message"
                                rows="3"
                                label="*家庭地址"
                                type="textarea"
                                placeholder="请输入家庭住址"
                                @blur="checkAdress" 
                                :error-message="errMsg.adress"   
                            /> -->
                        </div>
                    </div>
                </div>
                <div>
                    <!--补充职业信息-->
                    <div><p class="titleCard">职业信息</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field
                                v-model="formData.enterpriseType"
                                is-link
                                readonly
                                label="*行业性质"
                                @click="showPickerType = true"
                            />
                            <van-popup v-model="showPickerType" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="typeSelects"
                                @cancel="showPickerType = false"
                                @confirm="onConfirmType"
                            />
                            </van-popup>
                        </div>
                         <div class="formItem">
                            <van-field
                                v-model="formData.enterpriseMsg"
                                is-link
                                readonly
                                label="*职业信息"
                                @click="showPickerMsg = true"
                            />
                            <van-popup v-model="showPickerMsg" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="msgSelects"
                                @cancel="showPickerMsg = false"
                                @confirm="onConfirmMsg"
                            />
                            </van-popup>
                        </div>
                         <div class="formItem">
                            <van-field
                                v-model="formData.ocupation"
                                is-link
                                readonly
                                label="*职位或职级"
                                @click="showPickerOcupation = true"
                            />
                            <van-popup v-model="showPickerOcupation" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="ocupationSelects"
                                @cancel="showPickerOcupation = false"
                                @confirm="onConfirmOcupation"
                            />
                            </van-popup>
                        </div>
                         <div class="formItem">
                            <van-field
                                v-model="formData.economicType"
                                is-link
                                readonly
                                label="*经济类型"
                                @click="showPickerEco = true"
                            />
                            <van-popup v-model="showPickerEco" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="ecoSelects"
                                @cancel="showPickerEco = false"
                                @confirm="onConfirmEco"
                            />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field v-model="formData.companyName" 
                                label="*单位名称" 
                                placeholder="请输入单位名称" 
                                @blur="checkComA" 
                                :error-message="errMsg.company"     
                            />
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.companyAdr"
                                is-link
                                readonly
                                label="*单位省市"
                                @click="showComCity = true"
                            />
                            <van-popup v-model="showComCity" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsComCity"
                                    @cancel="showComCity = false"
                                    @confirm="onConfirmCompany"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field v-model="formData.detailComAdr" 
                                label="*详细地址" 
                                placeholder="请输入公司详细地址"
                                 @blur="checkComAdress" 
                                :error-message="errMsg.comAdress"
                            />
                        </div>
                         <div class="formItem">
                            <van-field v-model="formData.companyNum" 
                                label="*公司电话"
                                placeholder="请输入公司电话"
                                @blur="checkComPhone" 
                                :error-message="errMsg.comMobilePhone"
                            />
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.companyAge"
                                is-link
                                readonly
                                label="*公司年限"
                                @click="showComAge = true"
                            />
                            <van-popup v-model="showComAge" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsComAge"
                                    @cancel="showComAge = false"
                                    @confirm="onConfirmComAge"
                                />
                            </van-popup>
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.income"
                                is-link
                                readonly
                                label="年收入"
                                @click="showIncome = true"
                            />
                            <van-popup v-model="showIncome" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsIncome"
                                    @cancel="showIncome = false"
                                    @confirm="onConfirmIncome"
                                />
                            </van-popup>
                        </div>
                    </div>
                </div>
                <div>
                    <!--补充紧急联系人-->
                    <div><p class="titleCard">紧急联系人</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field v-model="formData.emergencyContact" 
                                label="*紧急联系人" 
                                placeholder="请输入紧急联系人姓名" 
                                @blur="checkContact" 
                                :error-message="errMsg.name"
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
                                placeholder="请输入紧急联系人电话" 
                                @blur="checkContactPhone" 
                                :error-message="errMsg.mobilePhone"
                            />
                        </div>
                    </div>
                </div>
            </van-form>
             <div class="agreeCheck " >
                <button class="submitBtn" :disabled="btnAgree" :style="thisStyle" @click="submitMsg">
                    <span>提交下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import pic from '@/assets/img/card3.png'
import SvgIcon from '../components/SvgIcon.vue';
import { Form } from 'vant';
import axios from 'axios'
export default {
  components: { SvgIcon},
    name:'ApplyAnoInfo',
    components: {
        [Form.name]: Form,
    },
    data(){
        return{
            formData:{
                date:'',//1
                marry: '',     
                study:'',
                fieldValue: '',
                message:'',
                enterpriseType:'',
                relationship:'',
                income:'',
                emergencyConPhone:'',
                emergencyContact:'',
                companyName:'',
                companyAdr:'',
                detailComAdr:'',
                companyNum:'',
                companyAge:'',
                enterpriseMsg:'',
                ocupation:'',
                economicType:'',
            },
             flag:{
                date:false,//身份证
                marry: false,   //婚姻  
                study:false,//教育
                fieldValue: false,//家庭省市
                message:false,//家庭地址
                enterpriseType:false,//行业性质
                relationship:false,//紧急与你的关系
                income:false,//收入
                emergencyConPhone:false,//紧急联系方式
                emergencyContact:false,//紧急联系人
                companyName:false,//公司名称
                companyAdr:false,//公司地址
                detailComAdr:false,//详细地址
                companyNum:false,//公司电话
                companyAge:false,//公司年限
                enterpriseMsg:false,//职业信息
                ocupation:false,//职位
                economicType:false,//收入类型
            },
            errMsg:{
                adress:'',
                company:'',
                comAdress:'',
                comMobilePhone:'',
                mobilePhone: '',
                name:'',
            },
            fontColor:'',
            btnAgree:true,
            thisStyle:'',
            minDate: new Date(2010, 0, 1),
            show: false,
            title:'我要申请-第2步',
            picture:pic,
            titleCard:'中银数字信用卡白金卡',
            desCard:'副标题，精简文案，突出卖点',
            showPickerMarry: false,
            showPickerStudy:false,
            showPickerType:false,
            showPickerMsg:false,
            showPickerOcupation:false,
            showPickerEco:false,
            showComCity:false,
            showComAge:false,
            showIncome:false,
            showRelation:false,
            marrySelects: ['未婚','已婚'],
            studySelects:['专科','本科','硕士','博士'],
            typeSelects:['制造业','服务业'],
            msgSelects:['互联网','电子游戏','漫画家','作家'],
            ocupationSelects:['经理','职员'],
            ecoSelects:['年薪','月薪'],
            optionsComAge:['30年','50年','70年'],
            optionsIncome:['30w','50w','100w'],
            optionsRelation:['父女','母女','兄弟姐妹'],
            showCity: false,
            cascaderValue: '',
            options: [],
            optionsComCity:[],


        }
    },
    methods:{
        formatDate(date) {//格式化身份张有效期时间为2019/05/04的格式
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        },
        //身份证有效期时间确定按钮
        onConfirmTime(date) {
            const [start, end] = date;
            this.show = false;
            this.formData.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
            this.flag.date=true

        },
        //婚姻状况确定按钮
        onConfirmMarry(value) {
            this.formData.marry = value;
            this.showPickerMarry = false;
            this.flag.marry=true
        },
        //学历确定按钮
         onConfirmStudy(value) {
            this.formData.study = value;
            this.showPickerStudy = false;
            this.flag.study=true
        },
        //行业性质确定按钮
         onConfirmType(value) {
            this.formData.enterpriseType = value;
            this.showPickerType = false;
            this.flag.enterpriseType=true
        },
        //职业信息确定按钮
        onConfirmMsg(value) {
            this.formData.enterpriseMsg = value;
            this.showPickerMsg = false;
            this.flag.enterpriseMsg=true
        },
        //职位确定按钮
        onConfirmOcupation(value){
            this.formData.ocupation = value;
            this.showPickerOcupation = false;
            this.flag.ocupation=true
        },
        //经济类型确定按钮
        onConfirmEco(value){
            this.formData.economicType = value;
            this.showPickerEco = false;
            this.flag.economicType=true
        },
        //公司省市确定按钮
        onConfirmCompany(value){
            this.formData.companyAdr = value[0]+value[1];//省市格式化为北京市东城区 安徽省淮北市的格式
            this.showComCity = false;
            this.flag.companyAdr=true
        },
        //公司年限确定按钮
        onConfirmComAge(value){
            this.formData.companyAge = value;
            this.showComAge = false;
            this.flag.companyAge=true
        },
        //收入确定按钮
        onConfirmIncome(value){
            this.formData.income = value;
            this.showIncome = false;
            this.flag.income=true
        },
        //与紧急联系人的关系确定按钮
        onConfirmRelation(value){
            this.formData.relationship = value;
            this.showRelation = false;
            this.flag.relationship=true
        },
        //家庭省市确定按钮
        onFinish(value) {
            this.showCity = false;
            // console.log(value)
            this.formData.fieldValue = value[0]+value[1];//省市格式化为北京市东城区 安徽省淮北市的格式
            this.flag.fieldValue=true
        },
        //公司名称校验
        checkComA(){
             if (!this.formData.companyName) {
                this.errMsg.company = '请填写名称！'
                this.flag.companyName=false
                return false
            }
            else {
                this.errMsg.company = ''
                this.flag.companyName=true
                return true
            }
        },
        //家庭住址
        checkAdress(){
             if (!this.formData.message) {
                this.errMsg.adress = '请填写地址！'
                this.flag.message=false
                return false
            }
            else {
                this.errMsg.adress = ''
                this.flag.message=true
                return true
            }
        },
        //公司地址校验
         checkComAdress(){
             if (!this.formData.detailComAdr) {
                this.errMsg.comAdress = '请填写地址！'
                this.flag.detailComAdr=false
                return false
            }
            else {
                this.errMsg.comAdress = ''
                 this.flag.detailComAdr=true
                return true
            }
        },
        //公司电话校验
        checkComPhone(){
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!this.formData.companyNum) {
                this.errMsg.comMobilePhone = '请填写电话！'
                 this.flag.companyNum=false
                return false
            } else if (!re.test(this.formData.companyNum)) {
                this.errMsg.comMobilePhone = '格式错误！'
                this.flag.companyNum=false
                return false
            }
            else {
                this.errMsg.comMobilePhone = ' '
                this.flag.companyNum=true
                return true
            }
        },
        //紧急联系人姓名失焦校验
        checkContact(){
             const chinese = new RegExp("[\u4E00-\u9FA5]+");
              if (!this.formData.emergencyContact) {
                this.errMsg.name = '请填写姓名！'
                this.flag.emergencyContact=false
                return false
            } else if (!chinese.test(this.formData.emergencyContact)) {//判断字符串是否为汉字
                this.errMsg.name = '格式错误！'
                this.flag.emergencyContact=false
                return false
            }
            else {
                this.errMsg.name = ' '
                this.flag.emergencyContact=true
                return true
            }
            
        },
        //紧急联系人电话失焦校验
        checkContactPhone(){
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!this.formData.emergencyConPhone) {
                this.errMsg.mobilePhone = '请填写电话！'
                this.flag.emergencyConPhone=false
                return false
            } else if (!re.test(this.formData.emergencyConPhone)) {
                this.errMsg.mobilePhone = '格式错误！'
                 this.flag.emergencyConPhone=false
                return false
            }
            else {
                this.errMsg.mobilePhone = ' '
                this.flag.emergencyConPhone=true
                return true
            }
        },
         //同意协议提交下一步，对每个输入信息去空格键，然后缓存基本信息
        submitMsg(){
            const objOld=this.formData
            let objNew={}
            Object.keys(objOld).forEach(item =>{
                let data=objOld[item]
                data=data.toString()
                data = data.split(" ").join("");//去空格键
                objNew[item]=data
            })
            sessionStorage.setItem('otherData',JSON.stringify(objNew))//转成字符串缓存
            this.$router.push({
                name: 'ApplyServiceInfo',
                params:{
                    id:this.$route.params.id
                },
            })
        },
         getHomeData: function() {
            axios.get('/mock/city.json').then(this.getHomeDataSucc)
        },
        //数据赋值
        getHomeDataSucc: function(res) {
            res = res.data
            if(res.ret&&res.data) {
                this.options = res.data.city
                this.optionsComCity = res.data.city
        }
    },
        goBack(){
            this.$router.go(-1)
        }
    },
    mounted () {
            this.getHomeData()
        },
    watch:{
        //监听flag变化，这里flag里的每一个属性对应一个输入框的校验
        //一个输入框校验正确，其对应的flag属性改为true，
        //所有的输入框值校验正确，那么flag所有属性为true，此时可以点击同意按钮
        flag: {
            handler(newVal) {
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
            deep:true,
        }
    }
}
</script>

<style lang="less">
.home{
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
        .van-field__control{
            text-align: initial;
        }
        .van-field__label{
            width: 6.5em;
        }
        .van-field__value{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .van-field__body{
                width: 65%;
                textarea{
                    height: 4.5em;
                    margin-top:2.2em;
                    line-height: 1.5em;
                    overflow-y: auto;
                }
            }
        }
        .idBox{
           width: 100%;
        }
    }
}

</style>