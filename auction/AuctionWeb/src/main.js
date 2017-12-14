// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout.vue'
import VueRouter from 'vue-router'
import IndexPage from './pages/index.vue'
import InfoPage from './pages/list/info.vue'
import DetailPage from './pages/detail.vue'
import LawPage from './pages/list/law.vue'
import KnowledgePage from './pages/list/knowledge.vue'
import PreviewPage from './pages/list/preview.vue'
import InfoNav from './pages/list/infonav.vue'
import LawNav from './pages/list/lawnav.vue'
import KnowNav from './pages/list/knowledgenav.vue'
import PreNav from './pages/list/previewnav.vue'
// import LoginPage from './components/user/login.vue'
// import RegisterPage from './components/user/register.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

let router = new VueRouter({
	mode: 'history',
	routes: [
	{
		path: '/',
		component: IndexPage
	},
	{
		path: '/user'
	},
	{
		path: '/detail',
		component: DetailPage,
		redirect: '/detail/info',
		children: [
			{
				path: 'info',
				components: {
					left: InfoNav,
					right: InfoPage
				}
			},
			{
				path: 'law',
				components: {
					left: LawNav,
					right: LawPage
				}
			},
			{
				path: 'knowledge',
				components: {
					left: KnowNav,
					right: KnowledgePage
				}
			},
			{
				path: 'preview',
				components: {
					left: PreNav,
					right: PreviewPage
				}
			}
		]
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
