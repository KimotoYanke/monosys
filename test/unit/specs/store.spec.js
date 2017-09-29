import * as actions from '@/store/actions'
import mutations from '@/store/mutations'
import types from '@/store/mutations-type.json'
import { testThings } from './helper'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Store', function () {
    Vue.use(Vuex)
    const mock = new MockAdapter(axios)
    mock.onGet('/user/loggedin').reply(200, 'a_user')
    mock.onGet('/api/v1/thing').reply(200, testThings)
    mock.onPost('/user/login').reply(200, 'a_user')
    mock.onGet('/user/logout').reply(200, 'a_user')
    mock.onPost('/user/register').reply(200, 'a_user')

    describe('Mutations', function () {
        it('fetch', function () {
            const state = {}
            const things = { '_id': 'aaa' }
            mutations[types.fetch](state, { things })
        })
        it('setUsername', function () {
            const state = {}
            mutations[types.setUsername](state, { username: 'username' })
            expect(state.username).to.equal('username')
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
        it('login', function () {
            const dispatch = actionType => {
                expect(actionType).to.equal('checkLoggedIn')
                done()
            }
            actions.login({ dispatch }, {})
        })
        it('logout', function (done) {
            const dispatch = actionType => {
                expect(actionType).to.equal('checkLoggedIn')
                done()
            }
            actions.logout({ dispatch }, {})
        })
        it('register', function (done) {
            const dispatch = actionType => {
                expect(actionType).to.equal('checkLoggedIn')
                done()
            }
            actions.register({ dispatch }, {})
        })
        it('checkLoggedIn', function (done) {
            const commit = (type, { username }) => {
                expect(type).to.equal(types.setUsername)
                expect(username).to.equal('a_user')
                done()
            }
            actions.checkLoggedIn({ commit })
        })
    })

    describe('Getters', function () {
    })
})
