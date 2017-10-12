import googleIsbn from './google-isbn.json'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import MockAdapter from 'axios-mock-adapter'

export const testThings = Object.freeze([
    {
        '_id': '59cb51d09c6a8b0f46664f14',
        'name': 'a thing',
        'isbn': '',
        'rfid': '00001',
        'where': 'procon-a',
        'budget_frame': 'skull',
        'comment': '',
        'whose': '',
        'tags': [],
        'date': '2017-09-27T07:22:56.992Z',
        '__v': 0
    },
    {
        '_id': '5555aa55a55a5a55a5a5a5a5',
        'name': 'a book',
        'isbn': '9784774166346',
        'rfid': '',
        'where': 'procon-a',
        'budget_frame': 'skull',
        'comment': '',
        'whose': '',
        'tags': ['book'],
        'date': '2017-09-27T07:22:56.992Z',
        '__v': 0
    }
])

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Buefy, {
    defaultIconPack: 'fa'
})

const mock = new MockAdapter(axios)
mock.onGet('/loggedin').reply(200, '')
mock.onGet('https://www.googleapis.com/books/v1/volumes/?q=isbn:9784774166346')
    .reply(200, JSON.stringify(googleIsbn))
mock.onGet('/user/loggedin').reply(200, 'a_user')
mock.onGet('/api/v1/thing').reply(200, testThings)
mock.onPut(/\/api\/v1\/thing\/.+/).reply(200, testThings)
mock.onPost('/user/login').reply(200, 'a_user')
mock.onGet('/user/logout').reply(200, 'a_user')
mock.onPost('/user/register').reply(200, 'a_user')

export { mock }
