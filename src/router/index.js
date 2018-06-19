import Vue from 'vue'
import Router from 'vue-router'
import FrontMatter from '@/components/FrontMatter'
import HelloWorld2 from '@/components/HelloWorld2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontMatter',
      component: FrontMatter
    },
    {
      path: '/2/',
      name: 'HelloWorld2',
      component: HelloWorld2
    }
  ]
})
