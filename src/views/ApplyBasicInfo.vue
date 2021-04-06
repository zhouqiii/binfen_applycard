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
        <div>
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
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="30%" class="demo-ruleForm">
                            <el-form-item label="中文姓名" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入中文姓名" @blur="getPinYin"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名拼音 " prop="nameEng">
                                <el-input v-model="ruleForm.nameEng" placeholder="英文姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号码 " prop="idcard">
                                <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码 " prop="phonenumber">
                                <el-input v-model="ruleForm.phonenumber" placeholder="请输入电话号码"></el-input>
                            </el-form-item>
                            <el-form-item label="手机验证码 " prop="checkNumber">
                                <el-input v-model="ruleForm.checkNumber"></el-input>
                                <button :disabled="btnChangeEnable" @click="timeStart()" class="checkNum">{{btnText}}</button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="agreeCheck">
                    <button class="submitBtn" :disabled="btnAgree" :style="thisStyle" @click="submitMsg">
                        <span>同意协议并提交下一步</span>
                    </button>
                    <div>
                        <p>
                            <input type="checkbox" name="agree" value="1" id="check" @change="getValue(this)">
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
  components: { SvgIcon },
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
            ruleForm: {
                name: '',
                nameEng:'',
                checkNumber:'',
                idcard:'',
                phonenumber:'',
            },
            rules: {
                name: [
                    { required: true, message: ' ', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                 nameEng: [
                    { required: true, message: '  ', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                idcard: [
                    { required: true, message: '  ', trigger: 'blur' },
                    { min: 18, max: 18, message: ' ', trigger: 'blur' }
                ],
                 phonenumber: [
                    { required: true, message: ' ', trigger: 'blur' },
                    { min: 11, max: 11, message:' ', trigger: 'blur' }
                ],
                 checkNumber: [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
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
            this.ruleForm.nameEng=pinyin.chineseToPinYin(this.ruleForm.name);
        },
        getValue(val){
            const check = document.getElementById("check");
            const value = check.checked;
            if(value){
                this.thisStyle = "background: rgb(165 29 29 / 93%);"
                this.btnAgree = false
            }else{
                this.thisStyle = "background: #33333391"
                this.btnAgree = true
            }

        },
        submitMsg(){
            console.log(11)
            const obj=this.ruleForm
            let flag = true
            Object.keys(obj).forEach(item =>{
                 if(!obj[item]){
                         flag=false
                     }
            })
            if(flag==false){
                alert("请补全基本信息")
            }else{
                this.$router.push({
                    name: 'ApplyAnoInfo',
                    params:{
                        id:this.$route.params.id
                    },
                })
            }
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
//         const btnNode = document.querySelector('.btn')
//         const containerNode = document.querySelector('.dialog')
//         const layerNode = document.querySelector('.dialog_box')
//         const contentNode = document.querySelector('.dialog_content')
//         let startY = 0 // 记录开始滑动的坐标，用于判断滑动方向
//         let status = 0 // 0：未开始，1：已开始，2：滑动中
//         layerNode.addEventListener('touchstart', e => {
//             e.preventDefault()
//         }, false)

//         // 核心部分
//         contentNode.addEventListener('touchstart', e => {
//             status = 1
//             startY = e.targetTouches[0].pageY
//         }, false)
//         contentNode.addEventListener('touchmove', e => {
//         // 判定一次就够了
//         if (status !== 1) return

//         status = 2

//         let t = e.target
//         let py = e.targetTouches[0].pageY
//         let ch = t.clientHeight // 内容可视高度
//         let sh = t.scrollHeight // 内容滚动高度
//         let st = t.scrollTop // 当前滚动高度

//         // 已经到头部尽头了还要向上滑动，阻止它
//         if (st === 0 && startY < py) {
//             e.preventDefault()
//         }

//         // 已经到低部尽头了还要向下滑动，阻止它
//         if ((st === sh - ch) && startY > py) {
//             e.preventDefault()
//         }
//         }, false)

// contentNode.addEventListener('touchend', e => {
//   status = 0
// }, false)
    },
    computed:{
    }
}
</script>
<style>
.formBox{
    margin: 0 3%;
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
    border-radius: 1em;
    border: none;
    background: #808082d1;
    
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