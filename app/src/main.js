import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Buefy, {
    defaultIconPack: 'fa'
})
Vue.config.silent = true

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

sync(store, router)

new Vue({
    router,
    store
}).$mount('#app')

store.dispatch('checkLoggedIn')
