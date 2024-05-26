<template>
  <div class="photo-card">
    <img :src="baseUrl + card.imgurl" class="photo-img"/>
    <div class="photo-bg" @click="toDetail"></div>
    <div class="photo-like" :class="{islike:card.islike[0].count > 0}" @click="clickLike">
      <el-icon><Star /></el-icon>
      <span class="like-data" >{{ photo.like[0].count }}</span>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "../utils/data.js";
import {ChatLineRound, Star} from "@element-plus/icons-vue";
import { baseUrl } from "../utils/env.js"
import {insertFeedbackApi} from "../api/index.js";

export default {
  methods: {
    cardColor() {
      return cardColor
    },
    toDetail(){
      this.$emit('toDetail')
    },
    clickLike(){
      console.log(this.card.islike[0].count)
      if(this.card.islike[0].count == 0){
        let data = {
          wallId: this.card.id,
          userId: '匿名',
          type: 0,
          moment: new Date(),
        }
        insertFeedbackApi(data).then(() => {
          //反馈
          this.card.like[0].count ++
          this.card.islike[0].count ++
        })
      }
    }
  },
  data(){
    return{
      label,
      cardColor,
      baseUrl
    }
  },
  components: {
    ChatLineRound, Star
  },
  props: {
    photo: {
      default: {

      }
    },
  },
  computed: {
    card(){
      return this.photo;
    }
  },
  created() {
    console.log(baseUrl + this.card.imgurl)
  }
}
</script>

<style scoped lang="less">
.photo-card{
  position: relative;
  .photo-img{
    width: 100%;
  }
  .photo-bg{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    cursor: pointer;
  }
  .photo-like{
    position: absolute;
    left: 8px;
    top: 8px;
    background: rgba(255, 255, 255, 0.80);
    border-radius: 20px;
    height: 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(20px);
    opacity: 0;
    transition: all 0.5s;
    cursor: pointer;
    .like-data{
      color: #202020;
      padding-left: 4px;
    }
  }
  &:hover{
    .photo-bg{
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
}
</style>