<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">
      {{rowCheCi}}{{detailsTrainsTitle}}
    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{vehicle}}</p>
        <p class="detailsTrains-subject-li-right">{{vehicleData}}</p>
        </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{reconnect}}</p>
        <p class="detailsTrains-subject-li-right">{{reconnectData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{marshalling}}</p>
        <p class="detailsTrains-subject-li-right">{{marshallingData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{groupings}}</p>
        <p class="detailsTrains-subject-li-right">{{groupingsData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{folding}}</p>
        <p class="detailsTrains-subject-li-right">{{foldingData}}</p>
      </li>
    </ul>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'detailsTrains',
  props: ['trainDetailsData', 'rowCheCi'],
  data () {
    return {
      detailsTrainsTitle: '',
      vehicle: '',
      reconnect: '',
      marshalling: '',
      groupings: '',
      folding: '',
      continuous: '',
      vehicleData: '',
      reconnectData: '',
      marshallingData: '',
      groupingsData: '',
      foldingData: ''
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
    if (this.trainDetailsData) {
      this.vehicleData = this.trainDetailsData.carType
      this.reconnectData = this.trainDetailsData.chongLian
      this.marshallingData = this.trainDetailsData.cheXu
      this.groupingsData = this.trainDetailsData.cheXiang
      this.foldingData = this.trainDetailsData.trainMatch
    } else {
      this.vehicleData = '暂无'
      this.reconnectData = '暂无'
      this.marshallingData = '暂无'
      this.groupingsData = '暂无'
      this.foldingData = '暂无'
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
    margin -180px 0 0 -250px
    background #071321
    color #fff
    width 500px
    border-radius 8px
    .detailsTrains-title
      unitTitle()
    .detailsTrains-subject
      margin 0 20px
      position relative
      font-size 16px
      overflow hidden
      .detailsTrains-subject-li
        padding 20px 0
        font-size 18px
        overflow hidden
  .close
    close()
  .detailsTrains-subject-li-left
    float left
  .detailsTrains-subject-li-right
    float right
</style>
