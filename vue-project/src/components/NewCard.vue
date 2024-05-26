<template>
  <div class="new-card">
    <div class="colors" v-show="id == 0">
      <p class="color-li" v-for="(e, index) in cardColor1" :key="index" :style="{background:e}"
         :class="{colorsSelected:index === selected}" @click="changeColor(index)"></p>
    </div>
<!--    照片-->
    <div class="add-photo" v-if="id == 1">
      <input type="file" name="file" id="file" multiple="multiple" @change="handleFileUpload">
      <div class="add-bt" v-if="url == ''">
        <el-icon size="64px"><CirclePlus /></el-icon>
      </div>
      <div class="change-bt" v-if="url != ''">
        <el-icon size="32px" color="#fff"><EditPen /></el-icon>
      </div>
      <div class="photo-div"><img :src="url" /></div>
    </div>
<!--    卡片-->
    <div class="card-main" :style="{background: cardColor[selected]}">
      <textarea placeholder="留言..." class="message" maxlength="96" v-model="message"></textarea><br>
      <input type="text" placeholder="签名" class="name" v-model="name"/>
    </div>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p v-for="(e, index) in label[id]" :key="index" class="label-li"
           :class="{ labelselected:index === labelSelected }" @click="changeLabel(index)">{{ e }}</p>
      </div>
    </div>
    <div>
      <p class="title">免责声明</p>
      <p class="mzsm">
        YIPINGC留言墙是本人独自开发，为便于与用户的交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br>
        1、反对宪法所确定的基本原则的；<br>
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br>
        3、损害国家荣誉和利益的；<br>
        4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br>
        6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br>
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
        8、侮辱或者诽谤他人，侵害他人合法权益的；<br>
        9、含有法律、行政法规禁止的其他内容的信息。
      </p>
    </div>
    <div class="footBt">
      <el-button type="info" round size="large" class="submit1" @click="closeModel(0)">丢弃</el-button>
      <el-button type="success" round size="large" class="submit" @click="submit">确定</el-button>
    </div>
  </div>
</template>


<script>
import {cardColor, cardColor1, label} from '../utils/data'
import {ref} from 'vue'
import {CirclePlus, EditPen} from "@element-plus/icons-vue";
import {insertWallApi, profileApi} from "../api/index.js";

export default {
  components: {EditPen, CirclePlus},
  data(){
    return{
      cardColor,
      cardColor1,
      input1: ref(''),
      selected: 0, //当前选择颜色
      label,
      labelSelected: 0, //当前选择标签
      message: '', //留言信息
      name: '', //签名
      user: this.$store.state.user,
      url: '',
    }
  },
  props: {
    labels: {
      default: [],
    },
    id: {
      default: 0,
    }
  },
  methods:{
    handleFileUpload(event){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) =>{
        this.url = reader.result
      }
    },
    changeColor(e){
      this.selected = e
    },
    changeLabel(e){
      this.labelSelected = e
    },
    //关闭窗口
    closeModel(data){
      this.$emit('addClose', data);
    },

    //提交新建wall
    submit(){
      let name = '匿名'
      if(this.name){
        name = this.name
      }
      let data = {
        type: this.id,
        message: this.message,
        name: name,
        userId: name,
        moment: new Date(),
        label: this.labelSelected,
        color: 5,
        imgurl: '',
      }
      if(this.message && this.id == 0){
        insertWallApi(data).then((res) => {
          let cardData = {
            type: this.id,
            message: this.message,
            name: name,
            userId: name,
            moment: new Date(),
            label: this.labelSelected,
            color: this.selected,
            imgurl: '',
            id: res.message.insertId,
            islike: [{count: 0}],
            like: [{count: 0}],
            comment: [{count: 0}],
            report: [{count: 0}],
            revoke: [{count: 0}],
          }
          this.message = ''
          this.$emit("clickbt", cardData)
          this.$message({type: "success", message: "感谢您的记录！"})
        })
      }else if(this.id == 1 && this.url){
        this.updatePhoto(data)
      }
    },
    //图片显示
    showPhoto(){
      this.url = getObjectURL(document.getElementById('file').files[0])
    },
    //图片提交
    updatePhoto(data){
      let file = document.getElementById('file')
      if(file.files.length){
        let formData = new FormData()
        formData.append('file', file.files[0])
        //提交后端
        profileApi(formData).then((res) => {
          // console.log(res)
          data.imgurl = res
          // 数据存数据库
          insertWallApi(data).then((result) => {
            let cardData = {
              type: this.id,
              message: this.message,
              name: data.name,
              userId: data.name,
              moment: new Date(),
              label: this.labelSelected,
              color: 5,
              imgurl: res,
              id: result.message.insertId,
              islike: [{count: 0}],
              like: [{count: 0}],
              comment: [{count: 0}],
              report: [{count: 0}],
              revoke: [{count: 0}],
            }
            this.message = ''
            this.$emit("clickbt", cardData)
            this.$message({type: "success", message: "感谢您的记录！"})
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.new-card{
  padding: 0 32px 120px;
  position: relative;
  .colors{
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    .color-li{
      width: 30px;
      height: 30px;
      margin-right: 14px;
      cursor: pointer;
    }
    .colorsSelected{
      border: 1px solid #1E85E2;
    }
  }
  .card-main{
    height: 360px;
    width: 100%;
    background: rgba(252, 175, 162, 1);
    padding: 12px;
    box-sizing: border-box;
    transition: all 0.3s;

    .message{
      background: none;
      border: none;
      resize: none;
      height: 280px;
      outline: none;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      font-size: 16px;
    }
    .name{
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      background: none;
      outline: none;
      border: #fff 1px solid;
      line-height: 24px;
      border-radius: 10px;
    }
  }
  .title{
    color: #202020;
    font-weight: 600;
    padding-top: 30px;
  }
  .label{
    display: flex;
    flex-wrap: wrap;
    width: 450px;
    .label-li{
      padding: 2px 17px;
      border-radius: 20px;
      margin: 20px 4px 20px 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .labelselected{
      background: #a6a9ad;
      font-weight: 600;
    }
  }
  .mzsm{
    padding-top: 10px;
    font-size: 14px;
    color: #949494;
  }

  .add-photo{
    padding-bottom: 20px;
    position: relative;
    #file {
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }
    .add-bt{
      width: 64px;
      height: 64px;
      border: 1px solid #949494;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .photo-div{
      max-height: 200px;
      width: 100%;
      background: #333;
      overflow: hidden;
      display: flex;
      align-items: center;
      img{
        width: 100%;
      }
    }
    .change-bt{
      position: absolute;
      top: 12px;
      left: 12px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .footBt{
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 72px;
    left: 0;
    width: 100%;
    .submit1{
      margin-left: 320px;
    }
    .submit{
      margin-left: 20px;
    }
  }
}
</style>