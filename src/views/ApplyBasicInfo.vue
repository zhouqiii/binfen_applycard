<template>
    <div>
        <common-header :title="title" ifDialog='1'>
        </common-header>
        <div class="contentBody">
            <!--把这里要展示的轮播图信息统一放在cardExp里，cardMsg是当前页面停留在的card信息-->
            <!--card信息展示部分-->
             <div class="box_frame-row applyAllCard">
                <div @click="changeCardLeft()">
                    <svg-icon iconClass="left"></svg-icon>
                </div>
                <div class="box_frame">
                    <div><img :src="cardMsg.defaultPic"/></div>
                    <div>
                        <p>{{cardMsg.cardName}}</p>
                    </div>
                    <div>
                        <p class="time">{{cardMsg.cardIntro}}</p>
                    </div>
                </div>
                <div @click="changeCardRight()">
                    <svg-icon iconClass="right"></svg-icon>
                </div>
            </div>
            <div style="padding:1% 3%">
                <div style="height:2em" class="box_frame-row">
                    <div class="exper">年费</div>
                    <div class="description"><span>{{cardMsg.nian}}</span></div>
                    <div @click="showNian(cardMsg.nianName,cardMsg.nianContent)" class="btn">
                        <svg-icon iconClass="right"></svg-icon>
                    </div>
                </div>
                <div style="height:2em" class="box_frame-row">
                    <div class="exper">权益</div>
                    <div class="description"><span>{{cardMsg.quan}}</span></div>
                    <div @click="showDescription(cardMsg.quanName,cardMsg.quanContent)" class="btn">
                        <svg-icon iconClass="right"></svg-icon>
                    </div>
                </div>
            </div>
            <!--card信息展示部分结束-->
            <div>
                <div class="formBox basicInfo">
                    <div><p class="titleCard">基本信息</p></div>
                    <div>
                        <van-form class="ruleForm">
                            <div class="formItem">
                                <van-field v-model="formData.chineseName" 
                                    label="*中文姓名" 
                                    placeholder="中文姓名" 
                                    @blur="getPinYin"
                                    :error-message="errMsg.chineseName"
                                />
                                <!-- :error-message="errMsg.chineseName"    -->
                            </div>
                            <div class="formItem">
                                <van-field v-model="formData.chinesePinyin" 
                                    label="*姓名拼音" 
                                    placeholder="英文姓名" 
                                    @blur="checkchinesePinyin" 
                                    :error-message="errMsg.chinesePinyin"  
                                />
                            </div>
                            <div class="formItem">
                                <van-field v-model="formData.idCard"
                                    label="*身份证号码" 
                                    placeholder="身份证号" 
                                    @blur="checkCard" 
                                    :error-message="errMsg.idCard" 
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
import DialogMessage from '../components/MyComponents/DialogMessage.vue'
import createDom from '../utils/createDom.js'
const TIME_COUNT = 60;
export default {
  components: { SvgIcon,},
    chineseName:'ApplyBasicInfo',
    components:{
    },
    data(){
        return{
            readDescription:{title:'',desc:''},//《信用卡领用合约》标题和内容
            cardPage:'',
            CardExp:[],
            thisStyle:'',
            cardMsg: '',
            checkAgree:true,
            btnChangeEnable:false,
            getCardId: JSON.parse(this.$route.query.cardId),
            btnAgree:true,
            title:'我要申请-第1步',
            countdown:'',
            btnText:'发送验证码',
            timer: null,
            showCount:false,
            show: false,
            formData: {
                chineseName: '',//中文姓名
                chinesePinyin:'',//姓名拼音
                checkNumber:'',//验证码
                idCard:'',//身份证号
            },
            flag:{//flag里的每一个属性对应一个输入框的校验,校验正确flag里该对应属性修改为true
                chineseName: false,
                chinesePinyin:false,
                checkNumber:false,
                idCard:false,
                agree:true,
            },
            errMsg:{//输入框错误信息提示
                chineseName:'',
                chinesePinyin:'',
                idCard:'',
                checkNumber:''
            }
      };
    },
    methods:{
        getHomeData(){
            //这部分的产品逻辑没有确定，后台接口逻辑没法使用，用本地的数据
            //首页进来路由携带query携带cardId
            this.requestAxios({
                url: "/mock/index.json",
                method: "get",
            })
            .then((res) => {
                Array.prototype.forEach.call(res.data.CardExp, item => {
                    if (item.cardId === this.getCardId) {
                        this.cardMsg = item;//如果这里信用卡的cardId和路由携带cardId一致，赋值cardMsg（当前页面停留在的卡面信息）
                    }
                    if(item.cardId === 100010) {//协议弹框内容
                        this.readDescription.title = item.dialogcardName
                        this.readDescription.desc = item.dialogcardIntroc
                       
                    }else{
                         this.CardExp.push(item);// CardExp对应年费和权益的弹框信息
                    }
                }); 
                console.log(this.CardExp)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        // 点击右边切换图片
    changeCardRight() {
      const len = this.CardExp.length;
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < len; i++) {
        if (this.getCardId === this.CardExp[i].cardId) {
          if (i === len - 1) {
            this.getCardId = this.CardExp[0].cardId;
            this.cardMsg = this.CardExp[0];
            break;
          } else {
            this.getCardId = this.CardExp[i + 1].cardId;
            this.cardMsg = this.CardExp[i + 1];
            break;
          }
        }
      }
    },
    // 点击左边切换图片
    changeCardLeft() {
      const len = this.CardExp.length;
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < len; i++) {
        if (this.getCardId === this.CardExp[i].cardId) {
          if (i === 0) {
            this.getCardId = this.CardExp[len - 1].cardId;
            this.cardMsg = this.CardExp[len - 1];
            break;
          } else {
            this.getCardId = this.CardExp[i - 1].cardId;
            this.cardMsg = this.CardExp[i - 1];
            break;
          }
        }
      }
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
            if (!this.formData.chineseName) {
                this.errMsg.chineseName = '请填姓名！'
                this.flag.chineseName=false
                return false
            }else if(!chinese.test(this.formData.chineseName)){
                this.errMsg.chineseName = '请填汉字！'
                this.flag.chineseName=false
                return false
            }else {
                this.errMsg.chineseName = ''
                this.flag.chineseName=true
                this.formData.chinesePinyin=pinyin.chineseToPinYin(this.formData.chineseName);
                this.checkchinesePinyin()
                return true
            }
        },
        //输入姓名拼音失焦事件
        checkchinesePinyin(){
            const english = new RegExp("[A-Za-z]+");
            if (!this.formData.chinesePinyin) {
                this.errMsg.chinesePinyin = '请填姓名拼音！'
                this.flag.chinesePinyin=false
                return false
            }else if(!english.test(this.formData.chinesePinyin)){
                this.errMsg.chinesePinyin = '请填拼音！'
                this.flag.chinesePinyin=false
                return false
            }else {
                this.errMsg.chinesePinyin = ''
                this.flag.chinesePinyin=true
                return true
            }
        },
        //输入身份证号失焦事件
        checkCard(){
            //formRule.checkCard(this.formData.idCard,this.errMsg.idCard,this.flag.idCard)
            let zg =  /^[0-9a-zA-Z]*$/;
            if (!this.formData.idCard) {
                this.errMsg.idCard = '请填身份证号！'
                this.flag.idCard=false
                return false
            }else if(this.formData.idCard.length!=18){
                this.errMsg.idCard = '位数错误！'
                this.flag.idCard=false
                 return false
            }else if(!zg.test(this.formData.idCard)){//校验只能输入数字和字母
                this.errMsg.idCard = '格式错误！'
                this.flag.idCard=false
                return false
            }else{
                this.errMsg.idCard = ''
                this.flag.idCard=true
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
                path: '/ApplyAnoInfo',
                query:{
                    cardId:this.$route.query.cardId,
                    data:JSON.stringify(this.cardMsg)
                },
            })
        },
        //显示《信用卡领用合约》弹框
        showContract(){
            //A2-2：实现了弹框滚动，已在弹框组件中标注实现方法
             createDom(
                DialogMessage,
                {},
                {
                    title: this.readDescription.title,
                    content: this.readDescription.desc,
                    classAno:'',//绑定一个动态class，修改弹框的标题居中或者靠左
                    show:false,
                    paClassScroll:'dialogScroll'//绑定一个动态class，修改弹框的content部分，有滚动条的给固定长度，无滚动条的自适应
                }
            );
            
        },
        //显示年费或权益弹框
        showDescription(title,content){
            createDom(
                DialogMessage,
                {},
                {
                    title: title,
                    content: content,
                    classAno:'introduction',//绑定一个动态class，修改弹框的标题居中或者靠左
                    show:false
                }
            );
        },
        showNian(title,content){
            createDom(
                DialogMessage,
                {},
                {
                    title: title,
                    content: content,
                    classAno:'introduction',//绑定一个动态class，修改弹框的标题居中或者靠左
                    show:false
                }
            );
        },
      
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
    },
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
.applyAllCard{
    padding: 0 1rem;
    .box_frame{
        p{
            margin: 0;
        }
    }
}
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