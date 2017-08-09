<template lang="pug">
	span.nav-item
		span.nav-item
			a.button.is-primary(v-if='username') {{ username }}
		span.nav-item
			router-link.button(v-if='!username' to='login') Login
			a.button(v-if='username' @click='logout') Logout
</template>
<script>
import { mapState } from 'vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			username: 'username'
		})
	},
	mounted () {
	},
	methods: {
		logout () {
			this.$store.dispatch('logout')
		}
	},
	components: {
	}
}
</script>
<style lang="sass" scoped>
@import "../stylesheets/index.scss"
</style>
