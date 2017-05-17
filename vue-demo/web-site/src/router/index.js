import Vue from 'vue'
import Router from 'vue-router'
import resource from 'vue-resource'
import VIndex from '@/components/pages/index'
import DetailPage from '@/components/pages/detail'
import VCount from '@/components/pages/count'
import VAnalysis from '@/components/pages/analysis'
import VForecast from '@/components/pages/forecast'
import VPublish from '@/components/pages/publish'
Vue.use(Router)
Vue.use(resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: VIndex
    },
    {
      path: '/detail',
      component: DetailPage,
      children: [
        {
          path: 'count',
          component: VCount
        },
        {
          path: 'analysis',
          component: VAnalysis
        },
        {
          path: 'forecast',
          component: VForecast
        },
        {
          path: 'publish',
          component: VPublish
        }
      ]
    }
  ]
})
