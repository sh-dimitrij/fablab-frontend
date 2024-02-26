import "./WorksFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useWorks} from "../../../hooks/works/useWorks";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const WorksFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useWorks()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="works-filters">

            <h2>Поиск работ</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/works/add" bg={variables.primary}>
                        Добавить работу
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default WorksFilters