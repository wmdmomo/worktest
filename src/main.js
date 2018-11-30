// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest, postRequest} from './utilss/api'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
