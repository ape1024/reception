<template>
  <div class="behindSchedule">
    <h4 class="behindSchedule-title">
      {{rowCheCi}}{{channelTitle}}
    </h4>
    <div class="behindSchedule-subject">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="stationName"
          label="车站">
        </el-table-column>
        <el-table-column
          prop="arrivalTimeNum"
          label="到点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="departureTimeNum"
          label="开点"
          width="100">
        </el-table-column>
      </el-table>
    </div>
    <img @click="close" class="close" src="../../../common/img/close.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'channel',
  props: ['rowCheCi', 'channelData'],
  data () {
    return {
      tableData: [],
      channelTitle: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    this.tableData = this.channelData
    this.channelTitle = '途径车站'
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
