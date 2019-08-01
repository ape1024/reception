<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">
      {{detailsTrainsTitle}}
    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{conductor}}</p>
        <p class="detailsTrains-subject-li-right">{{conductorData}}人</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{information}}</p>
        <p class="detailsTrains-subject-li-right">{{informationData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{segment}}</p>
        <p class="detailsTrains-subject-li-right">{{segmentData}}</p>
      </li>
    </ul>
    <div class="detailsTrainsDiv">
      <el-button size="small" @click="close">关闭</el-button>
      <el-button type="primary" size="small" @click="examine">查看</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newPassengers',
  props: ['newPassengersData'],
  data () {
    return {
      detailsTrainsTitle: '',
      conductor: '',
      information: '',
      assume: '',
      segment: '',
      asFleet: '',
      asTeam: '',
      conductorData: '',
      informationData: '',
      assumeData: '',
      segmentData: '',
      asFleetData: '',
      asTeamData: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    examine () {
      this.$emit('examine', this.newPassengersData)
    }
  },
  created () {
    let trainType = this.newPassengersData.trainType
    this.detailsTrainsTitle = this.newPassengersData.cheCi
    this.conductor = '重点旅客: '
    this.information = trainType === 1 ? '图定发车时间: ' : '图定到达时间: '
    this.informationData = `${this.newPassengersData.regulationsData}  ${this.newPassengersData.difference}`
    this.segment = trainType === 1 ? '实际发车时间: ' : '实际到达时间: '
    this.segmentData = this.newPassengersData.actualData
    this.conductorData = this.newPassengersData.zdlkNum
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .detailsTrains
    z-index 11111
    position absolute
    top 50%
    left 50%
    margin -180px 0 0 -250px
    background #071321
    color #fff
    width 500px
    border-radius 6px
    overflow hidden
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
  .detailsTrainsDiv
    margin 20px 0
    text-align center
    position relative
    overflow hidden
</style>
