import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "../pages/Home/Home.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import Login from "../pages/Login/Login.page";
import RegisterCapstone from "../pages/RegisterCapstone/RegisterCapstone.component";
import About from "../pages/About/About.page";
import Error from "../pages/Error/Error.page";
import LecturerService from "../services/Supporter/Lecturer/Lecturer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ObjectChecker from "../services/Object/ObjectChecker";

export default function AppRouter() {
    const location = useLocation();
    const navigate = useNavigate();

    let theme = useSelector((s) => s.theme);

    const updateTheme = () => {
        if (theme === 2) {
            setTimeout(() => {
                let array = document.querySelectorAll("div");
                document.querySelector(".dashboard_body div").style.background =
                    "#181818";

                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    let boxShadow = window
                        .getComputedStyle(element, null)
                        .getPropertyValue("box-shadow");
                    if (boxShadow !== "none")
                        element.classList.add("dark-mode_container");

                    let borderColor = window
                        .getComputedStyle(element, null)
                        .getPropertyValue("border-color");

                    if (borderColor === "rgba(255, 255, 255)")
                        element.style.borderColor = "#212121";
                }
            }, 2000);
        }
    };

    const checkProfile = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user.roleUser.includes("mentor")) {
                let { data } = await LecturerService.getById(user.userId);
                let fields = [
                    "firstName",
                    "lastName",
                    "depId",
                    "academicLevel",
                    "phone",
                ];
                let isInfoFull = ObjectChecker.isEmptyKeys(data, fields);

                if (isInfoFull) navigate("/dashboard/lecturer-profile");
            }
        }
    };

    useEffect(async () => {
        updateTheme();
        await checkProfile();
    }, [location]);

    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/error" element={<Error />}></Route>
            <Route path="/error/*" element={<Error />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route
                path="/register-capstone"
                element={<RegisterCapstone />}
            ></Route>
            <Route
                path="/dashboard/"
                element={<Navigate to="/dashboard/introduction" replace />}
            ></Route>
            <Route path="/dashboard/*" element={<Dashboard />}></Route>
            <Route
                path="*"
                element={<Navigate to="/error/404" replace />}
            ></Route>
        </Routes>
    );
}
