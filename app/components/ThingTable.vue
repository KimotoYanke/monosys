<template lang="pug">
div
	b-table(
		:data='data'
		:bordered='false'
		:striped='true'
		:narrowed='true'
		default-sort='name'
		:selected.sync='selected'
		)
			template(scope='props')
				b-table-column(label='ID', field='_id') {{ props.row._id || '' }}
				b-table-column(label='名前', field='name', sortable) {{ props.row.name }}
				b-table-column(label='RFID', field='rfid') {{ props.row.rfid }}
				b-table-column(label='ISBN', field='isbn') {{ props.row.isbn }}
				b-table-column(label='予算枠', field='budget_frame', sortable) {{ props.row.budget_frame }}
				b-table-column(label='貸出状況', field='loan', sortable) 
					b-icon(icon='check', v-if='!!props.row.loan')
				b-table-column(label='タグ', field='tags')
					.tag-list
						span.tag(v-for='tag in props.row.tags') {{tag}}
				b-table-column(label='登録日', field='date', sortable, custom-sort='dateSort') {{ dateFormat(props.row.date) }}
</template>
<script>
export default {
	props: ['data'],
	data () {
		return {
			selected: {},
			dateSort:(a,b)=>{
				if(!a){
					return -1
				}
				if(!b){
					return 1
				}
				return new Date(a).getTime()-new Date(b).getTime()
			}
		}
	},
	methods: {
		dateFormat(date){
			if(!date){
				return ''
			}
			return new Date(date).toLocaleString()
		},
	},
	mounted () {
	}
}
</script>
<style lang="sass">
</style>
