import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import WorkPage from "./pages/WorkPage/WorkPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import WorkEditPage from "./pages/WorkEditPage/WorkEditPage";
import WorkAddPage from "./pages/WorkAddPage/WorkAddPage";
import WorksList from "./pages/WorksPage/WorksList/WorksList";
import WorksTable from "./pages/WorksPage/WorksTableWrapper/WorksTable/WorksTable";
import WorksTableWrapper from "./pages/WorksPage/WorksTableWrapper/WorksTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("works-list") && <OrderConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/fablab">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/works-list" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/works-list" element={<WorksList />} />

                                    <Route path="/works-table" element={<WorksTableWrapper />} />

                                    <Route path="/works/add" element={<WorkAddPage />} />

                                    <Route path="/works/:id" element={<WorkPage />} />

                                    <Route path="/works/:id/edit" element={<WorkEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/orders/:id" element={<OrderPage />} />

                                    <Route path="/orders" element={<OrdersPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
