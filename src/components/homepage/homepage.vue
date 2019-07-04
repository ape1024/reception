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
                <img class="homepage-condition-state-img" src="../../common/img/keynote.png" alt="">
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
                    <span @click="spanFn" :class="cheCimodule(scope.row.trainType)">{{scope.row.cheCi}}</span>
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
                    <div v-if="scope.row.difference" @click="differenceFn">
                      <span class="differenceColor">{{scope.row.regulationsData}}</span><span class="red">{{scope.row.difference}}</span>
                    </div>
                    <div v-if="!scope.row.difference">
                      <span>{{scope.row.regulationsData}}</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="实际到发">
                  <template slot-scope="scope">
                    <div>
                      <span>{{scope.row.actualData}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="列车详情">
                  <template slot-scope="scope">
                    <div class="blue" @click="trainDetailsFn">
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
                    <div class="blue" @click="trainMasterFn">
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
                  prop="transformNum"
                  label="中转人数">
                </el-table-column>
                <el-table-column
                  label="重点旅客总数">
                  <template slot-scope="scope">
                    <span @click="keyCustomerAccountFn" class="blue">{{scope.row.keyCustomerAccount}}</span>
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
  //  变更站台,后台说没有记录,,,
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
      rollingIndex: '',
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
    cheCimodule (trainType) {
      if (trainType === 1) {
        return `green`
      } else if (trainType === 2) {
        return `bluColor`
      } else {
        return `violet`
      }
    },
    //  获取数据
    getData () {
      this.axios.post(`http://172.16.6.38:8090/run/waitingRooms`).then((response) => {
        console.log(response.data.data)
        let switchBoer = false
        response.data.data.forEach((val, index) => {
          val.dateData = this.fmtDate(val.date, 1)
          //  sendTrain 为true 发车车次   false 到达车次
          if (val.sendTrain === 1 || val.sendTrain === 3) {
            //  regulationsData
            val.regulationsData = this.fmtDate(val.planFaCheTime, 2)
            //  actualData
            val.actualData = this.fmtDate(val.realFaCheTime, 2)
            val.difference = this.difference(val.planFaCheTime, val.realFaCheTime)
          } else {
            val.regulationsData = this.fmtDate(val.planDaoDaTime, 2)
            val.actualData = this.fmtDate(val.realDaoDaTime, 2)
            val.difference = this.difference(val.planDaoDaTime, val.realDaoDaTime)
          }
          //  判断当前时间戳是否为今日
          if (this.isToday(val.date)) {
            // console.log(index)
            let keynoteNumder = val.keyCustomers ? parseInt(val.keyCustomers) : 0
            let wheelchairNumder = val.wheelchair ? parseInt(val.wheelchair) : 0
            let stretcherNumder = val.stretcher ? parseInt(val.stretcher) : 0
            this.keynote += keynoteNumder
            this.wheelchair += wheelchairNumder
            this.stretcher += stretcherNumder
            //  拿到今日 第一个值 将滚动条 滚到其对应索引位置
            if (!switchBoer) {
              this.rollingIndex = index
              switchBoer = true
            }
          }
        })
        this.tableData = response.data.data
      })
    },
    //  判断时间戳是否为今日
    isToday (str) {
      let timestamp = this.fmtDate((new Date()).getTime(), 1)
      let strData = this.fmtDate(str, 1)
      if (timestamp === strData) {
        return true
      } else {
        return false
      }
    },
    fmtDate (timestamp, Identification) {
      if (timestamp) {
        let time = new Date(timestamp)
        // let y = time.getFullYear()
        let M = (time.getMonth() + 1) > 10 ? (time.getMonth() + 1) : `0${(time.getMonth() + 1)}`
        let d = (time.getDate()) > 10 ? (time.getDate()) : `0${(time.getDate())}`
        let h = (time.getHours()) > 10 ? time.getHours() : `0${time.getHours()}`
        let m = (time.getMinutes()) > 10 ? time.getMinutes() : `0${time.getMinutes()}`
        // let s = time.getSeconds()
        if (Identification === 1) {
          return `${M} - ${d}`
        } else if (Identification === 2) {
          return h + ':' + m
        } else {
          return `${M}月 ${d}日`
        }
      }
    },
    difference (a, b) {
      let c = ''
      if (a !== b) {
        c = parseInt((b - a) / 1000 / 60)
        c = c > 0 ? `+${c}` : c
        return c
      } else {
        return ''
      }
    },
    //  滚动位置
    rolling (index) {
      this.$refs.table.bodyWrapper.scrollTop = (this.$refs.table.bodyWrapper.firstChild.clientHeight / this.tableData.length) * (index)
    },
    trainDetailsFn () {
      this.popupSwitch = true
      this.detailsSwitch = true
    },
    trainMasterFn () {
      this.popupSwitch = true
      this.trainSwitch = true
    },
    keyCustomerAccountFn () {
      this.popupSwitch = true
      this.passengersSwitch = true
    },
    differenceFn () {
      this.popupSwitch = true
      this.behindSwitch = true
    }
  },
  watch: {
    rollingIndex (data) {
      this.rolling(data)
    }
  },
  updated () {
    this.rolling(this.rollingIndex)
  },
  created () {
    //  本地校验token
    this.checktoKen()
    this.getData()
    //  获取今日事件
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
  .blue
    cursor pointer
    text-decoration underline
    color $color-blue
  .red
    color $color-red
    cursor pointer
    text-decoration underline
  .green
    color $color-green
  .violet
    color $color-Violet
  .bluColor
    color $color-blue
  .differenceColor
    cursor pointer
    text-decoration underline
</style>
