<template>
  <div class="keyPassengers" @click.stop>
    <h4 class="keyPassengers-title">
      {{keyPassengersTitle}}
    </h4>
    <div class="keyPassengers-subject">
      <ul class="homepage-condition-state">
        <li class="homepage-condition-state-li">
          <!--重点-->
          <img class="homepage-condition-state-img" src="../../../common/img/keynote.png" alt="">
          <div class="homepage-condition-state-input">
            <el-input-number size="small" v-model="keynote" :min="keynoteMin"></el-input-number>
          </div>
        </li>
        <li class="homepage-condition-state-li">
          <!--轮椅-->
          <img class="homepage-condition-state-img" src="../../../common/img/wheelchair.png" alt="">
          <div class="homepage-condition-state-input">
            <el-input-number size="small" v-model="wheelchair" :min="wheelchairMin"></el-input-number>
          </div>
        </li>
        <li class="homepage-condition-state-li">
          <!--担架-->
          <img class="homepage-condition-state-img" src="../../../common/img/stretcher.png" alt="">
          <div class="homepage-condition-state-input">
            <el-input-number size="small" v-model="stretcher" :min="stretcherMin"></el-input-number>
          </div>
        </li>
        <li class="homepage-condition-state-li homepage-condition-state-right">
          <el-button size="small" type="info" disabled>{{scanning}}</el-button>
          <el-button size="small" type="primary" @click="addLine">{{increase}}</el-button>
        </li>
      </ul>
      <div class="homepage-buttons">
        <div class="homepage-buttons-div">
        </div>
      </div>
      <div class="keyPassengers-body">
        <el-table
          :header-cell-style="{background:'#3c4761',color:'#fff'}"
          border
          height="360"
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="index" label="序号" width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.index" placeholder="序号"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lkName" label="姓名" width="100">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.lkName" placeholder="姓名"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="100">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.sex" placeholder="性别"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNo" label="电话">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.phoneNo" placeholder="电话"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lkStyle" label="旅客类型">
            <template slot-scope="scope">
              <el-select @change="bookbuytimeFn" size="mini" v-model="scope.row.lkStyle" placeholder="旅客类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="qujian" label="乘车区间">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.qujian" placeholder="乘车区间"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="cx" label="车厢" width="80">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.cx" placeholder="车厢"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sfz" label="身份证">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.sfz" placeholder="身份证"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="备注">
            <template slot-scope="scope">
              <el-input
                size="mini"
                type="textarea"
                :rows="3"
                placeholder="备注"
                v-model="scope.row.content">
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="passengersButton">
        <el-button size="medium" type="primary" @click="save">{{saveTxt}}</el-button>
        <el-button @click="close" size="medium" plain>{{closeText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addZdlkInfo } from '../../../api/url'
export default {
  name: 'keyPassengers',
  props: ['passengersData', 'passengersrunId'],
  data () {
    return {
      cheCi: this.passengersrunId.cheCi,
      riqi: this.passengersrunId.riqi,
      keynote: '',
      wheelchair: '',
      stretcher: '',
      keyPassengersTitle: '',
      tableData: [],
      options: [
        {label: '老年旅客', value: '老年旅客'},
        {label: '担架旅客', value: '担架旅客'},
        {label: '轮椅旅客', value: '轮椅旅客'},
        {label: '盲人旅客', value: '盲人旅客'},
        {label: '孕妇旅客', value: '孕妇旅客'},
        {label: '婴幼儿旅客', value: '婴幼儿旅客'},
        {label: '病患旅客', value: '病患旅客'},
        {label: '护送器官旅客', value: '护送器官旅客'},
        {label: '特殊需求旅客', value: '特殊需求旅客'},
        {label: '其他', value: '其他'}],
      stretcherUsed: 0,
      wheelchairUsed: 0,
      keynoteUsed: 0,
      stretcherMin: 0,
      wheelchairMin: 0,
      keynoteMin: 0,
      stretcherCha: 0,
      wheelchairCha: 0,
      keynoteCha: 0
    }
  },
  methods: {
    addLine () { //  添 加行数
      let newValue = {
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: ''
      }
      //  添加新的行数
      this.tableData.push(newValue)
    },
    handleDelete (index) { //  删除行数
      this.tableData.splice(index, 1)
    },
    save () {
      //  这部分应该是保存提交你添加的内容
      if (this.tableData.length) {
        this.tableData.forEach((val) => {
          if (!val.cheCi) {
            val.cheCi = this.cheCi
          }
          if (!val.date) {
            val.date = this.riqi
          }
        })
      }
      this.axios.post(addZdlkInfo(this.cheCi, this.riqi, this.stretcher, this.wheelchair, this.keynote), this.tableData).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          console.log('///')
          this.$emit('keyupdate')
        }
      })
    },
    close () {
      this.$emit('close')
    },
    bookbuytimeFn () {
      let stretcher = 0
      let wheelchair = 0
      let keynote = 0
      this.tableData.forEach((val) => {
        if (val.lkStyle === '担架旅客') {
          stretcher += 1
        } else if (val.lkStyle === '轮椅旅客') {
          wheelchair += 1
        } else {
          keynote += 1
        }
      })
      this.stretcherMin = stretcher
      this.wheelchairMin = wheelchair
      this.keynoteMin = keynote
      if ((stretcher - this.stretcherUsed) === 0) {
        this.stretcher = this.stretcherUsed
      } else if (stretcher - this.stretcherUsed < 0) {
        this.stretcher = stretcher + this.stretcherCha
      } else if (stretcher - this.stretcherUsed > 0) {
        this.stretcher = stretcher + this.stretcherCha
      }
      if ((wheelchair - this.wheelchairUsed) === 0) {
        this.wheelchair = this.wheelchairUsed
      } else if (wheelchair - this.wheelchairUsed < 0) {
        this.wheelchair = wheelchair + this.wheelchairCha
      } else if (wheelchair - this.wheelchair > 0) {
        this.wheelchair = wheelchair + this.wheelchairCha
      }
      if ((keynote - this.keynoteUsed) === 0) {
        this.keynote = this.keynoteUsed
      } else if (keynote - this.keynoteUsed < 0) {
        this.keynote = keynote + this.keynoteCha
      } else if (keynote - this.keynoteUsed > 0) {
        this.keynote = keynote + this.keynoteCha
      }
      // this.stretcher = this.stretcherUsed + stretcher
      // this.wheelchair = this.wheelchairUsed + wheelchair
      // this.keynote = this.keynoteUsed + keynote
    }
  },
  watch: {
    tableData (data) {
      console.log(data)
    }
  },
  created () {
    this.keyPassengersTitle = '重点旅客'
    this.scanning = '扫码增加'
    this.increase = '手动增加'
    this.saveTxt = '保存'
    this.closeText = '关闭'

    if (this.passengersData) {
      this.keynote = this.passengersData.zhongdian
      this.wheelchair = this.passengersData.lunyi
      this.stretcher = this.passengersData.danjia
      this.keynoteUsed = this.passengersData.zhongdian
      this.wheelchairUsed = this.passengersData.lunyi
      this.stretcherUsed = this.passengersData.danjia
      if (this.passengersData.data.length) {
        let keynote = 0
        let wheelchair = 0
        let stretcher = 0
        this.passengersData.data.forEach((val) => {
          if (val.lkStyle === '担架旅客') {
            stretcher += 1
          } else if (val.lkStyle === '轮椅旅客') {
            wheelchair += 1
          } else {
            keynote += 1
          }
        })
        this.stretcherCha = this.passengersData.danjia - stretcher
        this.wheelchairCha = this.passengersData.lunyi - wheelchair
        this.keynoteCha = this.passengersData.zhongdian - keynote
      }
      this.tableData = this.passengersData.data
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .keyPassengers
    position absolute
    top 50%
    left 50%
    margin -300px 0 0 -600px
    overflow hidden
    border-radius 6px
    background #5a6379
    width 1200px
    .keyPassengers-title
      unitTitle()
    .keyPassengers-subject
      position relative
      margin 10px 20px
      overflow hidden
      .homepage-condition-state
        width 100%
        position relative
        overflow hidden
      .homepage-condition-state-li
        float left
        overflow hidden
        width 25%
        .homepage-condition-state-img
          display inline-block
          margin-right 20px
          vertical-align middle
          height 48px
          width 48px
        .homepage-condition-state-input
          display inline-block
          width 200px
      .homepage-buttons
        position relative
        margin 10px 0
        overflow hidden
        .homepage-buttons-div
          overflow hidden
          position relative
          float right
    .keyPassengers-body
      overflow hidden
      position relative
      width 100%
  .passengersButton
    text-align center
    overflow hidden
    margin-top 10px
    width 100%
  .homepage-condition-state-right
     text-align right
     margin-top 6px
</style>
