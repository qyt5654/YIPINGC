<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p class="label-list" :class="{lbselected: nlabel == -1}" @click="selectNode(-1)">全部</p>
      <p class="label-list" v-for="(e, index) in label[id]" :key="index"
         :class="{lbselected: nlabel == index}" @click="selectNode(index)">{{ e }}</p>
    </div>
    <div v-show="id==0">
      <div class="card" :style="{width: nWidth + 'px'}">
        <node-card v-for="(e, index) in cards" :key="index" :note="e" class="card-inner" :width="'288px'"
                   :class="{cardSelected: index == cardSelected}" @toDetail="selectedCard(index)">
        </node-card>
      </div>
    </div>
    <div class="photo" v-show="id==1">
      <photo-card :photo="e" class="photo-card" v-for="(e, index) in cards"
                  :key="index" @toDetail="selectedCard(index)"></photo-card>
    </div>

    <!--卡片状态-->
    <div class="none-msg" v-if="isOk == 0">
      <div class="p">{{ none[id].msg }}</div>
    </div>

    <div class="FLoader" v-show="isOk == -1">
      <div class="loader" v-if="isOk"></div>
    </div>

    <p class="bottom-tip" v-show="isOk == 2">没有更多了····</p>

    <div class="add" :style="{button: addButton + 'px'}">
      <el-button type="primary" color="#202020" @click="ok">添加</el-button>
    </div>
    <y-p-c-model :title="title" @close="closeModel" :isModel="model">
      <new-card :id="id" @addClose="closeModel" v-if="cardSelected === -1" @clickbt="newCard"></new-card>
      <card-detail v-if="cardSelected !== -1" :card="cards[cardSelected]"></card-detail>
    </y-p-c-model>
    <ypc-viewer :isView="view" :photos="photoArr" :nowNumber="cardSelected" @viewSwitch="viewSwitch"></ypc-viewer>
  </div>
</template>

<script>
import {wallType, label, none} from "../utils/data.js";
import NodeCard from "../components/NodeCard.vue";
import {Message, Plus, Search} from "@element-plus/icons-vue";
import YPCModel from "../components/YPCModel.vue";
import NewCard from "../components/NewCard.vue"
import cardDetail from "../components/CardDetail.vue"
import CardDetail from "../components/CardDetail.vue";
import PhotoCard from "../components/PhotoCard.vue"
import ypcViewer from "../components/ypcViewer.vue"
import { findWallPageApi } from "../api/index.js"

//页面宽度
export default {
  computed: {
    Search,
    Plus,
    YPCModel,
    cardDetail,
    id(){  // 留言墙与照片墙的切换的id
      return this.$route.query.id;
    }
  },
  watch: {
    id(){
      this.model = false;
      this.view = false;
      this.nlabel = -1;
      this.cardSelected = -1;
    }
  },
  data(){
    return{
      none,
      wallType,
      label,
      nlabel: -1, //当前对应的标签
      cards: [],
      nWidth: 0,//卡片模块宽度
      addButton: 30,
      title: '写留言',//新建标题
      model: false,//是否调用
      cardSelected: -1,//当前选择卡片
      //photo: photo.data,
      view: false, //预览大图
      photoArr: [],//图片列表
      isOk: -1, //是否加载中 -1为加载中，0没有数据
      user: '',
      page: 1,
      pageSize: 30,
    }
  },
  methods:{
    //切换标签
    selectNode(e){
      this.nlabel = e;
      //清空当前数据
      this.cards = []
      this.page = 1
      this.getWallCard(this.id)
    },
    noteWidth(){
      let wWidth = document.body.clientWidth;
      this.nWidth = Math.floor((wWidth - 120) / 300) * 300;
    },
    //监听页面滚动
    scrollBottom(){
      //距离顶部距离
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //屏幕高度
      let clientHeight = document.documentElement.clientHeight;
      //内容高度
      let scrollHeight = document.documentElement.scrollHeight;
      if(scrollTop + clientHeight + 230 >= scrollHeight){
        this.addButton = scrollTop + clientHeight + 230 - scrollHeight;
      }else{
        this.addButton = 30;
      }

      //加载更多
      if(scrollTop + clientHeight == scrollHeight) {
        this.getWallCard(this.id)
      }
    },
    //关闭窗口
    closeModel(){
      this.model = false
      if( this.id == 1 ){
        this.view = false;
      }
    },
    //开启窗口
    ok(){
      this.title = '写留言'
      this.cardSelected = -1;
      this.model = true
    },
    selectedCard(e){
      this.title = '';
      if(e !== this.cardSelected){
        this.cardSelected = e;
        this.model = true;
        if(this.id == 1){
          this.view = true;
        }
      }else{
        this.cardSelected = -1;
        this.model = false;
        if(this.id == 1){
          this.view = false;
        }
      }
    },
    getPhoto(){
      for(let i = 0; i < this.cards.length; i ++){
        this.photoArr.push(this.cards[i].imgurl)
      }
      //console.log(this.photoArr)
    },
    //切换图片
    viewSwitch(e){
      if(e == 0){
        this.cardSelected --;
      }else{
        this.cardSelected ++;
      }
    },
    //前端插入卡片
    newCard(e){
      //console.log(e)
      this.cards.unshift(e)
      this.closeModel()
    },
    //获取卡片
    getWallCard(id){
      //只有page
      if(this.page > 0){
        this.isOk = -1
        let data = {
          type: this.id,
          page: this.page,
          pageSize: this.pageSize,
          userId: '匿名',
          label: this.nlabel
        }
        // console.log(data)
        findWallPageApi(data).then((res) => {
          this.cards = this.cards.concat(res.message)
          //设置下一次page
          // console.log(res.message)
          if(res.message.length){
            this.page ++
          }else{
            this.page = 0
          }
          if(this.cards.length > 0){
            this.isOk = 1
            if(this.page == 0){
              this.isOk = 2
            }
          }else{
            this.isOk = 0
          }

          //如果为图片将图片单独拿上来
          if(this.id == 1){
            for(let i = 0; i < this.cards.length; i ++){
              this.photoArr.push(this.cards[i].imgurl)
            }
          }
        })
      }
    },
  },
  components:{
    Message,
    CardDetail,
    YPCModel,
    Plus,
    NodeCard,
    NewCard,
    PhotoCard,
    ypcViewer,
    findWallPageApi
  },
  mounted() {
    this.noteWidth();
    this.getPhoto();
    this.getWallCard(0);

    //监听屏幕宽度变化
    window.addEventListener("resize", this.noteWidth);
    //监听滚动高度变化
    window.addEventListener('scroll', this.scrollBottom);
  },
  unmounted() {
    //监听屏幕宽度变化
    window.addEventListener("resize", this.noteWidth);
    //监听滚动高度变化
    window.addEventListener('scroll', this.scrollBottom);
  }
}
</script>

<style scoped lang="less">
.FLoader{
  width: 100%;
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: l1 1s infinite;
  margin: auto;
}
@keyframes l1 {to{transform: rotate(.5turn)}}

.wall-message{
  min-height: 1050px;
  padding-top: 18px;

  .title{
    padding-top: 0;
    padding-bottom: 0;
    font-size: 78px;
    color: #202020;
    text-align: center;
    font-weight: 600;
  }

  .slogan{
    color: #202020;
    text-align: center;
    font-size: 24px;
  }

  .card{
    display: flex;
    flex-wrap: wrap;
    padding-top: 28px;
    margin: auto;
    .card-inner{
      margin: 6px;
    }
    .cardSelected{
      border: 1px solid #3B73F0;
    }
  }
  .add{
    background: #202020;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
}

.label{
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .label-list{
    padding: 0 14px;
    display: flex;
    align-items: center;
    line-height: 28px;
    height: 30px;
    margin: 4px;
    color: #5B5B5B;
    cursor: pointer;
  }
  .lbselected {
    color: #202020;
    font-weight: 600;
    border: 1px solid #202020;
    border-radius: 14px;
  }
}
.photo{
  width: 88%;
  margin: 0 auto;
  columns: 6;
  column-gap: 6px;
}
.photo-card{
  width: 300px;
  margin-bottom: 4px;
}
.none-msg{
  width: 100%;
  text-align: center;
  padding-top: 80px;
  position: absolute;
  top: 400px;
  .p{
    font-family: serif;
    font-weight: 700;
    font-size: 24px;
    color: #949494;
  }
}

.bottom-tip{
  text-align: center;
  color: #949494;
  padding: 20px;
}
</style>