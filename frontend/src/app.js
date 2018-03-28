// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import exceptionHandler from '@/config/AppExceptionHandler'
import router from '@/config/AppRouter'
import Root from '@/config/AppRoot'
import Vuex from 'vuex'

// load vuex i18n module
import vuexI18n from 'vuex-i18n'

Vue.config.errorHandler = exceptionHandler

Vue.use(Router)

Vue.use(Vuex)
const store = new Vuex.Store()
Vue.use(vuexI18n.plugin, store)

const translationsEn = {
  "title": "My nice title"
};

// translations can be kept in separate files for each language
// i.e. resources/i18n/zh.json.
const translationsZh = {
  "title": "标题"
};

// add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('zh', translationsZh)

// set the start locale to use
Vue.i18n.set('zh')

// 把 router 共享出来给其他地方使用
window.VUE_ROUTER = router

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  template: '<Root/>',
  components: {Root}
})

// 捕获 Permission 里面的未处理异常
window.addEventListener('unhandledrejection', e => exceptionHandler(e.reason, vm))
