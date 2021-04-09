import Vue from "vue"
export default{
    //输入身份证号失焦事件
    checkCard(msg,errMsg,flag){
        alert(11)
        let zg =  /^[0-9a-zA-Z]*$/;
        if (!msg) {
            console.log(errMsg,flag)
            errMsg= '请填身份证号！'
            flag=false
            return false
        }else if(msg.length!=18){
            console.log(22)
            errMsg = '位数错误！'
            flag=false
            return false
        }else if(!zg.test(msg)){
            console.log(33)
            errMsg = '格式错误！'
            flag=false
            return false
        }else{
            console.log(44)
            errMsg = ''
            flag=true
            return true
        }
    },
}