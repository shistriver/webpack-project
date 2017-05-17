import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import IndexPage from './components/pages/indexPage'

Vue.set(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: IndexPage
        }
    ]
})
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
