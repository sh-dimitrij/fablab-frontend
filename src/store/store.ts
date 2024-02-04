import {configureStore} from "@reduxjs/toolkit";

import workReducer from "./works/workSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import worksReducer  from "./works/worksSlice"

export default configureStore({
	reducer: {
		work: workReducer,
		works: worksReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});