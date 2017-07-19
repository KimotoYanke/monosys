<template lang="pug">
nav.nav.has-shadow
	.nav-left
		router-link.nav-item.is-primary(to='index', style='font-family: "Rubik";') Monosys
		slot(name='left')
	.nav-right
		slot(name='right')
</template>
<script>
export default {
	data () {
		return {
		}
	},
	methods: {
	},
	mounted () {
	}
}
</script>
<style lang="sass">
</style>
