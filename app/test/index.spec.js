import thing from '../pages/thing.vue'
import ThingTable from '../components/ThingTable.vue'
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
		console.log(instance)
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
	it('ThingTable', () => {
		it('data', () => {
			expect(ThingTable.data).to.be.a('Function')
		})
		it('methods', () => {
			it('joinTags', () => {
				expect(ThingTable.methods.joinTags(undefined)).to.equals('')
				expect(ThingTable.methods.joinTags([])).to.equals('')
				expect(ThingTable.methods.joinTags(['1', '2'])).to.equals('1, 2')
			})
		})
	})
	it('Test', () => {
		expect('a').equals('a')
	})
})
