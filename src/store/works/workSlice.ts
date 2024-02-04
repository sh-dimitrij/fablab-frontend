import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	work: undefined,
};

const workSlice = createSlice({
	name: 'work',
	initialState: initialState,
	reducers: {
		updateWork(state, action) {
			state.work = action.payload
		}
	}
})

export const {
	updateWork
} = workSlice.actions;

export default workSlice.reducer;