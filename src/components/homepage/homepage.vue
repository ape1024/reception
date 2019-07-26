<template>
  <div class="homepage" @click="homepageClick">
    <div class="homepage-div">
      <h4 class="homepage-title">
        {{homepageTitle}}
      </h4>
      <div class="homepage-subject">
        <div class="homepage-condition">
          <div class="homepage-condition-left">
           <div class="homepage-input">
             <el-input clearable size="medium" v-model="search" placeholder="请输入内容"></el-input>
           </div>
            <div class="homepage-search">
              <el-button @click="searchFn" size="medium" type="primary">{{searchText}}</el-button>
              <el-button @click="backtoPast" size="medium" type="success">回到当前时间</el-button>
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
                    size="medium"
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
                    size="medium"
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
                    size="medium"
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
            <div class="homepage-table-body" @mouseleave="changeCellleave" @mouseenter="changeCellenter">
              <el-table
                :header-cell-style="{background:'rgba(41,174,241,.6)!important',color:'#fff'}"
                :row-class-name="tableRowClassName"
                :cell-class-name="changeCellStyle"
                ref='table'
                :data="tableData"
                height="500"
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
                  prop="waiting"
                  label="候车室">
                </el-table-column>
                <el-table-column
                  label="站台">
                  <template slot-scope="scope">
                    <div @click="platformFn(scope.row)" v-if="scope.row.ztHistoryNum > 1" :class="{ noData: scope.row.ztHistoryNum }">
                      {{scope.row.zt}}
                    </div>
                    <div v-if="scope.row.ztHistoryNum <= 1">
                      {{scope.row.zt}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  label="图定到发">
                  <template slot-scope="scope">
                    <div v-if="scope.row.difference" @click="differenceFn(scope.row)">
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
                    <div class="blue" @click="trainDetailsFn(scope.row)">
                      {{scope.row.cheXiang}}{{scope.row.cheXu}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="重点车">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.zhongdian}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trainMaster"
                  label="列车长">
                  <template slot-scope="scope">
                    <div class="blue" >
                      <span class="blueSpan" @click="trainMasterFn(scope.row, item)" :key="index" v-for="(item, index) in scope.row.lczInfoData">{{item}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalDepartNum"
                  label="上车人数">
                </el-table-column>
                <el-table-column
                  prop="totalArriveNum"
                  label="下车人数">
                </el-table-column>
                <el-table-column
                  prop="totalTransferNum"
                  label="中转人数">
                </el-table-column>

                <!--<el-table-column-->
                  <!--prop="zhongdianNum"-->
                  <!--label="重点人员">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="lunyiNum"-->
                  <!--label="轮椅旅客">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="danjiaNum"-->
                  <!--label="担架旅客">-->
                <!--</el-table-column>-->

                <el-table-column
                  label="重点旅客总数">
                  <template slot-scope="scope">
                    <span @click="keyCustomerAccountFn(scope.row)" class="blue">{{scope.row.zdlkNum}}</span>
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
      <behindSchedule :rowCheCi="rowCheCi" :behindScheduleData="behindScheduleData"  v-if="behindSwitch" @close="closeFn"></behindSchedule>
      <!--站台变更-->
      <platformChange :rowCheCi="rowCheCi" :platformData="platformData" v-if="platformSwitch" @close="closeFn"></platformChange>
      <!--列车详情-->
      <detailsTrains :rowCheCi="rowCheCi" :trainDetailsData="trainDetailsData" v-if="detailsSwitch" @close="closeFn"></detailsTrains>
      <!--列车长-->
      <trainConductor :rowCheCi="rowCheCi" :trainMasterData="trainMasterData" v-if="trainSwitch" @close="closeFn"></trainConductor>
      <!--重点旅客-->
      <keyPassengers :passengersrunId="passengersrunId" :passengersData="passengersData" v-if="passengersSwitch" @close="closeFn" @keyupdate="updateFn"></keyPassengers>
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
import { waitingRooms, waitingRoom, findCurrentDayZdlkInfo, findZtHistoryInfo, findzdlkInfo, findHistoryLateTime } from '../../api/url'
export default {
  name: 'homepage',
  mixins: [projectMixin],
  data () {
    return {
      search: '',
      month: this.fmtDate((new Date()).getTime(), 3),
      keynote: 0,
      wheelchair: 0,
      stretcher: 0,
      tableData: [],
      trainDetailsData: [],
      platformData: [],
      passengersData: '',
      rollingIndex: '',
      homepageTitle: '',
      searchText: '',
      updatedSwitch: true,
      popupSwitch: false,
      behindSwitch: false,
      platformSwitch: false,
      detailsSwitch: false,
      trainSwitch: false,
      passengersSwitch: false,
      trainMasterData: '',
      //  打开弹窗 禁止去请求数据
      getDataSwitch: true,
      //  滚动条值 数组
      searchSwitch: true,
      differenceValueArry: {
        value: 0,
        index: 0
      },
      rowCheCi: '',
      moveOut: true,
      passengersrunId: {},
      behindScheduleData: []
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
    backtoPast () {
      this.rolling(this.rollingIndex)
    },
    changeCellStyle (row, column, rowIndex, columnIndex) {
      //  车次
      if (!row.row.cheCi && row.columnIndex === 1) {
        return `warning`
      }
      //  候车室
      if (!row.row.waiting && row.columnIndex === 2) {
        return `warning`
      }
      //  站台
      if (!row.row.zt && row.columnIndex === 3) {
        return `warning`
      }
      //  图定到发
      if (!row.row.regulationsData && row.columnIndex === 4) {
        return `warning`
      }
      //  实际到发
      if (!row.row.actualData && row.columnIndex === 5) {
        return `warning`
      }
      //  列车详情
      if (!row.row.cheXiang && row.columnIndex === 6) {
        return `warning`
      }
      //  重点车
      if (!row.row.zhongdian && row.columnIndex === 7) {
        return `warning`
      }
      //  列车长
      if (!row.row.lczInfoData.length && row.columnIndex === 8) {
        return `warning`
      }
      // //  上车人数
      // if (!row.row.totalArriveNum && row.columnIndex === 9) {
      //   return `warning`
      // }
      // //  下车人数
      // if (!row.row.totalDepartNum && row.columnIndex === 10) {
      //   return `warning`
      // }
      // //  中转人数
      // if (!row.row.totalTransferNum && row.columnIndex === 11) {
      //   return `warning`
      // }
      // //  重点旅客总数
      // if (!row.row.zdlvNum && row.columnIndex === 12) {
      //   return `warning`
      // }
    },
    spanFn () {
    },
    homepageClick () {
    },
    checktoKen () {
      if (!this.token) {
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
    tableRowClassName ({row, rowIndex}) {
      return rowIndex % 2 === 0 ? 'warning-row' : 'success-row'
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
    // 搜索
    searchFn () {
      //  this.searchSwitch
      if (this.search) {
        this.searchSwitch = false
        this.updatedSwitch = false
      } else {
        this.searchSwitch = true
        this.updatedSwitch = true
      }
      this.getData(this.search)
    },
    //  获取数据
    getData (parameter) {
      let parameterData = !parameter ? '' : parameter
      this.axios.post(waitingRooms(parameterData)).then((response) => {
        // let switchBoer = false
        let time = new Date().getTime()
        response.data.data.forEach((val, index) => {
          val.dateData = this.fmtDate(val.date, '')
          //  sendTrain 为true 发车车次   false 到达车次
          if (val.trainType === 1 || val.trainType === 3) {
            //  regulationsData
            val.regulationsData = this.fmtDate(val.planFaCheTime, 2)
            val.regulationsTime = val.planFaCheTime
            //  actualData
            val.actualData = this.fmtDate(val.realFaCheTime, 2)
            val.difference = this.difference(val.planFaCheTime, val.realFaCheTime)
          } else {
            val.regulationsData = this.fmtDate(val.planDaoDaTime, 2)
            val.regulationsTime = val.planDaoDaTime
            val.actualData = this.fmtDate(val.realDaoDaTime, 2)
            val.difference = this.difference(val.planDaoDaTime, val.realDaoDaTime)
          }
          //  列车长姓名
          val.lczInfoData = []
          if (val.lczInfo) {
            if (val.lczInfo.indexOf(',') !== -1) {
              val.lczInfoData = val.lczInfo.split(',')
            } else {
              val.lczInfoData.push(val.lczInfo)
            }
          }
          //  候车室
          val.waiting = this.waitingFn(val.hcs)
          //
          if (this.searchSwitch) {
            let differenceValue = time - val.regulationsTime
            val.differenceValue = differenceValue < 0 ? Math.abs(differenceValue) : differenceValue
            // this.differenceValueArry.push(val.differenceValue)
            if (!this.differenceValueArry.value) {
              this.differenceValueArry.value = val.differenceValue
              this.differenceValueArry.index = index
            } else if (this.differenceValueArry.value > val.differenceValue) {
              this.differenceValueArry.value = val.differenceValue
              this.differenceValueArry.index = index
            }
          }
        })
        // console.log('take time : ' + (new Date().getTime() - time) + 'ms')
        this.tableData = response.data.data
        //  拿到当前时间最近接近的值 将滚动条 滚到其对应索引位置
        if (this.searchSwitch) {
          this.rollingIndex = this.differenceValueArry.index
          // this.rolling(this.rollingIndex)
        }
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
        let M = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : `${(time.getMonth() + 1)}`
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
      //  clearInterval(this.intervalFnD)
    },
    trainDetailsFn (data) {
      let res = {
        //  编组方向
        cheXu: data.cheXu ? data.cheXu : '暂无',
        //  编组数
        cheXiang: data.cheXiang ? data.cheXiang : '暂无',
        //  重连
        chongLian: data.chongLian ? data.chongLian : '暂无',
        //  立折
        trainMatch: data.trainMatch ? data.trainMatch : '暂无',
        //  车型
        carType: data.carType ? data.carType : '暂无'
      }
      this.trainDetailsData = res
      this.popupSwitch = true
      this.detailsSwitch = true
      // let fangXiang = data.fangXiang
      // let trainNumber = data.cheCi.replace(/\s*/g, '')
      // let riqi = data.date
      // this.rowCheCi = trainNumber
      // this.axios.post(findTrainInfo(trainNumber, riqi)).then((res) => {
      //   if (res.data.code === 0) {
      //
      //   }
      // })
    },
    trainMasterFn (row, item) {
      let date = row.date
      let cheCi = row.cheCi
      this.rowCheCi = cheCi
      this.axios.post(waitingRoom(cheCi, date, item)).then((res) => {
        console.log(res)
        this.trainMasterData = res.data.data[0]
        this.popupSwitch = true
        this.trainSwitch = true
      })
    },
    keyCustomerAccountFn (row) {
      let cheCi = row.cheCi.replace(/\s*/g, '')
      let riqi = row.date
      this.passengersrunId = {
        cheCi: row.cheCi,
        riqi: row.date
      }
      this.axios.post(findzdlkInfo(cheCi, riqi)).then((res) => {
        if (res.data.code === 0) {
          if (res.data.data.data.length) {
            res.data.data.data.forEach((val, index) => {
              val.index = index + 1
              val.oldData = true
              if (val.qujian) {
                if (val.qujian.indexOf('——') !== -1) {
                  let qujianData = val.qujian.split('——')
                  let qujianDataTwo = qujianData[qujianData.length - 1]
                  val.qujian = qujianDataTwo
                }
              }
              if (val.cx) {
                val.cx = parseInt(val.cx)
              }
            })
          }
          this.passengersData = res.data.data
          this.popupSwitch = true
          this.passengersSwitch = true
        }
      })
    },
    differenceFn (row) {
      // this.axios
      console.log('////')
      let planID = row.planID
      let cheCi = row.cheCi.replace(/\s*/g, '')
      this.rowCheCi = cheCi
      console.log(row)
      if (planID) {
        // findHistoryLateTime
        this.axios.post(findHistoryLateTime(cheCi, planID)).then((res) => {
          if (res.data.code === 0) {
            let arr = []
            res.data.data.forEach((val) => {
              if (arr.length) {
                arr.forEach((item) => {
                  if (item.lateTimeArrive !== val.lateTimeArrive || item.lateTime !== val.lateTime) {
                    val.realDepartureTimeData = this.fmtDate(val.realDepartureTime, 2)
                    val.realArriveTimeData = this.fmtDate(val.realArriveTime, 2)
                    arr.push(val)
                  }
                })
              } else {
                val.realDepartureTimeData = this.fmtDate(val.realDepartureTime, 2)
                val.realArriveTimeData = this.fmtDate(val.realArriveTime, 2)
                arr.push(val)
              }
            })
            this.behindScheduleData = arr
            this.popupSwitch = true
            this.behindSwitch = true
          }
        })
      } else {
        this.$message({
          message: '当前车次不在测试范围,请重新选择',
          type: 'warning'
        })
      }
    },
    platformFn (row) {
      let runId = row.runId
      let date = row.date
      this.rowCheCi = row.cheCi
      this.axios.post(findZtHistoryInfo(runId, date)).then((res) => {
        if (res.data.code === 0) {
          this.platformData = res.data.data
          this.popupSwitch = true
          this.platformSwitch = true
        }
      })
    },
    intervalFn () {
      // clearInterval()
      this.updatedSwitch = true
      setInterval(() => {
        if (this.getDataSwitch && this.searchSwitch && this.moveOut) {
          //  再这里将 scrollTop 存入 scrollSwitch中
          // this.scrollSwitch.push(this.$refs.table.bodyWrapper.scrollTop)
          this.getData()
        }
        // clearInterval(time)
        this.month = this.fmtDate((new Date()).getTime(), 3)
      }, 60000)
    },
    updateFn () {
      this.getData(this.search)
      this.findCurrentDay()
      this.closeFn()
    },
    arryIf (res) {
      if (this.scrollSwitch.length) {
        if (this.scrollSwitch.length < 5) {
          this.scrollSwitch.forEach((val) => {
            if (val === res) {
              this.scrollSwitch.push(res)
              return true
            } else {
              this.scrollSwitch = []
              this.scrollSwitch.push(res)
              return false
            }
          })
        } else {
          this.scrollSwitch = []
          this.scrollSwitch.push(res)
          return true
        }
      } else {
        this.scrollSwitch.push(res)
        return true
      }
    },
    //  候车室截取
    waitingFn (str) {
      if (str) {
        let reg = /[1-9][0-9]*候/g
        let arrJ = []
        let arr = []
        if (str.indexOf(',') !== -1) {
          arrJ = str.split(',')
          arrJ.forEach((val) => {
            if (val.indexOf('检票') === -1) {
              let regNumber = /\d+/
              if (regNumber.test(val)) {
                let string = val.match(reg)
                if (string[0].indexOf('候')) {
                  string = string[0].substring(0, string[0].length - 1)
                }
                arr.push(string)
              }
            }
          })
        } else {
          arr.push(str.match(reg))
        }
        //  软席  临候
        if (str.indexOf('软席') !== -1) {
          arr.push('软席')
        }
        if (str.indexOf('临候') !== -1) {
          arr.push('临候')
        }
        if (arr && arr.length) {
          if (arr.length === 1) {
            return `${arr.join()}车室`
          } else {
            return `${arr.join()}候车室`
          }
        } else {
          return ``
        }
      }
    },
    changeCellenter () {
      this.moveOut = false
    },
    changeCellleave () {
      this.moveOut = true
    },
    findCurrentDay () {
      let riqi = new Date(new Date().toLocaleDateString()).getTime()
      this.axios.post(findCurrentDayZdlkInfo(riqi)).then((res) => {
        if (res.data.code === 0) {
          this.keynote = res.data.data.zhongdian
          this.wheelchair = res.data.data.lunyi
          this.stretcher = res.data.data.danjia
        }
      })
    }
  },
  watch: {
    search () {
      this.updatedSwitch = false
    },
    popupSwitch (data) {
      this.updatedSwitch = false
      if (data) {
        this.getDataSwitch = false
      } else {
        this.getDataSwitch = true
      }
    },
    month () {
      this.findCurrentDay()
    }
  },
  updated () {
    if (this.updatedSwitch) {
      this.rolling(this.rollingIndex)
    }
  },
  created () {
    //  本地校验token
    // this.checktoKen()
    this.getData()
    this.intervalFn()
    this.homepageTitle = '北京西站12306服务台'
    // this.homepageTitle = '北京西站036服务台'
    this.searchText = '搜索'
    this.findCurrentDay()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .homepage
    height 100%
    width 100%
    background #071321
    position relative
    overflow hidden
    .homepage-div
      overflow hidden
      width 100%
      .homepage-title
        font-weight bold
        color #fff
        text-align center
        font-size 30px
      .homepage-subject
        overflow hidden
        position relative
        margin 40px 50px
      .homepage-condition
        position relative
        display flex
        font-size 20px!important
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
            margin-right 20px
            width 40%
          .homepage-search
            float left
            text-align center
            box-sizing border-box
            width 50%
        .homepage-condition-right
          overflow hidden
          display flex
          min-width 600px
          width 100%
          .homepage-condition-month
            color #fff
            margin-right 20px
            width 140px
            font-size 24px
            font-weight bold
          .homepage-condition-state
            width 100%
            position relative
            overflow hidden
          .homepage-condition-state-li
            float left
            text-align right
            overflow hidden
            width 33%
            .homepage-condition-state-img
              display inline-block
              margin-right 20px
              vertical-align middle
              height 40px
              width 40px
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
           font-size 24px!important
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
    background rgba(255,255,255,.1)
    height 100%
    width 100%
    z-index 111
  .span
    color $color-Red
  .tableRow
    height 50px
  .noData
    cursor pointer
    color $color-red!important
  .blue
    cursor pointer
    text-decoration underline
    color $color-Biao
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
  .blueSpan
    margin-right 4px
</style>
<style>
  .el-table .warning {
    background: rgba(41,174,241,.1)!important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgba(41,174,241,.6)!important;
  }
  .el-table td, .el-table th.is-leaf {
    border-color: #071321!important;
  }
  .el-table--border, .el-table--group {
    background-color: #071321!important;
    border: none!important;
  }
  .el-table .cell {
    color: #fff!important;
    font-size: 18px;
    text-align: center!important;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: transparent!important;
  }
  .el-table__empty-block {
    background: #071321!important;
  }
  .el-table .warning-row {
    background: rgba(41,174,241,.4)!important;
  }
  .el-table .success-row {
    background: rgba(41,174,241,.2)!important;
  }
  .el-table th, .el-table tr {
    background-color: rgba(41,174,241,.6)!important;
  }
  .el-table th>.cell {
    font-size: 18px;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 6px;
  }
  .el-input--medium .el-input__inner {
    font-size: 18px;
  }
  .el-button--medium {
    padding: 7px 20px;
    font-size: 18px;
  }
</style>
