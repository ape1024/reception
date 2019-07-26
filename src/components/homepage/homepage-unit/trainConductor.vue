<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">
      {{rowCheCi}}{{detailsTrainsTitle}}
    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{conductor}}</p>
        <p class="detailsTrains-subject-li-right">{{conductorData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{information}}</p>
        <p class="detailsTrains-subject-li-right">{{informationData}}</p>
        </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{assume}}</p>
        <p class="detailsTrains-subject-li-right">{{assumeData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{segment}}</p>
        <p class="detailsTrains-subject-li-right">{{segmentData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{asFleet}}</p>
        <p class="detailsTrains-subject-li-right">{{asFleetData}}</p>
      </li>
      <li class="detailsTrains-subject-li">
        <p class="detailsTrains-subject-li-left">{{asTeam}}</p>
        <p class="detailsTrains-subject-li-right">{{asTeamData}}</p>
      </li>
    </ul>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'trainConductor',
  props: ['trainMasterData', 'rowCheCi'],
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
    }
  },
  created () {
    this.detailsTrainsTitle = '列车长详情'
    this.conductor = '列车长: '
    this.information = '联系方式: '
    this.assume = '担当局: '
    this.segment = '担当组: '
    this.asFleet = '担当车队: '
    this.asTeam = '担当班组: '
    if (this.trainMasterData) {
      this.conductorData = this.trainMasterData.conductor1
      this.informationData = this.trainMasterData.ePNumber1
      this.assumeData = this.trainMasterData.bureauName
      this.segmentData = this.trainMasterData.groupName
      this.asFleetData = this.trainMasterData.teamName
      this.asTeamData = this.trainMasterData.groupName
    } else {
      this.conductorData = '暂无'
      this.informationData = '暂无'
      this.assumeData = '暂无'
      this.segmentData = '暂无'
      this.asFleetData = '暂无'
      this.asTeamData = '暂无'
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
</style>
