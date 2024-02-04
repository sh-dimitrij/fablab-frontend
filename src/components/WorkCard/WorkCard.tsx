import "./WorkCard.sass"
import {Work} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const WorkCard = ({ work, refetch }: {work:Work}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addWorkToOrder, deleteWorkFromOrder} = useOrder()

    const handleAddWork = async (e) => {
        e.preventDefault()
        await addWorkToOrder(work)
        refetch()
    }

    const handleDeleteWorkFromOrder = async (e) => {
        e.preventDefault()
        await deleteWorkFromOrder(work)
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={work.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {work.name} </h3>

                </div>

                <div className="content-bottom">


                    <Link to={`/works/${work.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("works") &&
                        <CustomButton onClick={handleAddWork} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteWorkFromOrder} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default WorkCard;