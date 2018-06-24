import Vue from 'vue'
import Router from 'vue-router'
import FrontMatter from '@/views/FrontMatter'
import ConsumerSegment from '@/views/ConsumerSegment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontMatter',
      component: FrontMatter
    },
    {
      path: '/ConsumerSegment',
      name: 'ConsumerSegment',
      component: ConsumerSegment
    }
  ]
})
