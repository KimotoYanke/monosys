import types from './mutations-type.json'
import axios from 'axios'

export function fetch ({ commit }, query) {
    return axios.get('/api/v1/thing', {
        params: query
    }).then(responce => {
        commit(types.fetch, {
            things: responce.data
        })
    }).catch(() => {
        commit(types.fetch, {
            things: {}
        })
    })
}
