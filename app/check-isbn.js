export default function checkIsbn (isbn) {
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
}
