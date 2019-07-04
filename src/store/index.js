import Vue from 'vue'
import Vuex from 'vuex'
import state from './store'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
