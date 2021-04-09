<template>
    <div>
        <div>
            <van-dialog  v-model="showDialog"
                id="dialog_title" 
                :title="title" 
                :class="classNext" 
                :show-confirm-button="confirmbtn"
            >
                <div class="dialog_content">
                    <pre>{{ content }}</pre>
                </div>
                <!-- <div class="dialog_icon" @click="dialogHide">
                    <svg-icon iconClass="cancelDialog"></svg-icon>
                </div> -->
            </van-dialog>
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
    name:'DialogFrame',
    props:['classAno','show'],
    components: {
        [Dialog.Component.name]: Dialog.Component,
    },
    data() {
        return {
            title:'',
            content: "",
            classNext:'',
            confirmbtn:false,
            showDialog: false,
        };
    },
    watch:{
        classAno(){
            this.classNext=this.classAno
        },
        show(){
            this.showDialog=this.show
        }
  }
}
</script>

<style lang="less" scoped>
.dialog_icon{
    font-size: 32px;
    margin: 1em;
  }
</style>