// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout.vue'
import VueRouter from 'vue-router'
import IndexPage from './pages/index.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

let router = new VueRouter({
	mode: 'history',
	routes: [
	{
		path: '/',
		component: IndexPage
	}
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { layout }
})
