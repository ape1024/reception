<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">
      列车详情
    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">车型:</li>
      <li class="detailsTrains-subject-li">是否重连:</li>
      <li class="detailsTrains-subject-li">编组方向:</li>
      <li class="detailsTrains-subject-li">编组数:</li>
      <li class="detailsTrains-subject-li">立折车次:</li>
      <li class="detailsTrains-subject-li">接续车次:</li>
    </ul>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'detailsTrains',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .detailsTrains
    position absolute
    top 50%
    left 50%
    margin -200px 0 0 -270px
    background #fff
    width 500px
    padding 20px
    .detailsTrains-title
      unitTitle()
    .detailsTrains-subject
      position relative
      font-size 16px
      overflow hidden
      .detailsTrains-subject-li
        padding 20px 0
        overflow hidden
  .close
    position absolute
    top 20px
    right 20px
    height 30px
    width 30px
</style>
