import "./WorkPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iWorksMock, requestTime} from "../../utils/consts";
import {Work} from "../../utils/types";
import mockImage from "/src/assets/mock.png"

const WorkPage = ({ selectedWork, setSelectedWork }: { selectedWork:Work | undefined, setSelectedWork: Dispatch<Work| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/works/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Work = await response.json()

            setSelectedWork(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedWork(iWorksMock.find((service:Work) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/works/${id}/image/`

    if (selectedWork == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedWork.name}</h2>

                    <br />

                    <span>Описание: {selectedWork.description}</span>

                    <br />

                    <span>Цена: {selectedWork.price} рублей</span>

                </div>

            </div>

        </div>
    )
}

export default WorkPage;