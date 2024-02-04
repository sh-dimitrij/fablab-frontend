import "./WorksList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import WorkCard from "./WorkCard/WorkCard";
import {iWorksMock, requestTime} from "../../utils/consts";
import {Work} from "../../utils/types";

const WorksList = () => {

    const [Works, setWorks] = useState<Work[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchWorks = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/works/search/?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const works: Work[] = raw["works"]

            setWorks(works)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setWorks(iWorksMock.filter(work => work.name.toLowerCase().includes(query)))

    }

    useEffect(() => {
        searchWorks()
    }, [])

    const cards = Works.map(work  => (
        <WorkCard work={work} key={work.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchWorks()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск видов работ</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default WorksList;