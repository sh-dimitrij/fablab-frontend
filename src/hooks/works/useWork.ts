import {useDispatch, useSelector} from 'react-redux';
import {
	updateWork
} from "../../store/works/workSlice";
import {api} from "../../utils/api";

export function useWork() {
	const work = useSelector(state => state.work.work);

	const dispatch = useDispatch()

	const setWork = (value) => {
		dispatch(updateWork(value))
	}

	const fetchWork = async (id) => {

		const {data} = await api.get(`works/${id}`);

		setWork(data)

	};

	return {
		work,
		setWork,
		fetchWork
	};
}