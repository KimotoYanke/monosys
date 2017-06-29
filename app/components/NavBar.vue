<template lang="pug">
nav.nav.has-shadow
	.nav-left
		a.nav-item(href='/', style='font-family: "Rubik";') Monosys
	slot
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
