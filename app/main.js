import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import ThingPage from './pages/thing.vue'
import IndexPage from './pages/index.vue'
import Buefy from 'buefy'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Buefy, {
	defaultIconPack: 'fa'
})
Vue.config.silent = true

axios.defaults.headers.post['Content-Type'] = 'application/json'

const routes = [
	{ path: '/', redirect: '/index' },
	{ path: '/index', component: IndexPage },
	{ path: '/thing', component: ThingPage }
]

const router = new VueRouter({
	routes
})

sync(store, router)

new Vue({
	router,
	store
}).$mount('#app')
