import "./WorksList.sass"
import WorkCard from "../../../components/WorkCard/WorkCard";
import {useWorks} from "../../../hooks/works/useWorks";
import {useQuery} from "react-query";
import WorksFilters from "../WorksFilters/WorksFilters";

const WorksList = () => {

    const {searchWorks} = useWorks()

    const { isLoading, data, refetch } = useQuery(
        ["works"],
        () => searchWorks(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(work  => (
        <WorkCard work={work} key={work.id} refetch={refetch}/>
    ))

    return (
        <div className="works-wrapper">
            <div className="works-list-wrapper">

                <WorksFilters refetch={refetch}/>

                <div className="works-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default WorksList;