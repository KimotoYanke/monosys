<template lang="pug">
nav.nav.has-shadow
	.nav-left.is-primary
		a.nav-item(href='/', style='font-family: "Rubik";') Monosys
	slot
</template>
<script>
import ThingForm from '../components/ThingForm.vue'
export default {
	props: ['data'],
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
