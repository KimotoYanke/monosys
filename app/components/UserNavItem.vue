<template lang="pug">
span.nav-item
	router-link(v-if='!isLogined' to='login') Login
</template>
<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			username: 'username'
		}),

		isLogined () {
			return !!Cookies.get('connect.sid')
		}
	},
	mounted () {
	},
	methods: {
	},
	components: {
	}
}
</script>
<style lang="sass" scoped>
@import "../stylesheets/index.scss"
</style>
