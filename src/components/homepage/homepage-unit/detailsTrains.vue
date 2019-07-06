<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">
      {{detailsTrainsTitle}}
    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">{{vehicle}}</li>
      <li class="detailsTrains-subject-li">{{reconnect}}</li>
      <li class="detailsTrains-subject-li">{{marshalling}}</li>
      <li class="detailsTrains-subject-li">{{groupings}}</li>
      <li class="detailsTrains-subject-li">{{folding}}</li>
      <li class="detailsTrains-subject-li"></li>
    </ul>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'detailsTrains',
  data () {
    return {
      detailsTrainsTitle: '',
      vehicle: '',
      reconnect: '',
      marshalling: '',
      groupings: '',
      folding: '',
      continuous: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    this.detailsTrainsTitle = '列车详情'
    this.vehicle = '车型: '
    this.reconnect = '是否重连: '
    this.marshalling = '编组方向: '
    this.groupings = '编组数: '
    this.folding = '立折车次: '
    this.continuous = '接续车次: '
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
