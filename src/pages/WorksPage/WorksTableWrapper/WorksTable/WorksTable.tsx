import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import WorksFilters from "../../WorksFilters/WorksFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import React from "react";
import {useWorks} from "../../../../hooks/works/useWorks";

const WorksTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteWork} = useWorks()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Цена",
            accessor: "price",
            Cell: ({ value }) => { return value + " руб." }
        },
        {
            Header: "Действие",
            accessor: "edit_button",
            Cell: ({ cell }) => (
                <Link to={`/works/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.secondary}>Редактировать</CustomButton>
                </Link>
            )
        },
        {
            Header: "Действие",
            accessor: "delete_button",
            Cell: ({ cell }) => (
                <CustomButton onClick={() => handleDeleteWork(cell.row.values.id)} bg={variables.red}>Удалить</CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openCityPage = (work_id) => {
        navigate(`/works/${work_id}/`)
    }

    const handleDeleteWork = async (work_id) => {
        await deleteWork(work_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openCityPage}
            >
                <WorksFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default WorksTable