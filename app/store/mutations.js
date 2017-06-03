import * as types from './mutations-type'

export default {
	[types.FETCH] (state, { data }) {
		state.tableData = data
	}
}
