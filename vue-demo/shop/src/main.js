// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'
// import './common/stylus/index.styl'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: seller},
    {path: '/goods', component: goods},
    {path: '/seller', component: seller},
    {path: '/ratings', component: ratings}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: {App}
// })
