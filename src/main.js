import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import $ from 'jquery'
import './bus.js'
import currencyFilter from './filters/currency.js'
import dateFilter from './filters/date.js'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

extend('tel', value => {
  if (value.length < 9) {
    return '電話號碼不可小於九個數字'
  } else if (value.length >= 9) {
    return true
  }
})

localize('zh_TW', TW)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

window.$ = $

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('loading', Loading)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
