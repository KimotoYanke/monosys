import types from './mutations-type.json'
import axios from 'axios'

export function fetch ({ commit }, query) {
    axios.get('/api/v1/thing', {
        params: query
    }).then(responce => {
        commit(types.fetch, {
            things: responce.data
        })
    })
}

export function login ({ dispatch }, query) {
    axios.post('/user/login', query)
        .then(responce => {
            dispatch('checkLoggedIn')
        })
}

export function register ({ dispatch }, query) {
    axios.post('/user/register', query)
        .then(responce => {
            dispatch('checkLoggedIn')
        })
}

export function checkLoggedIn ({ commit }) {
    axios.get('/user/loggedin').then(responce => {
        commit(types.setUsername, {
            username: responce.data
        })
    })
}

export function logout ({ dispatch }) {
    axios.get('/user/logout').then(responce => {
        dispatch('checkLoggedIn')
    })
}
