import thing from '../pages/thing.vue'
import login from '../pages/login.vue'
import ThingTable from '../components/ThingTable.vue'
import ThingForm from '../components/ThingForm.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

function getInstance (Component, propsData) {
	const Ctor = Vue.extend(Component)
	const vm = new Ctor({ propsData }).$mount()
	return vm
}
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Buefy)

describe('test for components', () => {
	it('thing', () => {
		const instance = getInstance(thing)
		it('data', () => {
			expect(thing.data).to.be.a('Function')
		})
		it('components', () => {
			expect(thing.components).to.have.keys('thing-table')
		})
		it('computed', () => {
			expect(thing.computed).to.have.keys('things')
		})
		it('logo', () => {
			expect(
				instance.$el.querySelector('nav.nav > .nav-left > a.nav-item')
				.textContent).to.equals('Monosys')
		})
	})
	it('login', () => {
		const instance = getInstance(login)
		it('data', () => {
			expect(thing.data).to.be.a('Function')
		})
		it('components', () => {
			expect(thing.components).to.have.keys('nav-bar')
		})
		it('methods', () => {
			expect(thing.computed).to.have.keys('login')
			expect(thing.computed).to.have.keys('register')
		})
		it('logo', () => {
			expect(
				instance.$el.querySelector('nav.nav > .nav-left > a.nav-item')
				.textContent).to.equals('Monosys')
		})
	})
	it('ThingTable', () => {
		it('data', () => {
			expect(ThingTable.data).to.be.a('Function')
		})
		it('methods', () => {
			it('dateFormat', () => {
				expect(ThingTable.methods.dateFormat(undefined)).to.equals('')
				expect(ThingTable.methods.dateFormat('')).to.equals('')
			})
		})
	})
	it('ThingForm', () => {
		it('data', () => {
			expect(ThingForm.data).to.be.a('Function')
		})
		it('methods', () => {
			it('checkIsbn', () => {
				expect(ThingForm.methods.checkIsbn('4774120189')).to.be.true
				expect(ThingForm.methods.checkIsbn('4774120188')).to.be.false
				expect(ThingForm.methods.checkIsbn('9784774166346')).to.be.true
				expect(ThingForm.methods.checkIsbn('9784774166345')).to.be.false
			})
		})
	})
	it('Test', () => {
		expect('vim').equals('vim')
	})
})
