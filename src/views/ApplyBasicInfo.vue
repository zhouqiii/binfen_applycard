<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
            <!-- <template v-slot:custom>
                <svg-icon iconClass="shareBold"></svg-icon>
            </template> -->
        </common-header>
        <div class="contentBody">
            <div class="boxCarousel">
                <el-carousel :interval="5000" arrow="always" :autoplay="false" >
                    <el-carousel-item v-for="(item,index) in cardPage" :key="index" style="height:10rem">
                            <el-card :body-style="{ padding: '0px' }">
                                <img :src="item.imgUrl">
                                <div>
                                    <span>{{item.title}}</span>
                                    </br>
                                    <span class="time">{{item.des}}</span>
                                </div>
                            </el-card>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div style="padding:1% 3%">
                <div v-for="(item,index) in CardExp" :key="index"  class="box_frame-row" style="height:2em">
                    <div class="exper">{{item.title}}</div>
                    <div class="description"><span>{{item.des}}</span></div>
                    <div @click="showDescription(index)" class="btn"><svg-icon iconClass="showDec"></svg-icon></div>
                </div>
            </div>
            <div>
                <div class="formBox">
                    <div><p class="titleCard">基本信息</p></div>
                    <div>
                        <van-form class="ruleForm">
                            <div class="formItem">
                                <van-field v-model="formData.name" 
                                    label="*中文姓名" 
                                    placeholder="中文姓名" 
                                    @blur="getPinYin" 
                                    :error-message="errMsg.name"
                                />
                                <!-- :error-message="errMsg.name"    -->
                            </div>
                            <div class="formItem">
                                <van-field v-model="formData.nameEng" 
                                    label="*姓名拼音" 
                                    placeholder="英文姓名" 
                                    @blur="checkNameEng" 
                                    :error-message="errMsg.nameEng"  
                                />
                            </div>
                            <div class="formItem">
                                <van-field v-model="formData.idcard" 
                                    label="*身份证号码" 
                                    placeholder="身份证号" 
                                    @blur="checkCard" 
                                    :error-message="errMsg.idcard" 
                                />
                            </div>
                             <div class="formItem" style="display:flex;flex-direction:row;justify-content: space-between;">
                                <van-field v-model="formData.checkNumber" 
                                    label="*手机验证码" 
                                    placeholder="验证码"
                                    @blur="checkCode" 
                                    :error-message="errMsg.checkNumber" 
                                    style="width:74%"
                                />
                                <div>
                                    <button :disabled="btnChangeEnable" @click.prevent="timeStart()" class="checkNum">{{btnText}}</button>
                                </div>
                            </div>
                        </van-form>
                    </div>
                </div>
                <div class="agreeCheck">
                    <button class="submitBtn" :disabled="btnAgree" :style="thisStyle" @click="submitMsg">
                        <span>同意协议并提交下一步</span>
                    </button>
                    <div>
                        <p>
                            <input type="checkbox" value="1" id="check" @change="getValue(this)" v-model="formData.agree">
                            本人已阅读全部申请材料，充分了解并清楚知晓该信用卡的产品相关信息，愿意遵守
                            <span style="color:blue" @click="showContract" class="btn">《中国银行股份有限公司信用卡领用合约》
                            </span>的各项规则。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../components/SvgIcon.vue';
import pinyin from '../utils/chineseToPinYin.js'
import DialogMessage from '../components/MyComponents/DialogMessage.vue'
import createDom from '../utils/createDom.js'
import { Dialog,Toast  } from 'vant';
const TIME_COUNT = 60;
let Top=null
export default {
  components: { SvgIcon,
  [Dialog.Component.name]: Dialog.Component,
  [Toast.name]:Toast, },
    name:'ApplyBasicInfo',
    components:{
    },
    data(){
        return{
            readDescription:{title:'',desc:''},
            cardPage:'',
            CardExp:[],
            thisStyle:'',
            btnChangeEnable:false,
            btnAgree:true,
            title:'我要申请-第1步',
            countdown:'',
            btnText:'发送验证码',
            timer: null,
            showCount:false,
            show: false,
            formData: {
                name: '',
                nameEng:'',
                checkNumber:'',
                idcard:'',
                agree:''
            },
            flag:{
                name: false,
                nameEng:false,
                checkNumber:false,
                idcard:false,
                agree:false,
            },
            errMsg:{
                name:'',
                nameEng:'',
                idcard:'',
                checkNumber:''
            }
      };
    },
    methods:{
        getHomeData(){
            const id=this.$route.params.id
            this.requestAxios({
                url: "/mock/index.json",
                data: {
                    id: id,
                },
                params: {
                // age: 18,
                },
                method: "get",
            })
            .then((res) => {
                this.cardPage = res.data.CardPage
                Array.prototype.forEach.call(res.data.CardExp, item => {
                     if(item.id<=1){
                        this.CardExp.push(item)
                     }if(item.id==2){
                         this.readDescription.title = item.dialogTitle
                         this.readDescription.desc = item.dialogDesc
                     }
            }); 
            })
            .catch((err) => {
                console.log(err);
            });
        },
        timeStart(){
            if (!this.timer) {
                this.countdown = TIME_COUNT;
                this.timer = setInterval(() => {
                  if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                    this.countdown--;
                    this.btnText= `(${this.countdown}s)后发送`;
                    this.btnChangeEnable=true
                  } else {
                    this.btnText= "发送验证码";
                    clearInterval(this.timer);
                    this.btnChangeEnable=false
                    this.timer = null;
                  }
                }, 1000)
            }
        }, 
        getPinYin(){
            const chinese = new RegExp("[\u4E00-\u9FA5]+");
            if (!this.formData.name) {
                //Toast('提示内容');
                this.errMsg.name = '请填姓名！'
                 this.flag.name=false
                return false
            }else if(!chinese.test(this.formData.name)){
                this.errMsg.name = '请填汉字！'
                this.flag.name=false
                return false
            }else {
                this.errMsg.name = ''
                this.flag.name=true
                this.formData.nameEng=pinyin.chineseToPinYin(this.formData.name);
                this.checkNameEng()
                return true
            }
        },
        checkNameEng(){
            const english = new RegExp("[A-Za-z]+");
            if (!this.formData.nameEng) {
                this.errMsg.nameEng = '请填姓名拼音！'
                this.flag.nameEng=false
                return false
            }else if(!english.test(this.formData.nameEng)){
                this.errMsg.nameEng = '请填拼音！'
                this.flag.nameEng=false
                return false
            }else {
                this.errMsg.nameEng = ''
                this.flag.nameEng=true
                return true
            }
        },
        checkCard(){
            let zg =  /^[0-9a-zA-Z]*$/;
            if (!this.formData.idcard) {
                this.errMsg.idcard = '请填身份证号！'
                this.flag.idcard=false
                return false
            }else if(this.formData.idcard.length!=18){
                this.errMsg.idcard = '位数错误'
                this.flag.idcard=false
                 return false
            }else if(!zg.test(this.formData.idcard)){
                this.errMsg.idcard = '格式错误'
                this.flag.idcard=false
                return false
            }else{
                this.errMsg.idcard = ''
                this.flag.idcard=true
                return true
            }
        },
        checkCode(){
             if (!this.formData.checkNumber) {
                this.errMsg.checkNumber = '请填验证码！'
                 this.flag.checkNumber=false
                return false
            }else {
                this.errMsg.checkNumber = ''
                this.flag.checkNumber=true
                return true
            }
        },
        getValue(val){
            const check = document.getElementById("check");
            const value = check.checked;
            if(value){
               this.flag.agree=true
            }else{
                this.flag.agree=false
            }

        },
        submitMsg(){
            const objOld=this.formData
            let objNew={}
            Object.keys(objOld).forEach(item =>{
                let data=objOld[item]
                data=data.toString()
                data = data.split(" ").join("");
                objNew[item]=data
            })
            sessionStorage.setItem('basicData',JSON.stringify(objNew))
            this.$router.push({
                name: 'ApplyAnoInfo',
                params:{
                    id:this.$route.params.id
                },
            })
        },
        showContract(){
            createDom(
                DialogMessage,
                {},
                {
                title:  this.readDescription.title,
                content: this.readDescription.desc,
                classAno:'',
                }
            );
        },
        showDescription(index){
            Array.prototype.forEach.call(this.CardExp, item => {
                     if(item.id==index){
                        createDom(
                            DialogMessage,
                            {},
                            {
                                title: item.dialogTitle,
                                content: item.dialogDesc,
                                classAno:'introduction',
                            }
                        );
                     }
            }); 
        },
        goBack(){
             this.$router.go(-1)
        }
            
    },
    mounted () {
        this.getHomeData()
    },
    watch:{
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

.formBox{
    padding: 0 3%;
    .van-field__control{
        text-align: initial;
    }
    .van-field__label{
         width: 6em;
     }
    .van-field__value{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .van-field__body{
            width: 50%;
        }
    }
}
button{
outline:none;

}
/* el-form样式*/
.el-carousel__container{
    height: 10rem;
}
.el-form-item__label,.el-input{
      height: 2.5em;
    line-height: 2.5em;
}
.el-input__inner{
    height: 100%;
}
.el-form-item{
    height: 2.5em;
    line-height: 2.5em;
    border-bottom: 1px solid #80808052;
    
}
.el-input{
    width: 60%;
}
.el-carousel__item{
    text-align: center;
}
.el-carousel__arrow{
    background: inherit !important;
    color: gray !important;
    font-size: 20px !important;
}
.el-form-item{
    margin-bottom: .5rem;
    padding: 0 1em;
}
/*.el-input结束*/
.checkNum{
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 1em;
    border: none;
    background: #808082d1;
    width:100%;
    
}
  .time {
    font-size: 13px;
    color: #999;
  }

  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .box_frame-row{
    align-items: center;     /* 垂直居中 */
  }
.exper{
    height: 1.5em;
    width: 3em;
    text-align: center;
    background: gray;
    border-radius: 15%;
    line-height: 1.5em;
    color:#fff;
}
.description{
    width:80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

 
</style>