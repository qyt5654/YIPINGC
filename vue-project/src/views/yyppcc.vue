<template>
  <div>
    <top-bar />
    <router-view />
<!--    <div style="height: 500px"></div>-->
    <foot-bar-vue />
  </div>
</template>

<script>
import topBar from '../components/TopBar.vue'
import FootBarVue from '../components/FootBar.vue'
import { signIpApi } from "../api/index.js";

export default {
  data(){
    return{
      aaa: ''
    }
  },
  components: {
    //组件
    topBar,
    FootBarVue
  },
  computed: {

  },
  created() {

  },
  methods: {
    getUser(){
      signIpApi().then((res) => {
        let user = {
          id: res.ip
        }
        this.$store.commit('getUser', user)
      })
    }
  }
}
</script>

<style lang="less" scoped>
foot-bar-vue{
  position: absolute;
  top: 3200px;
}
</style>