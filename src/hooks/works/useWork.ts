import {useDispatch, useSelector} from 'react-redux';
import {
	updateWork,
	updateName,
	updateDescription,
	updatePrice,
	updateImage
} from "../../store/works/workSlice";
import {api} from "../../utils/api";

export function useWork() {
	const work = useSelector(state => state.work.work);

	const dispatch = useDispatch()

	const setWork = (value) => {
		dispatch(updateWork(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setPrice = (value) => {
		dispatch(updatePrice(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchWork = async (id) => {

		const {data} = await api.get(`works/${id}`);

		setWork(data)

	};

	return {
		work,
		setWork,
		fetchWork,
		setName,
		setDescription,
		setPrice,
		setImage
	};
}