import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户的数据
    user: JSON.parse(window.localStorage.getItem('la-gou') || null)
  },
  getters: {
  },
  mutations: {
    // 修改user数据
    setUser(state, payload) {
      state.user = JSON.parse(payload)
      // 本地存储
      window.localStorage.setItem('la-gou', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
