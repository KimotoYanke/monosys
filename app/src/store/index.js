import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import thing from './thing'
import user from './user'

Vue.use(Vuex)

const state = {
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        thing,
        user
    }
})
