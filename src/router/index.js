import Vue from 'vue'
import Router from 'vue-router'
// import login from '../components/login/login'
import homepage from '../components/homepage/homepage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    }
  ]
})
