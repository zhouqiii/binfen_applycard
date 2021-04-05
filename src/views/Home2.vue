<template>
  <div class="home">
    <div>home</div>
    <x3x4 :list="x3x4List"></x3x4>
    <!-- <x51 :list="x51List"></x51> -->
  </div>
</template>

<script>
import x3x4 from "@/components/webComps/x3x4.vue";
export default {
  name: "Home",
  components: {
    x3x4,
  },
  data() {
    return {
      x3x4List: [
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img1.png"),
        },
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img2.png"),
        },
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img1.png"),
        },
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img2.png"),
        },
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img1.png"),
        },
      ],
      x51List: [
        {
          mainTitle: "测试的主标题",
          subTitle: "测试的副标题",
          imgUrl: require("../assets/img/img1.png"),
        },
      ],
    };
  },
  created() {
    // class Obj{
    //     constructor(name,age,sex){
    //         this.name = name;
    //         this.age = age;
    //         // this.sex = sex;
    //     }
    //     get sex(){
    //         return "5555555"
    //     }
    // }
    // let o = {
    //     name:"lisong",
    //     age:18,
    //     sex:"male"
    // }
    // let obj1 = new Obj("lisong",18,"male")
    // console.log(obj1.sex)
    let obj = {
      _name:"lisong",
      get name(){
        return this._name + "55555"
      },
      set name(v){
        this._name += v
      },
    }
    obj.name = 1
    console.log(obj.name)
    // var p = {
    //   _age: 18,
    //   get age() {
    //     return this._age;
    //   },
    //   set age(val) {
    //     this._age = val;
    //   },
    // };
    // p._age = 99;
    // console.log(p._age);
  },
};
</script>

<style lang="less" scoped>
</style>