<template lang="pug">
	span.nav-item
		router-link.button(v-if='!username' to='login') Login
		div.tags.has-addons(v-if='username')
			span.tag.is-primary Username
			span.tag {{ username }}
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
