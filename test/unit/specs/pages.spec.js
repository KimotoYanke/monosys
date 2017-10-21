import index from '@/pages/index.vue'
import thing from '@/pages/thing.vue'
import login from '@/pages/login.vue'
import store from '@/store/'
import router from '@/router'
import './helper'
import Vue from 'vue'

function getInstance (Component, propsData) {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData, store, router }).$mount()
    return vm
}

describe('test for pages', function () {
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
        describe('methods', function () {
            it('login', function (done) {
                sinon.spy(instance.$store, 'dispatch')
                instance.login().then(() => {
                    expect(instance.$store.dispatch).to.be.called

                    instance.$store.dispatch.restore()
                    done()
                })
            })
            it('register', function (done) {
                sinon.spy(instance.$store, 'dispatch')
                sinon.spy(instance.$router, 'push')
                instance.register().then(() => {
                    expect(instance.$store.dispatch).to.be.called

                    instance.$store.dispatch.restore()
                    done()
                })
            })
        })
        it('logo', function () {
            expect(
                instance.$el.querySelector('nav.nav > .nav-left > a.nav-item')
                    .textContent).to.equals('Monosys')
        })
    })
    describe('thing', function () {
        it('mounted', function () {
            getInstance(thing)
            expect(store.state.thing.things).to.be.exist
        })
        describe('methods', function () {
            describe('search', function () {
                it('rfid', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'rfid:00001'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
                it('isbn', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'isbn:9784774166346'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
                it('budget', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'budget:skull'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
                it('loan', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'loan:false'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
                it('tag', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'tag:book'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
                it('other', function () {
                    const instance = getInstance(thing)
                    sinon.spy(instance.$store, 'dispatch')
                    instance.searchValue = 'book'
                    instance.search()
                    expect(instance.$store.dispatch).to.be.called
                    instance.$store.dispatch.restore()
                })
            })
            it('registerModal', function () {
                const instance = getInstance(thing)
                sinon.spy(instance.$modal, 'open')
                instance.registerModal()
                expect(instance.$modal.open).to.be.called
                instance.$modal.open.restore()
            })
        })
    })
})
