import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { IUser } from "./interfaces";
import { Page404 } from "./pages/Page404";

import { PageWelcome } from "./pages/PageWelcome";
import { PageMembers } from "./pages/PageMembers";
import { PageRegister } from "./pages/PageRegister";
import { PageLogin } from "./pages/PageLogin";
import { PageLogout } from "./pages/PageLogout";
import { PageConfirmLink } from "./pages/PageConfirmLink";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

console.log(baseUrl, 'baseUrl');
function App() {



    const [currentUser, setCurrentUser] = useState<IUser>({
        username: "",
        firstName: "",
        lastName: "",
        accessGroups: [],
    });

    useEffect(() => {
        (async () => {
            const data = (await axios.get(`${baseUrl}/current-user`)).data;
            const _currentUser = data.currentUser;
            setCurrentUser(_currentUser);
        })();
    }, []);
    return (
        <div className="App">
            <h1>Language Tandem Group</h1>
            <h1>{currentUser.username}</h1>
            <p>testing</p>
            <nav>
                <NavLink to="/welcome">Welcome</NavLink>
                {currentUser.accessGroups.includes("members") && (
                    <NavLink to="/members">Members</NavLink>
                )}
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
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
                <Route path="/register" element={<PageRegister />} />
                <Route path="/login" element={<PageLogin />} />
                {currentUser.accessGroups.includes("loggedInUsers") && (
                    <Route path="/logout" element={<PageLogout />} />
                )}
                <Route path="/confirm-link" element={<PageConfirmLink />} />
                <Route path="/" element={<Navigate to="/welcome" replace />} />
            </Routes>
        </div>
    );
}

export default App;


