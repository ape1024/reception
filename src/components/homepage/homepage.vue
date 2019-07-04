<template>
  <div class="homepage" @click="homepageClick">
    <div class="homepage-div">
      <h4 class="homepage-title">
        北京西站12306服务台
      </h4>
      <div class="homepage-subject">
        <div class="homepage-condition">
          <div class="homepage-condition-left">
           <div class="homepage-input">
             <el-input clearable size="mini" v-model="search" placeholder="请输入内容"></el-input>
           </div>
            <div class="homepage-search">
              <el-button size="mini" type="primary">搜索</el-button>
            </div>
          </div>
          <div class="homepage-condition-right">
            <!--日期-->
            <p class="homepage-condition-month">{{month}}</p>
            <ul class="homepage-condition-state">
              <li class="homepage-condition-state-li">
                <!--重点-->
                <img @click="imgFn" class="homepage-condition-state-img" src="../../common/img/keynote.png" alt="">
                <div class="homepage-condition-state-input">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="keynote"
                    :disabled="true">
                  </el-input>
                </div>
              </li>
              <li class="homepage-condition-state-li">
                <!--轮椅-->
                <img class="homepage-condition-state-img" src="../../common/img/wheelchair.png" alt="">
                <div class="homepage-condition-state-input">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="wheelchair"
                    :disabled="true">
                  </el-input>
                </div>
              </li>
              <li class="homepage-condition-state-li">
                <!--担架-->
                <img class="homepage-condition-state-img" src="../../common/img/stretcher.png" alt="">
                <div class="homepage-condition-state-input">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="stretcher"
                    :disabled="true">
                  </el-input>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="homepage-content">
          <div class="homepage-table">
            <div class="homepage-table-body">
              <el-table
                ref='table'
                :data="tableData"
                height="500"
                row-class-name="tableRow"
                border
                style="width: 100%">
                <el-table-column
                  prop="dateData"
                  label="日期">
                </el-table-column>
                <el-table-column
                  prop="cheCi"
                  label="车次">
                  <template slot-scope="scope">
                    <span @click="spanFn" class="span">{{scope.row.cheCi}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="waitingRoom"
                  label="候车室">
                </el-table-column>
                <el-table-column
                  label="站台">
                  <template slot-scope="scope">
                    <div :class="{noData: !scope.row.platform}">
                      {{scope.row.platform}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="图定到发">
                  <template slot-scope="scope">
                    <div v-if="scope.row.sendTrain">
                      <span>{{scope.row.planFaCheTimeData}}</span>
                    </div>
                    <div v-if="!scope.row.sendTrain">
                      <span>{{scope.row.planDaoDaTimeData}}</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="实际到发">
                  <template slot-scope="scope">
                    <div v-if="scope.row.sendTrain">
                      <span>{{scope.row.realFaCheTimeData}}</span>
                    </div>
                    <div v-if="!scope.row.sendTrain">
                      <span>{{scope.row.realDaoDaTimeData}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="列车详情">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.trainDetails}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="重点车">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.keyTrain}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trainMaster"
                  label="列车长">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.trainMaster}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="on"
                  label="上车人数">
                </el-table-column>
                <el-table-column
                  prop="off"
                  label="下车人数">
                </el-table-column>
                <el-table-column
                  prop="transferNum"
                  label="中转人数">
                </el-table-column>
                <el-table-column
                  prop="zdlkzs"
                  label="重点旅客总数">
                  <template slot-scope="scope">
                    <span @click="spanFn" class="span">{{scope.row.keyCustomerAccount}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <div v-if="popupSwitch" class="popupWindow" @click="popupWindowClose">
      <!--晚点历史数据-->
      <behindSchedule v-if="behindSwitch" @close="closeFn"></behindSchedule>
      <!--站台变更-->
      <platformChange v-if="platformSwitch" @close="closeFn"></platformChange>
      <!--列车详情-->
      <detailsTrains v-if="detailsSwitch" @close="closeFn"></detailsTrains>
      <!--列车长-->
      <trainConductor v-if="trainSwitch" @close="closeFn"></trainConductor>
      <!--重点旅客-->
      <keyPassengers v-if="passengersSwitch" @close="closeFn"></keyPassengers>
    </div>
  </div>
</template>

<script>
import behindSchedule from './homepage-unit/behindSchedule'
import platformChange from './homepage-unit/platformChange'
import detailsTrains from './homepage-unit/detailsTrains'
import trainConductor from './homepage-unit/trainConductor'
import keyPassengers from './homepage-unit/keyPassengers'
import { projectMixin } from '../../common/js/mixin'
export default {
  name: 'homepage',
  mixins: [projectMixin],
  data () {
    return {
      search: '',
      month: '6月19日',
      keynote: 0,
      wheelchair: 0,
      stretcher: 0,
      tableData: [],
      popupSwitch: false,
      behindSwitch: false,
      platformSwitch: false,
      detailsSwitch: false,
      trainSwitch: false,
      passengersSwitch: false
    }
  },
  components: {
    behindSchedule,
    platformChange,
    detailsTrains,
    trainConductor,
    keyPassengers
  },
  methods: {
    imgFn () {
      console.log(this.tableData)
      console.log(this.tableData.length)
      console.log(this.$refs.table.bodyWrapper.firstChild.clientHeight)
      this.$refs.table.bodyWrapper.scrollTop = (this.$refs.table.bodyWrapper.firstChild.clientHeight / this.tableData.length) * (10 - 1)
    },
    spanFn () {
    },
    homepageClick () {
    },
    checktoKen () {
      if (!this.token) {
        console.log(this.token)
        this.$message.error('请您先登录')
        this.$router.replace('/')
      }
    },
    popupWindowClose () {
      this.closeAll()
    },
    closeFn () {
      this.closeAll()
    },
    //  全部弹窗关闭
    closeAll () {
      this.popupSwitch = false
      this.behindSwitch = false
      this.platformSwitch = false
      this.detailsSwitch = false
      this.trainSwitch = false
      this.passengersSwitch = false
    },
    //  获取数据
    getData () {
      this.axios.post(`http://172.16.6.38:8090/run/waitingRooms`).then((response) => {
        console.log(response.data.data)
        response.data.data.forEach((val) => {
          val.dateData = this.fmtDate(val.date)
          val.planDaoDaTimeData = this.fmtDate(val.planDaoDaTime)
          val.planFaCheTimeData = this.fmtDate(val.planFaCheTime)
          val.realDaoDaTimeData = this.fmtDate(val.realDaoDaTime)
          val.realFaCheTimeData = this.fmtDate(val.realFaCheTime)
          let keynoteNumder = val.keyCustomers ? parseInt(val.keyCustomers) : 0
          let wheelchairNumder = val.wheelchair ? parseInt(val.wheelchair) : 0
          let stretcherNumder = val.stretcher ? parseInt(val.stretcher) : 0
          this.keynote += keynoteNumder
          this.wheelchair += wheelchairNumder
          this.stretcher += stretcherNumder
        })
        this.tableData = response.data.data
      })
    },
    fmtDate (obj) {
      let date = new Date(obj)
      // let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
  },
  created () {
    //  本地校验token
    this.checktoKen()
    this.getData()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .homepage
    height 100%
    width 100%
    position relative
    overflow hidden
    .homepage-div
      overflow hidden
      margin 100px 0
      width 100%
      .homepage-title
        font-weight bold
        text-align center
        font-size 36px
      .homepage-subject
        overflow hidden
        position relative
        margin 40px 50px
      .homepage-condition
        position relative
        display flex
        line-height 56px
        margin-bottom 30px
        overflow hidden
        .homepage-condition-left
          overflow hidden
          position relative
          width 40%
          min-width 300px
          margin-right 100px
          .homepage-input
            float left
            height 28px
            box-sizing border-box
            width 50%
          .homepage-search
            float right
            text-align center
            box-sizing border-box
            width 50%
        .homepage-condition-right
          overflow hidden
          display flex
          min-width 600px
          width 100%
          .homepage-condition-month
            margin-right 20px
            width 100px
            font-weight bold
          .homepage-condition-state
            width 100%
            position relative
            overflow hidden
          .homepage-condition-state-li
            float left
            overflow hidden
            width 33%
            .homepage-condition-state-img
              display inline-block
              margin-right 20px
              vertical-align middle
              height 48px
              width 48px
            .homepage-condition-state-input
              display inline-block
              width 100px
      .homepage-content
        overflow hidden
        font-size 16px
        position relative
        width 100%
        .homepage-table-header
          overflow hidden
          text-align center
          width 100%
          .homepage-table-header-ul
            width 100%
            min-width 1100px
            box-sizing border-box
            overflow hidden
            border 1px solid $border-color
          .homepage-table-header-ul li:last-child
             border-right none
        .homepage-table-body
           position relative
           overflow hidden
           .homepage-table-body-ul
             overflow hidden
             max-height 300px
             overflow-y auto
             box-sizing border-box
             position relative
             border 1px solid $border-color
             border-top none
             width 100%
             .homepage-table-body-li
               overflow hidden
               height 35px
               box-sizing border-box
               border-bottom 1px solid $border-color
               width 100%
            .homepage-table-body-ul .homepage-table-body-li:last-child
                border-bottom none
              .homepage-table-body-li-ul
                position relative
                font-size 12px
                height 35px
                overflow hidden
              .homepage-table-body-li-ul li
                text-align center
                border-right 1px solid $border-color
               .homepage-table-body-li-ul li:last-child
                 border none
  .homepage-table-liOne
    height 36px
    line-height 36px
    box-sizing border-box
    float left
    border-right 1px solid $border-color
    width 7%
  .homepage-table-liTwo
    height 35px
    line-height 35px
    box-sizing border-box
    float left
    border-right 1px solid $border-color
    width 10%
  .homepage-table-body-ul::-webkit-scrollbar
    display none
  .popupWindow
    position fixed
    top 0
    left 0
    overflow hidden
    background rgba(000,000,000,.2)
    height 100%
    width 100%
    z-index 111
  .span
    color red
  .tableRow
    height 50px
  .noData
    background #ccc!important
</style>
