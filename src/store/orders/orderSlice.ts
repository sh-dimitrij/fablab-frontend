import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	order_id: undefined
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updatePassegeDate(state, action) {
			state.order.passege_date = action.payload
		},
		updatePersonCount(state, action) {
			state.order.person_count = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		}
	}
})

export const {
	updateOrder,
	updatePassegeDate,
	updatePersonCount,
	updateOrderId
} = orderSlice.actions;

export default orderSlice.reducer;