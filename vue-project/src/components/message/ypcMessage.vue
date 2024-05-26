<template>
  <transition name="down">
    <div class="Yk-message" v-if="isShow">
      <div class="yk-m-i">
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "YIPINGC",
  props:{
    message:{
      type: String,
      default: "",
    },
    type:{
      type: String,
      default: "warn",
    },
  },
  setup(){
    //定义一个对象，包含三种情况的表示没对象key就是类型字符串
    const style = {
      warning: {
        icon: "icon-warning",
      },
      error: {
        icon: "icon-error",
      },
      success: {
        icon: "icon-success",
      }
    }
    //定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
    const isShow = ref(false)
    onMounted(() => {
      //需调用钩子函数，等dom渲染完成后，再进行赋值，如果在setup中直接赋值，则会被直接渲染
      isShow.value = true
      setTimeout(() => {
        isShow.value = false
      }, 3000)
    })
    return { style, isShow }
  }
}
</script>

<style scoped lang="less">
  //动画效果
  .down {
    &-enter{
      &-from{
        transform: translateY(-30px);
        opacity: 0;
      }
      &-active{
        transition: all 0.3s;
      }
      &-to{
        transform: translateY(0);
        opacity: 1;
      }
    }
    &-leave{
      &-from{
        transform: translateY(0);
        opacity: 1;
      }
      &-active{
        transition: all 0.3s;
      }
      &-to{
        transform: translateY(-30px);
        opacity: 0;
      }
    }
  }
  .Yk-message{
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    .yk-m-i{
      padding: 0 20px;
      border-radius: 8px;
      color: #202020;
      background: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    i{
      margin-right: 6px;
      vertical-align: middle;
    }
    .text{
      vertical-align: middle;
    }
  }
  //icon颜色
  .icon-success{
    color: #22BF87;
  }
  .icon-warning{
    color: #F67770;
  }
  .icon-error{
    color: #F55151;
  }
</style>