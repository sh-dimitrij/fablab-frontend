import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updatePassegeDate,
	updatePersonCount
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)

	const navigate = useNavigate()

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setPassegeDate = (value) => {
		dispatch(updatePassegeDate(value))
	}

	const setPersonCount = (value) => {
		dispatch(updatePersonCount(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {

		const form_data = new FormData()

		form_data.append('passege_date', order.passege_date)
		form_data.append('person_count', order.person_count)

		await api.put(`orders/${order.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)
	}

	const addWorkToOrder = async (work) => {
		await api.post(`works/${work.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteWorkFromOrder = async (work) => {
		const response = await api.delete(`orders/${order.id}/delete_work/${work.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		setOrder,
		setPassegeDate,
		setPersonCount,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchOrder,
		addWorkToOrder,
		deleteWorkFromOrder,
		setOrderId
	};
}