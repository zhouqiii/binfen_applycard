<template>
    <div>
        <div class="swiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img :src="image.imgUrl" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
export default {
    name:'SwiperCard',
    props:["images"],
     components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
    data(){
        return{
         
        }
    },
    computed: {
      
    }
}
</script>

<style scoped>
.swiper{
    margin-bottom: .5em;
}
.van-swipe-item{
    text-align: center;
}
</style>