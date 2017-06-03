import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './components/App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Vuex)
Vue.use(Buefy)

new Vue({
	template: '<App/>',
	name: 'app',
	el: '#app',
	store,
	render: (h) => h(App)
})
