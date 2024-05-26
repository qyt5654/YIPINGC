<template>
  <el-button size="large" type="primary" round><slot /></el-button>
</template>

<script>
export default {
  props:{
    size: {
      default: 'base',
    },
    nom: {
      default: 'primary',
    }
  }
}
</script>

<style lang="less" scoped>

</style>