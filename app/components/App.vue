<template lang="pug">
div
	nav.nav.has-shadow
		.nav-left
			a.nav-item(href='/', style='font-family: "Rubik";') Monosys
	thing-table(
		:data='things'
		)
</template>
<script>
import ThingTable from './ThingTable.vue'
import { mapState } from 'vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			things: state => state.things
		})
	},
	mounted () {
		this.$store.dispatch('fetch', {})
	},
	components: {
		'thing-table': ThingTable
	}
}
</script>
<style lang="sass">
</style>
