import * as actions from '@/store/thing/actions'
import mutations from '@/store/thing/mutations'
// import * as getters from '@/store/thing/getters'
import types from '@/store/thing/mutations-type'
import '../helper'

describe('Thing Store', function () {
    describe('Mutations', function () {
        it('fetch', function () {
            const state = {}
            const things = { '_id': 'aaa' }
            mutations[types.fetch](state, { things })
        })
    })

    describe('Actions', function (done) {
        it('fetch', function () {
            const commit = (type, { things }) => {
                expect(type).to.equal(types.fetch)
                done()
            }
            actions.fetch({ commit }, {})
        })
    })

    describe('Getters', function () {
    })
})
