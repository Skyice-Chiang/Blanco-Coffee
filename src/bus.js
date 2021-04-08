// 利用event bus掛載到原型下，讓不同的Vue實例可以共享
import Vue from 'vue'
Vue.prototype.$bus = new Vue()
