import packagesService from '@/services/packages'

export default {
  namespaced: true,
  state: () => ({
    packages: [],
    total: 0
  }),
  getters: {
    packages: (state) => state.packages,
    package: (state) => (name) => {
      return state.packages.find((p) => p.package.name === name)
    },
    total: (state) => state.total
  },
  mutations: {
    setPackages(state, payload) {
      state.packages = payload.packages
      state.total = payload.total
    }
  },
  actions: {
    async getPackages({ commit }, params) {
      const data = await packagesService.fetch(params)

      commit('setPackages', {
        packages: data.objects,
        total: data.total
      })
    }
  }
}
