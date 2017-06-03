<template lang="pug">
div
	b-table(
		:data='data'
		:bordered='false'
		:striped='true'
		)
			template(scope='props')
				b-table-column(label='ID') {{ props.row._id || '' }}
				b-table-column(label='名前') {{ props.row.name }}
				b-table-column(label='RFID') {{ props.row.rfid }}
				b-table-column(label='ISBN') {{ props.row.isbn }}
				b-table-column(label='予算枠') {{ props.row.budget_frame }}
				b-table-column(label='貸出状況') 
					b-icon(icon='check', v-if='!!props.row.borrowing')
				b-table-column(label='タグ') {{ joinTags(props.row.tags) }}
</template>
<script>
import { mapState } from 'vuex'

export default {
	props:['data'],
	data () {
		return {
		}
	},
	methods:{
		joinTags(array){
			if(!array){
				return ''
			} else if(array.length){
				return array.join(', ')
			}
		}
	},
	mounted () {
	}
}
</script>
<style lang="sass">
</style>
