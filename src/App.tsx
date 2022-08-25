import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import { IUser } from "./interfaces";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { PageWelcome } from "./pages/PageWelcome";
import { PageMembers } from "./pages/PageMembers";
import { PageRegister } from "./pages/PageRegister";
import { PageLogin } from "./pages/PageLogin";
import { PageLogout } from "./pages/PageLogout";
import { PageConfirmLink } from "./pages/PageConfirmLink";
import { Page404 } from "./pages/Page404";

const baseUrl = import.meta.env.VITE_BACKEND_URL
function App() {
    const [currentUser, setCurrentUser] = useState<IUser>({
        username: "",
        firstName: "",
        lastName: "",
        accessGroups: [],
    });

    useEffect(() => {
        (async () => {
            const data = (
                await axios.get(`${baseUrl}/current-user`, {
                    withCredentials: true,
                })
            ).data;
            const _currentUser = data.currentUser;
            setCurrentUser(_currentUser);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Language Tandem Group</h1>
            <div>
                {currentUser.firstName} {currentUser.lastName}
            </div>
            <nav>
                <NavLink to="/welcome">Welcome</NavLink>
                {currentUser.accessGroups.includes("members") && (
                    <NavLink to="/members">Members</NavLink>
                )}
                {currentUser.accessGroups.includes("loggedOutUsers") && (
                    <NavLink to="/register">Register</NavLink>
                )}
                {currentUser.accessGroups.includes("loggedOutUsers") && (
                    <NavLink to="/login">Login</NavLink>
                )}
                {currentUser.accessGroups.includes("loggedInUsers") && (
                    <NavLink to="/logout">Logout</NavLink>
                )}
            </nav>

            <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/welcome" element={<PageWelcome />} />
                {currentUser.accessGroups.includes("members") && (
                    <Route path="/members" element={<PageMembers />} />
                )}
                {currentUser.accessGroups.includes("loggedOutUsers") && (
                    <Route path="/register" element={<PageRegister />} />
                )}
                {currentUser.accessGroups.includes("loggedOutUsers") && (
                    <Route
                        path="/login"
                        element={
                            <PageLogin
                                baseUrl={baseUrl}
                                setCurrentUser={setCurrentUser}
                            />
                        }
                    />
                )}
                {currentUser.accessGroups.includes("loggedInUsers") && (
                    <Route
                        path="/logout"
                        element={<PageLogout baseUrl={baseUrl} setCurrentUser={setCurrentUser} />}
                    />
                )}
                <Route path="/confirm-link" element={<PageConfirmLink />} />
                <Route path="/" element={<Navigate to="/welcome" replace />} />
            </Routes>
           
        </div>
    );
}

export default App;
