import {useWorks} from "../../../hooks/works/useWorks";
import {useQuery} from "react-query";
import WorksTable from "./WorksTable/WorksTable";

const WorksTableWrapper = () => {

    const {searchWorks} = useWorks()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["works"],
        () => searchWorks(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="works-wrapper">
            <WorksTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default WorksTableWrapper