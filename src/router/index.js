import Vue from 'vue'
import Router from 'vue-router'
import FrontMatter from '@/components/FrontMatter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontMatter',
      component: FrontMatter
    }
  ]
})
