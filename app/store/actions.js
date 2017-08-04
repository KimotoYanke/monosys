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

export function login ({ commit }, query) {
	axios.post('/user/login', query)
		.then(responce => {
			commit(types.setUsername, {
				username: query.username
			})
			console.log(responce)
		})
}

export function register ({ commit }, query) {
	axios.post('/user/register', query)
		.then(responce => commit(types.setUsername, {
			username: query.username
		}))
}

