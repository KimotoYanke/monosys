import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import ThingPage from './pages/thing.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Buefy)

const routes = [
	{ path: '/thing', component: ThingPage }
]

const router = new VueRouter({
	routes // routes: routes の短縮表記
})

sync(store, router)

new Vue({
	router,
	store,
	render: h => h(ThingPage)
}).$mount('#app')
