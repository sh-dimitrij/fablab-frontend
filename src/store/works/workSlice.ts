import {createSlice} from "@reduxjs/toolkit"
import {Work} from "../../utils/types";

interface IWorkState {
	work: Work | undefined
}

const initialState: IWorkState = {
	work: undefined,
};

const workSlice = createSlice({
	name: 'work',
	initialState: initialState,
	reducers: {
		updateWork(state, action) {
			state.work = action.payload
		},
		updateName(state, action) {
			state.work.name = action.payload
		},
		updateDescription(state, action) {
			state.work.description = action.payload
		},
		updatePrice(state, action) {
			state.work.price = action.payload
		},
		updateImage(state, action) {
			state.work.image = action.payload
		}
	}
})

export const {
	updateWork,
	updateName,
	updateDescription,
	updatePrice,
	updateImage
} = workSlice.actions;

export default workSlice.reducer;