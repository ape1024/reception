<template>
  <div class="detailsTrains" @click.stop>
    <h4 class="detailsTrains-title">

    </h4>
    <ul class="detailsTrains-subject">
      <li class="detailsTrains-subject-li">{{conductor}}</li>
      <li class="detailsTrains-subject-li">{{information}}</li>
      <li class="detailsTrains-subject-li">{{assume}}</li>
      <li class="detailsTrains-subject-li">{{segment}}</li>
      <li class="detailsTrains-subject-li">{{asFleet}}</li>
      <li class="detailsTrains-subject-li">{{asTeam}}</li>
    </ul>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'trainConductor',
  data () {
    return {
      detailsTrainsTitle: '',
      conductor: '',
      information: '',
      assume: '',
      segment: '',
      asFleet: '',
      asTeam: ''
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
