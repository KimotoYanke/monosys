<template lang="pug">

form.modal-card(@submit='post')
	header.modal-card-head
		p.modal-card-title 登録
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
import axios from 'axios'
import BUDGET_FRAMES from '../budget-frames-type'
import PLACES from '../where-type'
const POST_ERRS = {
	'no-name': '名前がありません',
	'no-ids': 'RFIDもISBNもありません',
	'wrong-isbn': 'ISBNが間違っています',
	'no-budget-frame': '予算枠が記入されていません',
	'no-where': '場所が記入されていません'
}
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
	props: ['active', '_id'],
	data () {
		return {
			BUDGET_FRAMES,
			PLACES,
			thing: {
				name: '',
				isbn: '',
				rfid: '',
				where: 'procon-a',
				'budget_frame': 'unknown',
				tags: [],
				comment: '',
				whose: ''
			}
		}
	},
	methods: {
		checkIsbn (isbn) {
			const digits = this.removeHyphen(isbn).split('')
			const checkDigit = digits[digits.length - 1] * 1

			// ISBN 13
			if (digits.length === 13) {
				const sum = (() => {
					let s = 0
					for (let i = 0; i < 12; i++) {
						if (i % 2 === 0) {
							s += digits[i] * 1
						} else {
							s += digits[i] * 3
						}
					}
					return s
				})()
				const r = sum % 10 === 0 ? 0 : 10 - sum % 10
				return r === checkDigit
			} else if (digits.length === 10) {
				const sum = (() => {
					let s = 0
					for (let i = 0; i < 9; i++) {
						s += digits[i] * (10 - i)
					}
					return s
				})()
				const r = 11 - sum % 11
				return r === checkDigit
			} else {
				return false
			}
		},
		removeHyphen (str) {
			return String(str).replace(/[^0-9]/g, '')
		},
		post () {
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
			console.log(err)
			if (err) {
				this.$toast.open({
					message: POST_ERRS[err],
					position: 'is-bottom',
					type: 'is-danger'
				})
			} else {
				axios.post('/api/v1/thing', JSON.stringify(query))
					.then(responce => {
						this.$toast.open({
							message: '送信しました',
							position: 'is-bottom',
							type: 'is-success'
						})
					})
					.catch(e => {
						this.$toast.open({
							message: '送信に失敗',
							position: 'is-bottom',
							type: 'is-danger'
						})
					})
			}
		},
		close () {
			this.active = false
			this.$emit('update:active', false)
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
