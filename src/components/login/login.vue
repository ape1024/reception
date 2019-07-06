<template>
  <div class="login">
    <div class="loginDiv">
      <div class="account">
        <div class="accountNumber">
          <el-input size="medium" v-model="accountNumber" placeholder="请输入账号"></el-input>
        </div>
        <div class="password">
          <el-input size="medium" placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
      </div>
     <div class="button">
       <el-button size="medium" @click="login" type="primary" round>{{loginText}}</el-button>
     </div>
  </div>
  </div>
</template>

<script>
import { projectMixin } from '../../common/js/mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'login',
  mixins: [projectMixin],
  data () {
    return {
      accountNumber: '',
      password: '',
      loginText: ''
    }
  },
  methods: {
    login () {
      console.log('/...../')
      this.updateProjectAndUpdateLocal(100)
      this.$router.replace('/homepage')
    },
    checktoKen () {
      if (this.token) {
        this.$router.replace('/homepage')
      }
    },
    ...mapActions([
      'updateProjectAndUpdateLocal'
    ])
  },
  computed: {
    ...mapGetters([
      'clientId'
    ])
  },
  created () {
    //  本地校验token
    this.checktoKen()
    this.loginText = '登录'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    overflow hidden
    position relative
    height 100%
    width 100%
    background-color rgba(45, 130, 203, 0.89)
    background-image radial-gradient(farthest-side ellipse at 10% 0, rgba(119, 157, 207, .8) 30%, rgba(118, 139, 160, 0.8) 76%, rgba(167, 148, 163, 0.8))
    .loginDiv
      position absolute
      top 50%
      left 50%
      z-index 11
      margin -130px 0 0 -200px
      border-radius 5px
      padding 20px
      width 360px
  .account
  position relative
  overflow hidden
  .accountNumber
    overflow hidden
    margin 10px 0 20px
  .button
    text-align center
    margin 20px 0 10px
  .el-button--medium.is-round
     border-radius 0
     width 100%
</style>
