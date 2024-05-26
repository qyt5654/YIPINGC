<template>
  <div>
    <transition name="modal">
      <div class="ypc-model" v-if="isModel">
        <div class="ypc-model-head">
          <span class="model-name">{{ title }}</span>
          <el-icon size="25px" @click="closeModel"><Close /></el-icon>
        </div>
        <div class="ypc-model-main">
          <slot class="slot"></slot>
<!--          <div class="slot"></div>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";
import {Close} from "@element-plus/icons-vue";

const props = defineProps({
  title:{
    default: '标题'
  },
  isModel:{
    default: false,
  }
})

const emit = defineEmits(['close']);
function closeModel(){
  emit('close', '关闭')
}

</script>

<style scoped lang="less">
.modal-enter-active{
  animation: aaa 0.5s;
} /* 动画样式 animation 为名字(自己随便定义), 后面的enter-active 和 leave-active 分别代表进场和出场 Vue 会自动识别 */
.modal-leave-active{
  animation: aaa 0.5s reverse;
}
@keyframes aaa{
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
.ypc-model{
  width: 520px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 80px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.80);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.80);
  backdrop-filter: blur(20px);
  .ypc-model-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    .model-name{
      font-size: 24px;
      color: #202020;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 600;
    }
  }
  .slot{
    height: 1800px;
    background: #eee;
  }
  .ypc-model-main{
    //border: 1px solid #eee;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    padding-bottom: 180px;
    box-sizing: border-box;
    margin: 2px;
  }
  .ypc-model-main::-webkit-scrollbar {
    width: 6px;
  }
  .ypc-model-main::-webkit-scrollbar-thumb {
    background-color: #D2D2D2;
    border-radius: 4px;
  }
}
</style>