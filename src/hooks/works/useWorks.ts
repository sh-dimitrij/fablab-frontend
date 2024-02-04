import {useDispatch, useSelector} from 'react-redux';
import {
	updateWorks,
	updateQuery
} from "../../store/works/worksSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";
import {useToken} from "../users/useToken";

export function useWorks() {
	const works = useSelector(state => state.works.works);
	const query = useSelector(state => state.works.query);

	const {access_token} = useToken()

	const {setOrderId} = useOrder()

	const dispatch = useDispatch()

	const setWorks = (value) => {
		dispatch(updateWorks(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchWorks = async () => {

		const {data} = await api.get(`works/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_order_id = data["draft_order_id"]
		setOrderId(draft_order_id)

		return data["works"]
	}

	const deleteWork = async (work) => {
		await api.delete(`works/${work.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		works,
		setWorks,
		query,
		setQuery,
		searchWorks,
		deleteWork
	};
}