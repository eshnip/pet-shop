import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

const pinia = createPinia()
new Vue({
  pinia,
  render: (h) => h(App)
}).$mount('#app')

