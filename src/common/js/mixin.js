import { mapGetters } from 'vuex'
export const projectMixin = {
  computed: {
    ...mapGetters([
      'token'
    ])
  }
}
