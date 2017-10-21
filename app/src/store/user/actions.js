import types from './mutations-type.json'
import axios from 'axios'

export function login ({ dispatch }, query) {
    return axios.post('/user/login', query)
        .then(responce => {
            dispatch('checkLoggedIn')
        }).catch(() => {})
}

export function register ({ dispatch }, query) {
    return axios.post('/user/register', query)
        .then(responce => {
            dispatch('checkLoggedIn')
        }).catch(() => {})
}

export function checkLoggedIn ({ commit }) {
    return axios.get('/user/loggedin').then(responce => {
        commit(types.setUsername, {
            username: responce.data
        })
    })
}

export function logout ({ dispatch }) {
    return axios.get('/user/logout').then(responce => {
        dispatch('checkLoggedIn')
    })
}

