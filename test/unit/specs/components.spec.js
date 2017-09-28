import index from '@/pages/index.vue'
import thing from '@/pages/thing.vue'
import login from '@/pages/login.vue'
import ThingTable from '@/components/ThingTable.vue'
import ThingForm from '@/components/ThingForm.vue'
import UserNavItem from '@/components/UserNavItem.vue'
import store from '@/store/'
import router from '@/router'
import { testThings } from './helper'
import googleIsbn from './google-isbn.json'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sinon from 'sinon'
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
    mock.onGet('/api/v1/thing').reply(200, testThings)
    mock.onPost('/api/v1/thing').reply(200, 'null')
    mock.onPut(/\/api\/v1\/thing\/.+/).reply(200, 'null')
    mock.onGet('https://www.googleapis.com/books/v1/volumes/?q=isbn:9784774166346')
        .reply(200, JSON.stringify(googleIsbn))

    describe('index', function () {
        const instance = getInstance(index)
        it('data', () => {
            expect(thing.data).to.be.a('Function')
        })
        it('components', () => {
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
    describe('thing', function () {
        const instance = getInstance(thing)
        it('data', () => {
            expect(thing.data).to.be.a('Function')
        })
        it('components', () => {
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
        describe('methods', function () {
            it('dateFormat', function () {
                expect(ThingTable.methods.dateFormat(undefined)).to.equals('')
                expect(ThingTable.methods.dateFormat('')).to.equals('')
            })
            it('editModal', function () {
                const instance = getInstance(ThingTable, { data: testThings })
                instance.$el.getElementsByClassName('edit-button')[0].click()
                expect(instance.$el.querySelectorAll('.modal-card').length).not.to.be.zero
            })
            it('dateSort', function () {
                expect(ThingTable.methods.dateSort(undefined, undefined)).to.equals(-1)
                expect(ThingTable.methods.dateSort(undefined, 1)).to.equals(-1)
                expect(ThingTable.methods.dateSort(1, undefined)).to.equals(1)

                const start = new Date(2000, 1, 1, 0, 0, 0, 0).getTime()
                const end = new Date(2000, 1, 1, 0, 0, 1, 0).getTime()
                expect(ThingTable.methods.dateSort(end, start)).to.equals(1000)
            })
        })
    })
    describe('ThingForm', function () {
        it('data', function () {
            expect(ThingForm.data).to.be.a('Function')
            expect(ThingForm.data()).to.have.any.keys('BUGDET_FRAMES', 'PLACES')
        })
        describe('methods', function () {
            it('checkIsbn', function () {
                expect(ThingForm.methods.checkIsbn('4774120189')).to.be.true
                expect(ThingForm.methods.checkIsbn('4774120188')).to.be.false
                expect(ThingForm.methods.checkIsbn('47741201880')).to.be.false
                expect(ThingForm.methods.checkIsbn('9784774166346')).to.be.true
                expect(ThingForm.methods.checkIsbn('9784774166345')).to.be.false
            })
            it('removeHyphen', function () {
                expect(ThingForm.methods.removeHyphen('978-4-77-416634-5')).to.equal('9784774166345')
            })
            it('errorCheck', function () {
                const instancesAndErrors = [
                    { instance: getInstance(ThingForm, {
                        thing: { ...testThings[0], name: '' }}),
                    error: 'no-name' },
                    { instance: getInstance(ThingForm, {
                        thing: { ...testThings[0], rfid: '', isbn: '' }}),
                    error: 'no-ids' },
                    { instance: getInstance(ThingForm, {
                        thing: { ...testThings[0], rfid: '', isbn: '9784774166345' }}),
                    error: 'wrong-isbn' },
                    { instance: getInstance(ThingForm, {
                        thing: { ...testThings[0], 'budget_frame': '' }}),
                    error: 'no-budget-frame' },
                    { instance: getInstance(ThingForm, {
                        thing: { ...testThings[0], where: '' }}),
                    error: 'no-where' },
                    { instance: getInstance(ThingForm, {
                        thing: testThings[0] }),
                    error: '' }
                ]
                for (const iae of instancesAndErrors) {
                    expect(iae.instance.error).to.equal(iae.error)
                }
            })
            describe('send', function () {
                it('if data has error', function () {
                    const instance = getInstance(ThingForm, {
                        thing: { ...testThings[0], name: '', isbn: '9784774166346' }})
                    expect(instance.send()).to.be.false
                })

                it('if instance is normal', function (done) {
                    const instance = getInstance(ThingForm, { thing: testThings[0] })
                    const stub = sinon.stub(axios, 'put')
                    stub.withArgs('/api/v1/thing/' + testThings[0]._id)
                        .returns(Promise.resolve({ data: '' }))
                    instance.send().then(toast => {
                        expect(toast.message).to.equal('送信しました')
                        done()
                    })
                    axios.put.restore()
                })

                it('if instance is new (has no mongo\'s "_id")', function (done) {
                    const instance = getInstance(ThingForm, {
                        thing: { ...testThings[0], _id: '', isbn: '9784774166346' }})
                    const stub = sinon.stub(axios, 'post')
                    stub.withArgs('/api/v1/thing').returns(Promise.resolve({ data: '' }))
                    instance.send().then(toast => {
                        expect(toast.message).to.equal('送信しました')
                        done()
                    })
                    axios.post.restore()
                })

                it('if offline', function (done) {
                    const instance = getInstance(ThingForm, {
                        thing: { ...testThings[0], _id: '' }})
                    const stub = sinon.stub(axios, 'post')
                    stub.withArgs('/api/v1/thing').returns(Promise.reject(new Error()))
                    instance.send().then(toast => {
                        expect(toast.message).to.equal('送信に失敗')
                        done()
                    })
                    axios.post.restore()
                })
            })
            describe('searchIsbn', function () {
                it('no isbn', function () {
                    const instance = getInstance(ThingForm, {
                        thing: { ...testThings[0], isbn: '' }})
                    expect(instance.searchIsbn()).to.be.undefined
                })
                it('isbn', function () {
                    const instance = getInstance(ThingForm, {
                        thing: { ...testThings[0], isbn: '9784774166346' }})
                    const axiosInstance = axios.create({})
                    axiosInstance.get = () => Promise.resolve({ data: googleIsbn })
                    instance.searchIsbn(undefined, axiosInstance).then(() => {
                        expect(instance.thing.name).to.equal('')
                    })
                })
            })

            it('scannerModal', function () {
                const instance = getInstance(ThingForm, {
                    thing: { ...testThings[0], isbn: '' }})
                instance.scannerModal().props.callback('9784774166346')
                expect(instance.thing.isbn).to.equal('9784774166346')
            })
        })
    })
    describe('UserNavItem', function () {
        it('username', function () {
            const instance = getInstance(UserNavItem)
            expect(instance.username).to.equal(store.state.username)
        })
        it('logout', function () {
            const instance = getInstance(UserNavItem)
            const spy = sinon.spy(instance.$store, 'dispatch')
            instance.logout()
            expect(spy.calledOnce).to.be.ok
        })
    })
})
