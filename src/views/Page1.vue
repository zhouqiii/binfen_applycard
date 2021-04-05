<template>
    <div>
<div>page1</div>
    </div>
</template>

<script>
    export default {
        name:"Page1",
        created () {
            console.log(this.$route.params);
        },
    }
</script>

<style lang="less" scoped>

</style>