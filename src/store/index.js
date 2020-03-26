import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts'
import users from './users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts,
    users
  },
  getters: {
  }
})
