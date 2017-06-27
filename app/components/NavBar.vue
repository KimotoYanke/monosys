<template lang="pug">
nav.nav.has-shadow
	.nav-left
		a.nav-item(href='/', style='font-family: "Rubik";') Monosys
	slot
		.nav-item
			b-field
				b-input(
					type='search'
					icon='search'
					v-model='searchValue')
				p.control
					button.button.is-primary(@click='search')
						b-icon(icon='search')
						span 検索
		.nav-item
			p.control
				a.button.is-primary(@click='registerModal')
					b-icon(icon='plus')
					span 登録
</template>
<script>
import ThingForm from '../components/ThingForm.vue'
export default {
	props: ['data'],
	data () {
		return {
			selected: {},
			dateSort: (a, b) => {
				if (!a) {
					return -1
				}
				if (!b) {
					return 1
				}
				return new Date(a).getTime() - new Date(b).getTime()
			}
		}
	},
	methods: {
		dateFormat (date) {
			if (!date) {
				return ''
			}
			return new Date(date).toLocaleString()
		},
		editModal (t) {
			this.$modal.open({
				component: ThingForm,
				props: {
					title: '編集',
					thing: t
				}
			})
		}
	},
	mounted () {
	}
}
</script>
<style lang="sass">
</style>
