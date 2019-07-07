<template>
  <div class="behindSchedule" @click.stop>
    <h4 class="behindSchedule-title">
      {{rowCheCi}}{{behindScheduleTitle}}
    </h4>
    <div class="behindSchedule-subject">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="operateTime"
          label="时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="站台"
          width="150">
        </el-table-column>
      </el-table>
    </div>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'platformChange',
  props: ['platformData', 'rowCheCi'],
  data () {
    return {
      behindScheduleTitle: '',
      tableData: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    fmtDate (timestamp, Identification) {
      if (timestamp) {
        let time = new Date(timestamp)
        // let y = time.getFullYear()
        let M = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : `0${(time.getMonth() + 1)}`
        let d = (time.getDate()) >= 10 ? (time.getDate()) : `0${(time.getDate())}`
        let h = (time.getHours()) >= 10 ? time.getHours() : `0${time.getHours()}`
        let m = (time.getMinutes()) >= 10 ? time.getMinutes() : `0${time.getMinutes()}`
        // let s = time.getSeconds()
        if (Identification === 1) {
          return `${M} - ${d}`
        } else if (Identification === 2) {
          return h + ':' + m
        } else {
          return `${M}月 ${d}日`
        }
      }
    }
  },
  created () {
    this.behindScheduleTitle = '站台变更'
    this.platformData.forEach((val) => {
      let obj = {
        areaName: val.areaName,
        operateTime: this.fmtDate(val.operateTime, 2)
      }
      this.tableData.push(obj)
    })
    console.log(this.tableData)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .behindSchedule
    position absolute
    top 50%
    left 50%
    margin -300px 0 0 -170px
    overflow hidden
    border-radius 6px
    background #4e5870
    width 300px
    .behindSchedule-title
      unitTitle()
    .behindSchedule-subject
      overflow hidden
  .close
    close()
</style>
