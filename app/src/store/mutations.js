import types from './mutations-type.json'

export default {
    [types.fetch] (state, { things }) {
        state.things = things
    },
    [types.setUsername] (state, { username }) {
        state.username = username
    }
}
