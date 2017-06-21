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
		b-field(label='ISBN'
			:type='isSafeIsbn ? "is-success" : "is-danger"')
				b-input(v-model='thing.isbn', type='number')
		b-field(label='場所'
			:type='!!thing.where ? "is-success" : "is-danger"')
				b-select(v-model='thing.where')
					option(:value='index', v-for='(name, index) in PLACES') {{name}}
		b-field(label='予算枠')
				b-select(v-model='thing.budget_frame')
					option(:value='index', v-for='(name, index) in BUDGET_FRAMES') {{name}}
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
axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
	props: ['active'],
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
			const digits = String(isbn).replace(/[^0-9]/g, '').split('')
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
				const r = 10 - sum % 10
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
		post () {
			if ((() => {
				if (this.thing.isbn) {
					if (!this.isSafeIsbn) {
						return false
					}
				}
				if (!this.thing.name) {
					return false
				}
				return true
			})()) {
				const query = Object.assign({}, this.thing)
				axios.post('/api/v1/thing', JSON.stringify(query))
					.then(responce => {
						console.log(responce)
					})
					.catch(e => {
						console.log(e)
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
