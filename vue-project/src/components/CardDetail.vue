<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">联系墙主撕掉该标签</p>
      <p class="report">举报</p>
    </div>
    <note-card :note="cards"></note-card>
    <div class="form">
      <textarea class="message" placeholder="请输入..." v-model="discuss"></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name"/>
        <el-button type="info" round size="large" :disabled="!isDis" @click="submit">评论</el-button>
      </div>
    </div>
    <p class="title">评论{{ cards.comment[0].count }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(e, index) in comments" :key="index">
        <div class="user-head" :style="{backgroundImage: portrait[e.imgurl]}"></div>
        <div class="comm-m">
          <div class="m-top">
            <p class="name">{{ e.name }}</p>
            <p class="time">{{ dateOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.comment }}</div>
        </div>
      </div>
      <p class="mord" @click="getComment" v-show="nowpage > 0">加载更多</p>
    </div>
  </div>
</template>

<script>
  import noteCard from './NodeCard.vue'
  import {portrait} from "../utils/data.js";
  import {dateOne} from "../utils/ypcsg.js";
  import { insertCommentApi, findCommentPageApi } from "../api/index.js";
  export default {
    data(){
      return{
        comments: [],
        portrait,
        dateOne,
        isDis: true,
        discuss: '',//输入内容
        name: '匿名',//用户名
        nowpage: 1, //当前页
        pageSize: 2, //一页多少条
      }
    },
    computed:{
      isDis(){
        return !!(this.discuss && this.name);
      },
      cards(){
        return this.card
      },
    },
    props:{
      card:{
        default:{

        }
      }
    },
    components:{
      noteCard
    },
    methods: {
      submit(){
        if(this.isDis){
          //如果有用户就用头像，没有就随机头像
          let img = Math.floor(Math.random() * 14)
          if(this.name){
            name = this.name
          }
          let data = {
            wallId: this.cards.id,
            userId: '匿名',
            imgurl: img,
            comment: this.discuss,
            name: this.name,
            moment: new Date(),
          }
          console.log(data)
          insertCommentApi(data).then(() => {
            this.comments.unshift(data)
            this.cards.comment[0].count ++
            //清空评论区
            this.discuss = ''
          })
        }
      },
      //获取评论
      getComment(){
        if(this.nowpage > 0){
          let data = {
            page: this.nowpage,
            pageSize: this.pageSize,
            id: this.card.id,
          }
          findCommentPageApi(data).then((res) => {
            this.comments = this.comments.concat(res.message)
            //设置下一次的page
            if(res.message.length == this.pageSize){
              this.nowpage ++
            }else{
              this.nowpage = 0
            }
          })
        }
      }
    },
    mounted() {
      this.getComment()
    },
    watch: {
      card(){
        //卡片发生变化
        this.nowpage = 1
        this.comments = []
        this.getComment()
      }
    }
  }
</script>

<style scoped lang="less">
  .card-detail{
    position: relative;
    padding: 10px 50px;
    .top-bt{
      position: fixed;
      top: 0;
      left: 0;
      padding: 6px;
      display: flex;
      .revoke{
        color: #3B73F0;
        cursor: pointer;
        padding-right: 40px;
        padding-left: 30px;
        font-size: 16px;
      }
      .report{
        color: #F55151;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .form{
      .message{
        background: none;
        width: 100%;
        height: 72px;
        border: 1px solid rgba(148, 148, 148, 1);
        resize: none;
        outline: none;
        padding: 8px;
        box-sizing: border-box;
        margin-top: 20px;
      }
      .bt{
        display: flex;
        padding-top: 8px;
        justify-content: space-between;
      }
      .name{
        width: 320px;
        box-sizing: border-box;
        padding: 5px;
        background: none;
        outline: none;
        border: 1px solid rgba(148, 148, 148, 1);
        line-height: 24px;
      }
    }
    .title{
      font-weight: 600;
      padding-top: 30px;
      padding-bottom: 20px;
    }
    .comment-li{
      display: flex;
      padding-bottom: 30px;
      .user-head{
        margin-top: 10px;
        flex: none;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        overflow: hidden;
        // background-image: linear-gradient(180deg, #FFA9D9 0%, #E83D3D 100%);
      }
      .comm-m{
        padding-left: 8px;
      }
      .m-top{
        display: flex;
        align-items: center;
        .name{
          font-weight: 600;
        }
        .time{
          font-size: 12px;
          padding-left: 4px;
          color: #949494;
        }
      }
      .mm{
        padding-top: 4px;
      }
    }
  }
  .mord{
    color: #5B5B5B;
    text-align: center;
    padding-top: 20px;
    cursor: pointer;
  }
</style>