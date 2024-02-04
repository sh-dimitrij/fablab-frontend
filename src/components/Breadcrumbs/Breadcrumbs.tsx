import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useWork} from "../../hooks/works/useWork";
import {useOrder} from "../../hooks/orders/useOrder";

const Breadcrumbs = () => {

    const location = useLocation()

    const {work, setWork} = useWork()

    const { order, is_draft } = useOrder()

    let currentLink = ''

    const resetSelectedWork = () => setWork(undefined)

    const topics = {
        "works": "Работы",
        "works-table": "Таблица работ",
        "orders": "Заказ",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Личный кабинет"
    }

    const exclude_topics = ["edit"]

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (exclude_topics.find(x => x == crumb)) {
            return
        }

        if (Object.keys(topics).find(x => x == crumb)) {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedWork}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('add')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Новый заказ
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }


        if (currentLink.match(new RegExp('orders/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {is_draft ? "Новый заказ" : "Заказ №" + order?.id}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('works/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {work?.name}
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