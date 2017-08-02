<template lang="pug">
div
	nav-bar
</template>
<script>
import NavBar from '../components/NavBar.vue'
import ThingTable from '../components/ThingTable.vue'
import ThingForm from '../components/ThingForm.vue'
import { mapState } from 'vuex'

export default {
	data () {
		return {
			ThingForm,
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
		},
		registerModal () {
			this.$modal.open({
				component: ThingForm,
				props: {
					title: '登録'
				}
			})
		}
	},
	components: {
		'nav-bar': NavBar,
		'thing-table': ThingTable,
		'thing-form': ThingForm
	}
}
</script>
<style lang="sass">
</style>
