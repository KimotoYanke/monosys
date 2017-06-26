<template lang="pug">

form.modal-card(@submit='send')
	header.modal-card-head
		p.modal-card-title {{title}}
	section.modal-card-body
		b-field(label='名前'
			:type='!!thing.name ? "is-success" : "is-danger"')
				b-input(v-model='thing.name')
		b-field(label='RFID')
				b-input(v-model='thing.rfid')
		b-field(label='ISBN')
			b-tooltip(:label='"ISBNチェックに" + (isSafeIsbn ? "成功" : "失敗")'
				type='is-info'
				position='is-right')
					b-input(v-model='thing.isbn')
			a.button.is-primary(@click='scannerModal')
				b-icon(icon='barcode')
			a.button.is-primary(@click='searchIsbn(thing.isbn)')
				b-icon(icon='search')
		b-field(label='場所')
				b-select(v-model='thing.where')
					option(:value='index', v-for='(name, index) in PLACES') {{name}}
		b-field(label='予算枠')
				b-select(v-model='thing.budget_frame')
					option(:value='index', v-for='(name, index) in BUDGET_FRAMES') {{name}}
		b-field(label='所持者'
			v-if='thing.budget_frame == "individual"'
			:type='!!thing.whose ? "is-success" : "is-danger"'
			)
				b-input(v-model='thing.whose')
		b-field(label='タグ')
			b-input-tag(:tags.sync='thing.tags')
		b-field(label='備考')
			b-input(:tags='thing.comment')
	footer.modal-card-foot
		button.button 送信
</template>
<script>
import BInputTag from './BInputTag'
import BarcodeScanner from './BarcodeScanner'
import BUDGET_FRAMES from '../budget-frames-type'
import PLACES from '../where-type'
import checkIsbn from '../check-isbn'
import axios from 'axios'
const POST_ERRS = {
	'no-name': '名前がありません',
	'no-ids': 'RFIDもISBNもありません',
	'wrong-isbn': 'ISBNが間違っています',
	'no-budget-frame': '予算枠が記入されていません',
	'no-where': '場所が記入されていません'
}
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
export default {
	props: {
		'thing': {
			default: {
				name: '',
				isbn: '',
				rfid: '',
				where: 'procon-a',
				'budget_frame': 'unknown',
				tags: [],
				comment: '',
				whose: ''
			}
		},
		'title': String },
	data () {
		return {
			BUDGET_FRAMES,
			PLACES
		}
	},
	methods: {
		checkIsbn (isbn) {
			return checkIsbn(isbn)
		},
		removeHyphen (str) {
			return String(str).replace(/[^0-9]/g, '')
		},
		send () {
			const query = Object.assign({}, this.thing)

			// Edit
			query.isbn = this.removeHyphen(query.isbn)
			if (!query.tags.includes('book') && !!query.isbn) {
				if (query.tags) {
					query.tags.push('book')
				} else {
					query.tags[0] = 'book'
				}
			}

			// Check
			const err = (() => {
				if (!query.name) {
					return 'no-name'
				}
				if (!query.isbn && !query.rfid) {
					return 'no-ids'
				}
				if (!this.checkIsbn(query.isbn) && !query.rfid) {
					return 'wrong-isbn'
				}
				if (!query['budget_frame']) {
					return 'no-budget-frame'
				}
				if (!query.where) {
					return 'no-where'
				}
				return ''
			})()
			if (err) {
				this.$toast.open({
					message: POST_ERRS[err],
					position: 'is-bottom',
					type: 'is-danger'
				})
			} else {
				(this.thing._id
					? () => axios.put('/api/v1/thing/' + this.thing._id, JSON.stringify(query))
					: () => axios.post('/api/v1/thing', JSON.stringify(query))
			)().then(responce => {
				this.$toast.open({
					message: '送信しました',
					position: 'is-bottom',
					type: 'is-success'
				})
			}).catch(e => {
				this.$toast.open({
					message: '送信に失敗',
					position: 'is-bottom',
					type: 'is-danger'
				})
			})
			}
		},
		scannerModal () {
			this.$modal.open({
				component: BarcodeScanner,
				props: {
					callback: (code) => {
						this.thing.isbn = code
					}
				}
			})
		},
		searchIsbn (isbn) {
			if (!isbn) {
				if (!this.thing.isbn) {
					this.$toast.open({
						message: 'ISBNが指定されていません',
						position: 'is-bottom',
						type: 'is-danger'
					})
					return
				}
				isbn = this.thing.isbn
			}
			const instance = axios.create({})
			instance.get('https://www.googleapis.com/books/v1/volumes/?q=isbn:' + isbn)
				.then(data => {
					if (data.data.totalItems) {
						this.thing.name = data.data.items[0].volumeInfo.title
					}
				})
		}
	},
	computed: {
		isSafeIsbn () {
			return this.checkIsbn(this.thing.isbn) || !!this.thing.rfid
		}
	},
	mounted () {
	},
	components: {
		'b-input-tag': BInputTag
	}
}
</script>
<style lang="sass">
</style>
