import types from './mutations-type.json'
import axios from 'axios'

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

