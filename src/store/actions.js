import * as types from './mutation-types'
export const updateProjectAndUpdateLocal = function ({commit}, projectId) {
  window.sessionStorage.setItem('token', projectId)
  commit(types.UPDATE_MAINTAIN_PROJECT, projectId)
}
