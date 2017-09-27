import thing from '../src/pages/thing.vue'
import login from '../src/pages/login.vue'
import ThingTable from '../src/components/ThingTable.vue'
import ThingForm from '../src/components/ThingForm.vue'
import store from '../src/store/'
import router from '../src/router'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import MockAdapter from 'axios-mock-adapter'

function getInstance (Component, propsData) {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData, store, router }).$mount()
    return vm
}

describe('test for components', function () {
    Vue.use(Vuex)
    Vue.use(VueRouter)
    Vue.use(Buefy, {
        defaultIconPack: 'fa'
    })
    const mock = new MockAdapter(axios)
    mock.onGet('/loggedin').reply(200, '')
    mock.onGet('/api/v1/thing').reply(200, [
        {
            '_id': '59cb51d09c6a8b0f46664f14',
            'name': 'ab',
            'isbn': '',
            'rfid': '00001',
            'where': 'procon-a',
            'budget_frame': 'skull',
            'comment': '',
            'whose': '',
            'tags': [],
            'date': '2017-09-27T07:22:56.992Z',
            '__v': 0
        }
    ])
    describe('thing', function () {
        const instance = getInstance(thing)
        it('data', () => {
            expect(thing.data).to.be.a('Function')
        })
        it('components', () => {
            console.log(thing)
            expect(thing.components).to.have.any.keys('thing-table')
        })
        it('computed', () => {
            expect(thing.computed).to.have.any.keys('things')
        })
        it('logo', () => {
            expect(
                instance.$el.querySelector('nav.nav > .nav-left > a.nav-item')
                .textContent).to.equals('Monosys')
        })
    })
    describe('login', function () {
        const instance = getInstance(login)
        it('data', function () {
            expect(login.data).to.be.a('Function')
        })
        it('components', function () {
            expect(login.components).to.have.any.keys('nav-bar')
        })
        it('methods', function () {
        })
        it('logo', function () {
            expect(
                instance.$el.querySelector('nav.nav > .nav-left > a.nav-item')
                .textContent).to.equals('Monosys')
        })
    })
    describe('ThingTable', function () {
        it('data', function () {
            expect(ThingTable.data).to.be.a('Function')
        })
        it('methods', function () {
            expect(ThingTable.methods.dateFormat(undefined)).to.equals('')
            expect(ThingTable.methods.dateFormat('')).to.equals('')
        })
    })
    describe('ThingForm', function () {
        it('data', function () {
            expect(ThingForm.data).to.be.a('Function')
        })
        describe('methods', function () {
            it('checkIsbn', function () {
                expect(ThingForm.methods.checkIsbn('4774120189')).to.be.true
                expect(ThingForm.methods.checkIsbn('4774120188')).to.be.false
                expect(ThingForm.methods.checkIsbn('47741201880')).to.be.false
                expect(ThingForm.methods.checkIsbn('9784774166346')).to.be.true
                expect(ThingForm.methods.checkIsbn('9784774166345')).to.be.false
            })
        })
    })
})
