<template>
<div class="node-card" :style="{ width: width, background: cardColor()[card.color] }">
  <div class="top">
    <p class="time">{{ dateOne(card.moment) }}</p>
    <p class="label">{{ label[card.type][card.label] }}</p>
  </div>
  <p class="message" @click="toDetail">{{ card.message }}</p>
  <div class="foot">
    <div class="foot-left">
      <div class="like" :class="{islike:card.islike[0].count > 0}" @click="clickLike">
        <el-icon><Star /></el-icon>
        <span class="value">{{ card.like[0].count }}</span>
      </div>
      <div class="like" v-show="card.comment[0].count > 0">
        <el-icon><ChatLineRound /></el-icon>
        <span class="value">{{ card.comment[0].count }}</span>
      </div>
    </div>
    <div class="name">{{ card.name }}</div>
  </div>
</div>
</template>

<script>
import {ChatLineRound, Star} from "@element-plus/icons-vue";
import {label, cardColor} from "../utils/data.js";
import {dateOne} from "../utils/ypcsg.js";
import { insertFeedbackApi } from "../api/index.js"

export default {
  methods: {
    cardColor() {
      return cardColor
    },
    toDetail(){
      this.$emit('toDetail')
    },
    //点击喜欢
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
      dateOne,
      user: this.$store.state.user,
    }
  },
  components: {
    ChatLineRound,
    Star
  },
  props: {
    width: {
      default: "100%",
    },
    note: {
      default: {

      }
    },
  },
  computed: {
    card(){
      return this.note;
    }
  },
  created() {
    //console.log(this.card)
  },
}
</script>

<style scoped lang="less">
div {
  word-wrap: break-word; //设置文本自动换行
  word-break: normal;
}

.node-card{
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  .top{
    display: flex;
    justify-content: space-between;
    padding-bottom: 4px;
    p{
      font-size: 12px;
      color: #949494;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
  .message{
    height: 100px;
    color: #202020;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
  }
  .foot{
    display: flex;
    left: 0;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .foot-left{
      display: flex;
      span{
        font-size: 12px;
        color: #7E7E7E;
        line-height: 16px;
        padding-left: 4px;
      }
      el-icon{
        font-size: 16px;
      }
      .like{
        padding-right: 8px;
        display: flex;
        align-items: center;
      }
    }
  }
  .name{
    font-size: 16px;
    color: #202020;
    letter-spacing: 0;
    text-align: right;
    font-weight: 500;
  }
  .islike{
    color: red;
  }
}
</style>