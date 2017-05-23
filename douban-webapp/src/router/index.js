import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '@/page/home/home'
import FindMovie from '@/page/findMovie/findMovie'
import HotMovie from '@/page/hotMovie/hotMovie'
import User from '@/page/user/user'
import Theaters from '@/page/theaters/theaters'
import ComingSoon from '@/page/comingSoon/comingSoon'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'hot',
      component: Home,
      children: [
        {
          path: 'find',
          component: FindMovie
        },
        {
          path: 'hot',
          redirect: 'hot/theater',
          component: HotMovie,
          children: [
            {
              path: 'theater',
              component: Theaters
            },
            {
              path: 'coming',
              component: ComingSoon
            }
          ]
        },
        {
          path: 'user',
          component: User
        }
      ]
    }
  ]
})
