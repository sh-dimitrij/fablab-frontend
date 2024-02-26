import {createSlice} from "@reduxjs/toolkit"
import {Work} from "../../utils/types";

interface IWorksState {
	works: Array<Work>
	query: string
}

const initialState: IWorksState = {
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