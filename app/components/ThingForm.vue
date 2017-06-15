<template lang="pug">
.modal-card
	form
		header.modal-card-head
			p.modal-card-title 登録
		section.modal-card-body
			b-field(label='名前'
				:type='!!thing.name ? "is-success" : "is-danger"')
					b-input(v-model='thing.name')
			b-field(label='種類')
				b-radio-group(v-model='type')
					b-radio-button(:value='types.RFID') 物
					b-radio-button(:value='types.ISBN') 本
			b-field(label='RFID'
				v-if='type == types.RFID'
				:type='!!thing.rfid ? "is-success" : "is-danger"')
					b-input(v-model='thing.rfid')
			b-field(label='ISBN'
				v-if='type == types.ISBN'
				:type='isSafeIsbn ? "is-success" : "is-danger"')
					b-input(v-model='thing.isbn', type='number')
			b-field(label='予算枠'
				:type='thing.budget_frame ? "is-success" : "is-danger"')
					b-select(v-model='thing.budget_frame')
						option(:value='index', v-for='(name, index) in budgetFrames') {{name}}
		footer.modal-card-foot
</template>
<script>
import types from '../things-type.json'
import budgetFrames from '../budget-frames-type.json'
export default {
	data () {
		return {
			types,
			budgetFrames,
			thing: {
				name: '',
				isbn: '',
				rfid: '',
				'budget_frame': ''
			},
			type: types.ISBN
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
		}
	},
	computed: {
		isSafeIsbn () {
			return this.checkIsbn(this.thing.isbn)
		}
	},
	mounted () {
	}
}
</script>
<style lang="sass">
</style>
