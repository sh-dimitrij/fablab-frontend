import "./WorkPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useWork} from "../../hooks/works/useWork";

const WorkPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {work, fetchWork} = useWork()
    
    useEffect(() => {
        id && fetchWork(id)
    }, [])

    if (work == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://192.168.1.62:8000/api/works/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{work.name}</h2>

                    <br />

                    <span>Описание: {work.description}</span>

                    <br />

                    <span>Цена: {work.price} рублей</span>
                </div>

            </div>

        </div>
    )
}

export default WorkPage;