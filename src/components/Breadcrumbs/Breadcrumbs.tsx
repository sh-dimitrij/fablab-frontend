import "./Breadcrumbs.sass"
import {Dispatch} from "react";
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import { Work } from "../../utils/types";
 

const Breadcrumbs = ({ selectedWork, setSelectedWork }: { selectedWork:Work| undefined, setSelectedWork:Dispatch<Work| undefined> }) => {

    const location = useLocation()

    let currentLink = ''

    const topics: Record<string, string> = {
        "works": "Виды работ",
        "profile": "Личный кабинет"
    }

    const resetSelectedWork = () => setSelectedWork(undefined)

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedWork}>
                        { (topics as never)[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('works/(d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        { selectedWork?.name }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/works"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;