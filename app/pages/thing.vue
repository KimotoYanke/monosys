<template lang="pug">
div
	nav.nav.has-shadow
		.nav-left
			a.nav-item(href='/', style='font-family: "Rubik";') Monosys
		.nav-right
			b-field.nav-item
				b-input(
					type='search'
					icon='search')
				p.control
					button.button.is-primary 検索
	thing-table(
		:data='things')
</template>
<script>
import ThingTable from '../components/ThingTable.vue'
import store from '../store'
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
	},
	store
}
</script>
<style lang="sass">
</style>
