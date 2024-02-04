import "./WorkPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useWork} from "../../hooks/works/useWork";

const WorkPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {work, fetchWork, setWork} = useWork()
    
    useEffect(() => {
        id && fetchWork(id)
        return () => {
            setWork(undefined)
        }
    }, [])

    if (work == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/works/${id}/image/`

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
                    
                    <h2>{work?.name}</h2> <br/>

                    <span>Адрес: {work?.location}</span><br/>

                    <span>Режим работы: С {work?.open_hours} до {work?.close_hours}</span>

                </div>
                
            </div>

        </div>
    )
}

export default WorkPage;