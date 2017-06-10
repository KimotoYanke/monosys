<template lang="pug">
div
	nav.nav.has-shadow
		.nav-left
			a.nav-item(href='/', style='font-family: "Rubik";') Monosys
		.nav-right
			b-field.nav-item
				b-input(
					type='search'
					icon='search'
					v-model='searchValue')
				p.control
					button.button.is-primary(@click='search') 検索
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
			searchValue: ''
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
	methods: {
		search () {
			const str = this.searchValue
			const query = {}
			str.replace(/rfid:([^\s]+)/g, (m, p1) => {
				query.rfid = p1
				return ''
			})
			str.replace(/isbn:([^\s]+)/g, (m, p1) => {
				query.isbn = p1
				return ''
			})
			str.replace(/budget:([^\s]+)/g, (m, p1) => {
				query['budget_frame'] = p1
				return ''
			})
			str.replace(/loan:(true|false)/g, (m, p1) => {
				query.loan = { $exists: p1 === 'true' }
				return ''
			})
			str.replace(/tag:([^\s]+)/g, (m, p1) => {
				query.tags = { $all: p1.split(',') }
				return ''
			})
			str.replace(/[^\s]+\:[^\s]+/g, '')
				.replace(/[^\s]+/, m => {
					if (m !== '') {
						query.name = { $regex: m }
					}
				})
			if (query) {
				this.$store.dispatch('fetch', { query })
			}
		}
	},
	components: {
		'thing-table': ThingTable
	},
	store
}
</script>
<style lang="sass">
</style>
