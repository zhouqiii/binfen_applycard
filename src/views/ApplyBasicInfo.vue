<template>
    <div>
        <common-header :title="title">
            <template v-slot:back>
                <svg-icon iconClass="fanhuijiantou" @click="goBack"></svg-icon>
            </template>
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
                <div class="formBox basicInfo">
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
                                    class="idCardWidth"
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
                            <input type="checkbox" id="check" @change="getValue(this)"  :checked="checkAgree">
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
import formRule from '../utils/info.js'
import DialogMessage from '../components/MyComponents/DialogMessage.vue'
import createDom from '../utils/createDom.js'
const TIME_COUNT = 60;
export default {
  components: { SvgIcon,},
    name:'ApplyBasicInfo',
    components:{
    },
    data(){
        return{
            readDescription:{title:'',desc:''},//《信用卡领用合约》标题和内容
            cardPage:'',
            CardExp:[],
            thisStyle:'',
            checkAgree:'',
            btnChangeEnable:false,
            btnAgree:true,
            title:'我要申请-第1步',
            countdown:'',
            btnText:'发送验证码',
            timer: null,
            showCount:false,
            show: false,
            formData: {
                name: '',//中文姓名
                nameEng:'',//姓名拼音
                checkNumber:'',//验证码
                idcard:'',//身份证号
            },
            flag:{//flag里的每一个属性对应一个输入框的校验,校验正确flag里该对应属性修改为true
                name: false,
                nameEng:false,
                checkNumber:false,
                idcard:false,
                agree:true,
            },
            errMsg:{//输入框错误信息提示
                name:'',
                nameEng:'',
                idcard:'',
                checkNumber:''
            }
      };
    },
    methods:{
        getHomeData(){
            //在这里为了响应协议查看页面的同意按钮与返回按钮
            //vuex里state的check参数默认同意协议选中状态
            //3.为了两个页面响应，将check的状态在vuex的嵌套模块module3里传递
            const check=this.$store.state.module3.check
            this.checkAgree=check
            this.flag.agree=check
            ////这里因为我还不会使用路由跳转保持页面数据保存，所以我把数据保存在params里
            //目的是从协议页面跳转回来时，实现保存之前页面已经输入的信息
            if(this.$route.params.dataKeep){
                let data = this.$route.params.dataKeep
                let flagData = this.$route.params.dataFlag
                let formData=this.formData
                let flag=this.flag
                Object.keys(data).forEach(item => {
                    formData[item]=data[item]
                })
                Object.keys(flagData).forEach(item => {
                    flag[item]=flagData[item]
                })
            }
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
                console.log(res.data)
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
        //点击按钮触发发送验证码计时器
        timeStart(){
            if (!this.timer) {
                this.countdown = TIME_COUNT;
                this.timer = setInterval(() => {
                  if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                    this.countdown--;
                    this.btnText= `${this.countdown}s后重发`;
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
        //输入中文姓名失焦事件
        getPinYin(){
            console.log(11)
            const chinese = new RegExp("[\u4E00-\u9FA5]+");
            if (!this.formData.name) {
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
        //输入姓名拼音失焦事件
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
        //输入身份证号失焦事件
        checkCard(){
            //formRule.checkCard(this.formData.idcard,this.errMsg.idcard,this.flag.idcard)
            let zg =  /^[0-9a-zA-Z]*$/;
            if (!this.formData.idcard) {
                this.errMsg.idcard = '请填身份证号！'
                this.flag.idcard=false
                return false
            }else if(this.formData.idcard.length!=18){
                this.errMsg.idcard = '位数错误！'
                this.flag.idcard=false
                 return false
            }else if(!zg.test(this.formData.idcard)){//校验只能输入数字和字母
                this.errMsg.idcard = '格式错误！'
                this.flag.idcard=false
                return false
            }else{
                this.errMsg.idcard = ''
                this.flag.idcard=true
                return true
            }
        },
        //验证码输入失焦事件
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
        //同意协议checkbox改变时触发this.flag.agree改变
        getValue(val){
            const check = document.getElementById("check");
            const value = check.checked;
            this.checkAgree=value
            this.flag.agree=value
            this.$store.state.module3.check=value
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
            sessionStorage.setItem('basicData',JSON.stringify(objNew))//转成字符串
            this.$router.push({
                name: 'ApplyAnoInfo',
                params:{
                    id:this.$route.params.id
                },
            })
        },
        //显示《信用卡领用合约》弹框
        showContract(){
            //这里因为我还不会使用路由跳转使页面数据保存，所以我把数据保存在params里
            this.$router.push({
                name: 'AgreementDescription',
                query:{
                    check:this.checkAgree
                },
                params:{
                    dataKeep:this.formData,
                    dataFlag:this.flag
                }
            })
        },
        //显示年费或权益弹框
        //年费和权益后台传的id：年费=1，权益=0；
        //所以index=0显示权益，index=1显示年费
        showDescription(index){
            Array.prototype.forEach.call(this.CardExp, item => {
                     if(item.id==index){
                        createDom(
                            DialogMessage,
                            {},
                            {
                                title: item.dialogTitle,
                                content: item.dialogDesc,
                                classAno:'introduction',//绑定一个动态class，修改弹框的标题居中或者靠左
                                show:false
                            }
                        );
                     }
            }); 
        },
        //头部返回弹框
        goBack(){
            createDom(
                DialogMessage,
                {},
                {
                    title: '不要走哦，就差一点就申请好了',
                    content: '1、先消费后付款，可以分期可以提现金</br>2、生成良好的个人信用记录</br>3、累计积分，可以免费兑换礼物哦',
                    classAno:'',//绑定一个动态class，修改弹框的标题居中或者靠左
                    show:true
                }
            );
            // this.$router.go(-1)
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
        },
    }
}
</script>
<style lang="less">
.basicInfo{
    padding: 0 3%;
    .van-field__control{
        text-align: initial;
    }
    .van-field__label{
         width: 6em;
         margin-right: 0.1rem;
     }
    .van-field__value{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .van-field__body{
            width: 64%;
        }
    }
    .idCardWidth{
        .van-field__body{
            width: 50%;
        }
    }
}
button{
outline:none;

}
/* el-swipe样式*/
.el-carousel__container{
    height: 10rem;
}
.el-carousel__item{
    text-align: center;
}
.el-carousel__arrow{
    background: inherit !important;
    color: gray !important;
    font-size: 20px !important;
}
/*.el-swipe样式*/
.checkNum{
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 1em;
    border: none;
    background: #808082d1;
    width:6em;
    padding: 0%;
    
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