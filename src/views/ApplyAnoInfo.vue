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
            <div class="formBox">
                <div>
                    <div><p class="titleCard">补充其他信息</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <!-- <span>身份证有效期</span>
                            <svg-icon iconClass="showDec" v-if="showIcon1"  @click="show = true"></svg-icon>
                            <span @click="show = true">{{date}}</span> -->
                             <van-field
                                v-model="date"
                                is-link
                                readonly
                                label="身份证有效期"
                                placeholder="请选择时间"
                                @click="show = true"
                            />
                            <van-calendar v-model="show" :min-date="minDate" type="range" @confirm="onConfirmTime" />
                        </div>
                        <div class="formItem">
                            <van-field
                                v-model="marry"
                                is-link
                                readonly
                                label="*婚姻状况"
                                placeholder="请选择"
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
                                v-model="study"
                                is-link
                                readonly
                                label="*教育程度"
                                placeholder="请选择"
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
                                v-model="fieldValue"
                                is-link
                                readonly
                                label="*家庭省市"
                                placeholder="请选择家庭省市"
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
                            <van-field style="height:4em;line-height:2em"
                                v-model="message"
                                rows="2"
                                autosize
                                label="*家庭地址"
                                type="textarea"
                                placeholder="请输入详细地址"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div><p class="titleCard">职业信息</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-field
                                v-model="enterpriseType"
                                is-link
                                readonly
                                label="*行业性质"
                                placeholder="请选择"
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
                                v-model="enterpriseMsg"
                                is-link
                                readonly
                                label="*职业信息"
                                placeholder="请选择"
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
                                v-model="ocupation"
                                is-link
                                readonly
                                label="*职位或职级"
                                placeholder="请选择"
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
                                v-model="economicType"
                                is-link
                                readonly
                                label="*经济类型"
                                placeholder="请选择"
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
                            <van-cell-group>
                                <van-field v-model="companyName" label="*单位名称" placeholder="请输入单位名称" />
                            </van-cell-group>
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="companyAdr"
                                is-link
                                readonly
                                label="*单位省市"
                                placeholder="请选择单位省市"
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
                            <van-cell-group>
                                <van-field v-model="detailComAdr" label="*详细地址" placeholder="请输入公司详细地址" />
                            </van-cell-group>
                        </div>
                         <div class="formItem">
                            <van-cell-group>
                                <van-field v-model="companyNum" label="*公司电话" placeholder="请输入公司电话" />
                            </van-cell-group>
                        </div>
                        <div class="formItem">
                           <van-field
                                v-model="companyAge"
                                is-link
                                readonly
                                label="*公司年限"
                                placeholder="请选择公司年限"
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
                                v-model="income"
                                is-link
                                readonly
                                label="年收入"
                                placeholder="请选择年收入"
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
                    <div><p class="titleCard">紧急联系人</p></div>
                    <div class="ruleForm">
                        <div class="formItem">
                            <van-cell-group>
                                <van-field v-model="emergencyContact" label="*紧急联系人" placeholder="请输入紧急联系人姓名" />
                            </van-cell-group>
                        </div>
                        <div class="formItem">
                             <van-field
                                v-model="relationship"
                                is-link
                                readonly
                                label="*与你的关系"
                                placeholder="请选择"
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
                            <van-cell-group>
                                <van-field v-model="emergencyConPhone" label="*ta的电话" placeholder="请输入紧急联系人电话" />
                            </van-cell-group>
                        </div>
                    </div>
                </div>
            </div>
             <div class="agreeCheck">
                <button class="submitBtn"  @click="submitMsg">
                    <span>提交下一步</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import pic from '@/assets/img/card3.png'
import SvgIcon from '../components/SvgIcon.vue';
import axios from 'axios'
export default {
  components: { SvgIcon},
    name:'ApplyAnoInfo',
    data(){
        return{
            date: '',
            minDate: new Date(2010, 0, 1),
            show: false,
            title:'我要申请-第2步',
            picture:pic,
            titleCard:'中银数字信用卡白金卡',
            desCard:'副标题，精简文案，突出卖点',
            marry: '',
            study:'',
            message:'',
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
            fieldValue: '',
            cascaderValue: '',
            options: [],
            optionsComCity:[],
            enterpriseType:'',
            enterpriseMsg:'',
            ocupation:'',
            economicType:'',
            companyName:'',
            companyAdr:'',
            detailComAdr:'',
            companyNum:'',
            companyAge:'',
            income:'',
            emergencyConPhone:'',
            relationship:'',
            emergencyContact:''


        }
    },
    methods:{
        formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirmTime(date) {
            const [start, end] = date;
            this.show = false;
            this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        },
        onConfirmMarry(value) {
            this.marry = value;
            this.showPickerMarry = false;
        },
         onConfirmStudy(value) {
            this.study = value;
            this.showPickerStudy = false;
        },
         onConfirmType(value) {
            this.enterpriseType = value;
            this.showPickerType = false;
        },
        onConfirmMsg(value) {
            this.enterpriseMsg = value;
            this.showPickerMsg = false;
        },
        onConfirmOcupation(value){
            this.ocupation = value;
            this.showPickerOcupation = false;
        },
        onConfirmEco(value){
            this.economicType = value;
            this.showPickerEco = false;
        },
        onConfirmCompany(value){
            this.companyAdr = value;
            this.showComCity = false;
        },
        onConfirmComAge(value){
            this.companyAge = value;
            this.showComAge = false;
        },
        onConfirmIncome(value){
            this.income = value;
            this.showIncome = false;
        },
        onConfirmRelation(value){
            this.relationship = value;
            this.showRelation = false;
        },
         onFinish(value) {
            this.showCity = false;
            // console.log(value)
            this.fieldValue = value[0]+value[1];
        },
        submitMsg(){
            console.log(1)
        },
         getHomeData: function() {
            axios.get('/mock/city.json').then(this.getHomeDataSucc)
        },
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
        .van-cell-group{
            background-color:inherit
        }
        .van-cell{
            padding:inherit;
            line-height: inherit;
            background-color:inherit
           
        }
        .van-cell__right-icon{
            height: 2.5rem;
            line-height: 2.5rem;
        }
    }
}

</style>