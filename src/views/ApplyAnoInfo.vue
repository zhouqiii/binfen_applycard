<template>
    <div class="home">
        <common-header :title="title">
        </common-header>
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
            <van-form class="formBox padBox">
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
                                v-model="formData.marriage"
                                is-link
                                readonly
                                label="*婚姻状况"
                                @click="showPickermarriage = true"
                            />
                            <van-popup v-model="showPickermarriage" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="marriageSelects"
                                @cancel="showPickermarriage = false"
                                @confirm="onConfirmmarriage"
                            />
                            </van-popup>
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="formData.eduGrade"
                                is-link
                                readonly
                                label="*教育程度"
                                @click="showPickereduGrade = true"
                            />
                            <van-popup v-model="showPickereduGrade" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="eduGradeSelects"
                                @cancel="showPickereduGrade = false"
                                @confirm="onConfirmeduGrade"
                            />
                            </van-popup>
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.homeProAndCity"
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
                            <van-field v-model="formData.homeDetails" 
                                label="*家庭地址" 
                                placeholder="请输入家庭住址" 
                                @blur="checkAdress" 
                                :error-message="errMsg.adress"     
                            />
                          
                        </div>
                    </div>
                </div>
                <div>
                    <!--补充职业信息-->
                    <div><p class="titleCard">职业信息</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field
                                v-model="formData.business"
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
                                v-model="formData.busInfo"
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
                                v-model="formData.busGrade"
                                is-link
                                readonly
                                label="*职位或职级"
                                @click="showPickerbusGrade = true"
                            />
                            <van-popup v-model="showPickerbusGrade" round position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="busGradeSelects"
                                @cancel="showPickerbusGrade = false"
                                @confirm="onConfirmbusGrade"
                            />
                            </van-popup>
                        </div>
                         <div class="formItem">
                            <van-field
                                v-model="formData.ecoType"
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
                                v-model="formData.comProAndCity"
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
                            <van-field v-model="formData.companyDetails" 
                                label="*详细地址" 
                                placeholder="请输入公司详细地址"
                                 @blur="checkComAdress" 
                                :error-message="errMsg.comAdress"
                            />
                        </div>
                         <div class="formItem">
                            <van-field v-model="formData.companyNumber" 
                                label="*公司电话"
                                placeholder="请输入公司电话"
                                @blur="checkComPhone" 
                                :error-message="errMsg.comMobilePhone"
                            />
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="formData.companyYears"
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
                                v-model="formData.incomeYear"
                                is-link
                                readonly
                                label="年收入"
                                @click="showincomeYear = true"
                            />
                            <van-popup v-model="showincomeYear" round position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="optionsincomeYear"
                                    @cancel="showincomeYear = false"
                                    @confirm="onConfirmincomeYear"
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
                            <van-field v-model="formData.contactUrgent" 
                                label="*紧急联系人" 
                                placeholder="请输入紧急联系人姓名" 
                                @blur="checkContact" 
                                :error-message="errMsg.name"
                            />
                        </div>
                        <div class="formItem">
                             <van-field
                                v-model="formData.relation"
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
                            <van-field v-model="formData.phone" 
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
                marriage: '',     
                eduGrade:'',
                homeProAndCity: '',
                homeDetails:'',
                business:'',
                relation:'',
                incomeYear:'',
                phone:'',
                contactUrgent:'',
                companyName:'',
                comProAndCity:'',
                companyDetails:'',
                companyNumber:'',
                companyYears:'',
                busInfo:'',
                busGrade:'',
                ecoType:'',
            },
             cardMsg:'',
             flag:{
                date:false,//身份证N
                marriage: false,   //婚姻  
                eduGrade:false,//教育
                homeProAndCity: false,//家庭省市
                homeDetails:false,//家庭地址
                business:false,//行业性质
                relation:false,//紧急与你的关系
                incomeYear:false,//收入
                phone:false,//紧急联系方式
                contactUrgent:false,//紧急联系人
                companyName:false,//公司名称
                comProAndCity:false,//公司省市
                companyDetails:false,//详细地址
                companyNumber:false,//公司电话
                companyYears:false,//公司年限N
                busInfo:false,//职业信息
                busGrade:false,//职位
                ecoType:false,//收入类型N
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
            showPickermarriage: false,
            showPickereduGrade:false,
            showPickerType:false,
            showPickerMsg:false,
            showPickerbusGrade:false,
            showPickerEco:false,
            showComCity:false,
            showComAge:false,
            showincomeYear:false,
            showRelation:false,
            marriageSelects: ['未婚','已婚'],
            eduGradeSelects:['专科','本科','硕士','博士'],
            typeSelects:['制造业','服务业'],
            msgSelects:['互联网','电子游戏','漫画家','作家'],
            busGradeSelects:['经理','职员'],
            ecoSelects:['年薪','月薪'],
            optionsComAge:['30年','50年','70年'],
            optionsincomeYear:['30w','50w','100w'],
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
        onConfirmmarriage(value) {
            this.formData.marriage = value;
            this.showPickermarriage = false;
            this.flag.marriage=true
        },
        //学历确定按钮
         onConfirmeduGrade(value) {
            this.formData.eduGrade = value;
            this.showPickereduGrade = false;
            this.flag.eduGrade=true
        },
        //行业性质确定按钮
         onConfirmType(value) {
            this.formData.business = value;
            this.showPickerType = false;
            this.flag.business=true
        },
        //职业信息确定按钮
        onConfirmMsg(value) {
            this.formData.busInfo = value;
            this.showPickerMsg = false;
            this.flag.busInfo=true
        },
        //职位确定按钮
        onConfirmbusGrade(value){
            this.formData.busGrade = value;
            this.showPickerbusGrade = false;
            this.flag.busGrade=true
        },
        //经济类型确定按钮
        onConfirmEco(value){
            this.formData.ecoType = value;
            this.showPickerEco = false;
            this.flag.ecoType=true
        },
        //公司省市确定按钮
        onConfirmCompany(value){
            this.formData.comProAndCity = value[0]+value[1];//省市格式化为北京市东城区 安徽省淮北市的格式
            this.showComCity = false;
            this.flag.comProAndCity=true
        },
        //公司年限确定按钮
        onConfirmComAge(value){
            this.formData.companyYears = value;
            this.showComAge = false;
            this.flag.companyYears=true
        },
        //收入确定按钮
        onConfirmincomeYear(value){
            this.formData.incomeYear = value;
            this.showincomeYear = false;
            this.flag.incomeYear=true
        },
        //与紧急联系人的关系确定按钮
        onConfirmRelation(value){
            this.formData.relation = value;
            this.showRelation = false;
            this.flag.relation=true
        },
        //家庭省市确定按钮
        onFinish(value) {
            this.showCity = false;
            // console.log(value)
            this.formData.homeProAndCity = value[0]+value[1];//省市格式化为北京市东城区 安徽省淮北市的格式
            this.flag.homeProAndCity=true
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
             if (!this.formData.homeDetails) {
                this.errMsg.adress = '请填写地址！'
                this.flag.homeDetails=false
                return false
            }
            else {
                this.errMsg.adress = ''
                this.flag.homeDetails=true
                return true
            }
        },
        //公司地址校验
         checkComAdress(){
             if (!this.formData.companyDetails) {
                this.errMsg.comAdress = '请填写地址！'
                this.flag.companyDetails=false
                return false
            }
            else {
                this.errMsg.comAdress = ''
                 this.flag.companyDetails=true
                return true
            }
        },
        //公司电话校验
        checkComPhone(){
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!this.formData.companyNumber) {
                this.errMsg.comMobilePhone = '请填写电话！'
                 this.flag.companyNumber=false
                return false
            } else if (!re.test(this.formData.companyNumber)) {
                this.errMsg.comMobilePhone = '格式错误！'
                this.flag.companyNumber=false
                return false
            }
            else {
                this.errMsg.comMobilePhone = ' '
                this.flag.companyNumber=true
                return true
            }
        },
        //紧急联系人姓名失焦校验
        checkContact(){
             const chinese = new RegExp("[\u4E00-\u9FA5]+");
              if (!this.formData.contactUrgent) {
                this.errMsg.name = '请填写姓名！'
                this.flag.contactUrgent=false
                return false
            } else if (!chinese.test(this.formData.contactUrgent)) {//判断字符串是否为汉字
                this.errMsg.name = '格式错误！'
                this.flag.contactUrgent=false
                return false
            }
            else {
                this.errMsg.name = ' '
                this.flag.contactUrgent=true
                return true
            }
        },
        //紧急联系人电话失焦校验
        checkContactPhone(){
            let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
            if (!this.formData.phone) {
                this.errMsg.mobilePhone = '请填写电话！'
                this.flag.phone=false
                return false
            } else if (!re.test(this.formData.phone)) {
                this.errMsg.mobilePhone = '格式错误！'
                 this.flag.phone=false
                return false
            }
            else {
                this.errMsg.mobilePhone = ' '
                this.flag.phone=true
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
                query:{
                    cardId:this.$route.query.cardId,
                    data:this.$route.query.data
                },
            })
        },
         getHomeData: function() {
            this.requestAxios({
                url:'/mock/city.json',
                method: "get",
            })
            .then((res) => {
                this.getHomeDataSucc(res)
            })
            .catch((err) => {
            });
        },
        //数据赋值
        getHomeDataSucc: function(res) {
            res = res.data
            if(res.city){
                this.options = res.city
                this.optionsComCity = res.city
            }
        },
    },
    mounted () {
        this.cardMsg=JSON.parse(this.$route.query.data)
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
    .padBox{
        padding: 5rem 3% 0 3%;
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
                width: 70%;
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