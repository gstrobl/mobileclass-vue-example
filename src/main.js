import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from './App'
import router from './helpers/router'

Vue.use(VueI18n)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
})
