<template>
  <div class="behindSchedule" @click.stop>
    <h4 class="behindSchedule-title">
      晚点历史数据
    </h4>
    <div class="behindSchedule-subject">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="到晚点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
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
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .behindSchedule
    position absolute
    top 50%
    left 50%
    margin -300px 0 0 -220px
    height 560px
    background #fff
    width 400px
    padding 20px
    .behindSchedule-title
      unitTitle()
    .behindSchedule-subject
      overflow hidden
      width 100%
  .close
    position absolute
    top 20px
    right 20px
    height 30px
    width 30px
</style>
