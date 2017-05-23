/**
 * Created by shiyuanzhong on 2017/5/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart
  }
})
