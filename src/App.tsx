import "./styles/main.sass"
import "./styles/reset.sass"
import { useState } from 'react'
import Header from "./components/Header/Header";
import {Work} from "./utils/types";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import WorkPage from "./pages/WorkPage/WorkPage";
import WorksList from "./pages/WorksList/WorksList";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {

    const [selectedWork, setSelectedWork] = useState<Work | undefined>(undefined)

    return (
        <BrowserRouter basename="/fablab">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedWork={selectedWork} setSelectedWork={setSelectedWork}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/works" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/works" element={<WorksList />} />

                            <Route path="/works/:id" element={<WorkPage selectedWork={selectedWork} setSelectedWork={setSelectedWork} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
