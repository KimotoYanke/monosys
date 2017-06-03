import App from '../components/App.vue'
import ThingTable from '../components/ThingTable.vue'
describe('test for components', () => {
	it('App', () => {
		it('data', () => {
			expect(App.data).to.be.a('Function')
		})
		it('components', () => {
			expect(App.components).to.have.keys('thing-table')
		})
		it('computed', () => {
			expect(App.computed).to.have.keys('things')
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
})
