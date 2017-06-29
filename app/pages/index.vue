<template lang="pug">
div
	nav-bar
	section.hero.is-primary.is-medium
		.hero-body
			.container
				.title Monosys
				.subtitle NITTC Procon
</template>
<script>
import NavBar from '../components/NavBar.vue'
import { mapState } from 'vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState({
		})
	},
	mounted () {
	},
	methods: {
	},
	components: {
		'nav-bar': NavBar
	}
}
</script>
<style lang="sass">
</style>
