<template>
  <div class="top-bar">
    <div class="logo">
      <img src="../../天气云.png" class="logo-img"/>
      <p class="logo-name"></p>
    </div>
    <div class="menu">
      <div v-show="id==1">
        <YPCButton @click="changeWall(0)">留言墙</YPCButton>
      </div>
      <div v-show="id==0" >
        <YPCButton @click="changeWall(1)">照片墙</YPCButton>
      </div>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script>
import YPCButton from "./YPCButton.vue";
export default {
  data(){
    return{
      show: 0,
    }
  },
  components: {
    YPCButton
  },
  computed: {
    id(){
      return this.$route.query.id;
    }
  },
  methods: {
    //切换
    changeWall(e){
      this.show ^= 1;
      this.$router.push({
        query:{
          id: e,
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
html,body{
  margin: 0;
  padding: 0;
}
.top-bar{
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
}
.logo-img{
  width: 40px;
  height: 40px;
}
.logo{
  width: 300px;
  display: flex;
  align-items: center;
  //.logo-name{
  //  padding: 10px;
  //  font-size: 20px;
  //  color: #202020;
  //  letter-spacing: 0;
  //  text-align: justify;
  //  font-weight: 600;
  //}
  /* HTML: <div class="loader"></div> */
  .logo-name {
    padding: 10px;
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    line-height: 1.2em;
    display: inline-grid;
  }
  .logo-name:before,
  .logo-name:after {
    content:"YIPINGC";
    grid-area: 1/1;
    -webkit-mask: linear-gradient(90deg,#000 50%,#0000 0) 0 50%/2ch 100%;
    color: #0000;
    text-shadow: 0 0 0 #000,0 calc(var(--s,1)*1.2em) 0 #000;
    animation: l15 1s infinite;
  }
  .logo-name:after {
    -webkit-mask-position: 1ch 50%;
    --s:-1;
  }
  @keyframes l15 {80%,100%{text-shadow:0 calc(var(--s,1)*-1.2em)  0 #000,0 0 0 #000}}
}
.user{
  width: 300px;
  .user-head{
    float: right;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    background-image: linear-gradient(180deg, #7BE7FF 2%, #1E85E2 100%);
  }
}
</style>