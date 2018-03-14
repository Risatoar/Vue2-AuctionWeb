// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import layout from './page/layout.vue'

// 外部插件导入
import iView from 'iview';

import Vuex from 'vuex'

// 外部样式导入
import 'iview/dist/styles/iview.css';

Vue.use(Vuex)
Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
