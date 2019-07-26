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
          prop="realArriveTimeData"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lateTimeArrive"
          label="到晚点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="realDepartureTimeData"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="lateTime"
          label="发晚点"
          width="100">
        </el-table-column>
      </el-table>
    </div>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'behindSchedule',
  props: ['rowCheCi', 'behindScheduleData'],
  data () {
    return {
      behindScheduleTitle: '',
      tableData: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    this.tableData = this.behindScheduleData
    this.behindScheduleTitle = '晚点历史数据'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .behindSchedule
    position absolute
    top 50%
    left 50%
    margin -300px 0 0 -200px
    background #071321
    overflow hidden
    width 400px
    .behindSchedule-title
      unitTitle()
    .behindSchedule-subject
      overflow hidden
      width 100%
  .close
    close()
</style>
