import types from './mutations-type.json'

export default {
    [types.setUsername] (state, { username }) {
        state.username = username
    }
}
