import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../page/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: IndexPage
    }
  ]
})
