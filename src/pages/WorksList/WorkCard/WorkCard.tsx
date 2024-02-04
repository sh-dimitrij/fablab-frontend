import "./WorkCard.sass"
import {Work} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const WorkCard = ({ work, isMock }: {work:Work, isMock:boolean }) => {


    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : work.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{work.name}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/works/${work.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default WorkCard;