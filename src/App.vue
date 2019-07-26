<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index"
  @font-face
    font-family myFont
    src url("common/font/Alibaba-PuHuiTi-Bold.ttf")
  html,body
    width 100%
    height 100%
    overflow hidden
    font-family myFont!important
    position relative
    #app
      height 100%
      position relative
      overflow hidden
      width 100%

</style>
