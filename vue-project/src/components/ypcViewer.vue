<template>
  <transition name="view">
    <div class="ypc-viewer" v-if="isView">
      <div class="bg"></div>
      <div class="viewer-photo">
        <img :src="baseUrl + photos[nowNumber]" class="photo-img"/>
      </div>
      <div class="switch sw-left" @click="changeNumber(0)" v-show="nowNumber > 0">
        <el-icon size="24px"><ArrowLeft /></el-icon>
      </div>
      <div class="switch sw-right" @click="changeNumber(1)" v-show="nowNumber < photos.length - 1">
        <el-icon size="24px"><ArrowRight /></el-icon>
      </div>
    </div>
  </transition>
</template>

<script>

import {defineComponent} from "vue";
import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
import { baseUrl } from "../utils/env.js"

export default defineComponent({
  data(){
    return{
      baseUrl
    }
  },
  components: {
    ArrowRight,
    ArrowLeft
  },
  props: {
    photos: {
      default:[]
    },
    nowNumber: {
      type: Number,
      default: 0,
    },
    isView: {
      default: false,
    }
  },
  methods: {
    changeNumber(e) {
      this.$emit('viewSwitch', e);
    }
  }
})
</script>

<style scoped lang="less">
.view-enter-active{
  animation: aaa 0.5s;
} /* 动画样式 animation 为名字(自己随便定义), 后面的enter-active 和 leave-active 分别代表进场和出场 Vue 会自动识别 */
.view-leave-active{
  animation: aaa 0.5s reverse;
}
@keyframes aaa{
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.ypc-viewer{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
  }
  .viewer-photo{
    position: absolute;
    padding: 82px 520px 0 96px;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      max-width: 100%;

    }
  }
  .switch{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #949494;
    color: white;
    position: absolute;
    bottom: 0;
    top: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: all 0.5s;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
  .sw-left{
    left: 30px;
  }
  .sw-right{
    right: 600px;
  }
}

</style>