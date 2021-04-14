<template>
    <div>
        <div class="text">这是用rem测试文字的样式</div>
    </div>
</template>
<script>

export default {
    name:'RemTest',
    beforeCreate() {//方法二.js设置判断不同的屏幕然后设置html的字体大小
        console.log(window.innerWidth)
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 100 + 'px';
    },
}
</script>

<style scoped>
.text{
    font-size: 2rem;
}
</style>