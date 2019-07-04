import * as types from './mutation-types'

const mutations = {
  [types.UPDATE_MAINTAIN_PROJECT] (state, data) {
    state.token = data
  }
}
export default mutations
