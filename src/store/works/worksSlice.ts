import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	works: [],
	query: ""
};

const worksSlice = createSlice({
	name: 'works',
	initialState: initialState,
	reducers: {
		updateWorks(state, action) {
			state.works = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateWorks,
	updateQuery
} = worksSlice.actions;

export default worksSlice.reducer;